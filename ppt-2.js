(function () {
  const _K = 'AIzaSyBAYrR7rmytkZRvgOwFi9MI_cqGL_tTy0E';
  const _U = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=';

  let slides = [], slidesData = [], current = 0, running = false;

  function status(txt, on) {
    const d = document.getElementById('pptDot'), s = document.getElementById('pptStatus');
    if (d) d.classList.toggle('active', !!on);
    if (s) s.textContent = txt;
  }

  function err(msg) {
    const el = document.getElementById('pptErr');
    if (el) el.textContent = msg || '';
  }

  function themePrompt(t) {
    return {
      clean:    'White background, warm brown (#8b5e3c) accents, clean sans-serif typography, professional style with subtle dividers and dark text',
      bold:     'Cream (#f5f1eb) background, large bold warm brown (#8b5e3c) headline, strong visual hierarchy, impactful typography',
      dark:     'Very dark (#1a1612) background, warm cream (#f5f1eb) text, amber (#c4894a) accents, sleek modern look',
      gradient: 'Cream to warm sand gradient background, brown accents, modern and elegant, subtle organic shapes',
      minimal:  'Pure white background, only charcoal text and one warm brown (#8b5e3c) accent element, extreme whitespace, ultra-minimal'
    }[t] || 'White background, warm brown accents, clean professional design';
  }

  async function generate() {
    if (running) return;
    const prompt = document.getElementById('pptPrompt').value.trim();
    const count  = parseInt(document.getElementById('pptCount').value);
    const theme  = document.getElementById('pptTheme').value;

    err('');
    if (!prompt) { document.getElementById('pptPrompt').focus(); return; }

    running = true;
    slides  = [];
    slidesData = [];
    current = 0;

    document.getElementById('pptGen').disabled  = true;
    document.getElementById('pptUse').disabled  = true;
    document.getElementById('pptPrev').disabled = true;
    document.getElementById('pptNext').disabled = true;
    document.getElementById('pptExportPPT').disabled = true;

    const sidebar = document.getElementById('pptSidebar');
    const emptyEl = document.getElementById('sidebarEmpty');
    if (emptyEl) emptyEl.remove();
    sidebar.innerHTML = '';

    status(`Generating ${count} slides…`, true);

    const thumbEls = [];
    for (let i = 0; i < count; i++) {
      slides.push(null);
      slidesData.push(null);
      const t = document.createElement('div');
      t.className = 'thumb';
      t.dataset.i = i;
      t.innerHTML = `<div class="thumb-loading"><div class="spinner"></div></div><span class="thumb-num">${i+1}</span>`;
      t.addEventListener('click', () => show(i));
      sidebar.appendChild(t);
      thumbEls.push(t);
    }

    const tCtx = themePrompt(theme);

    for (let i = 0; i < count; i++) {
      status(`Slide ${i+1} of ${count}…`, true);
      try {
        const result = await makeSlide(prompt, i+1, count, tCtx);
        slides[i] = result.html;
        slidesData[i] = result.data;
        fillThumb(thumbEls[i], result.html, i);
        if (i === 0) show(0);
      } catch(e) {
        err(e.message || `Slide ${i+1} failed`);
        const fb = fallback(i+1, count, prompt);
        slides[i] = fb.html;
        slidesData[i] = fb.data;
        fillThumb(thumbEls[i], fb.html, i);
        if (i === 0) show(0);
      }
    }

    status(`${slides.filter(Boolean).length} slides ready`, false);
    running = false;
    document.getElementById('pptGen').disabled = false;
    updateNav();
  }

  async function makeSlide(topic, num, total, tCtx) {
    const types = [
      { type: 'title', desc: 'Title slide with large headline and subtitle' },
      { type: 'agenda', desc: 'Agenda slide with 3-4 numbered points' },
      { type: 'content', desc: 'Content slide with heading and 3 bullet points' },
      { type: 'highlight', desc: 'Highlight slide with 2-3 key features in boxes' },
      { type: 'quote', desc: 'Quote or statistic slide with large centered text' },
      { type: 'data', desc: 'Data comparison slide with two columns' },
      { type: 'conclusion', desc: 'Conclusion slide with 3 takeaways' }
    ];
    const slideInfo = types[(num - 1) % types.length];

    const sys = `You are an expert slide content creator. Create structured content for a presentation slide.

CRITICAL RULES FOR CONTENT:
1. Keep ALL text SHORT and CONCISE
2. Titles: Maximum 6-8 words
the page must be filled with content
3. Subtitles: Maximum 8 words
4. Bullet points: Maximum 6-8 words each
5. Lists: Maximum 4-6 items TOTAL
6. Body text: Maximum 12 words per line
7. Add more content if needed to make the page feel filled
8. Explain topic in a proper way around 4-5 lines

Return ONLY a JSON object with this structure:
{
"type": "title|agenda|content|highlight|quote|data|conclusion",
"title": "Short title (max 6 words)",
"subtitle": "Optional subtitle (max 8 words)",
"content": ["bullet 1", "bullet 2", "bullet 3"],
"layout": "centered|left|grid"
}

Design context: ${tCtx}
Slide type: ${slideInfo.desc}`;

    const user = `Create slide ${num}/${total} for: "${topic}".
Make it ${slideInfo.type} style. Keep ALL text very short and concise. Maximum 3-4 points.`;

    const res = await fetch(_U + _K, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: sys }] },
        contents: [{ parts: [{ text: user }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
      })
    });

    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e?.error?.message || `Error ${res.status}`);
    }

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = raw.replace(/^```json\s*/i,'').replace(/```\s*$/,'').trim();
    
    let slideData;
    try {
      slideData = JSON.parse(clean);
    } catch {
      throw new Error('Invalid response format');
    }
    
    // Generate HTML from structured data
    const html = generateHTML(slideData, tCtx, num, total);
    
    return { html, data: slideData };
  }

  function generateHTML(data, theme, num, total) {
    const isDark = theme.includes('dark');
    const bgColor = isDark ? '#1a1612' : (theme.includes('gradient') ? 'linear-gradient(135deg, #f5f1eb 0%, #e8dcc8 100%)' : '#ffffff');
    const textColor = isDark ? '#f5f1eb' : '#1a1612';
    const accentColor = '#8b5e3c';
    
    // Helper to extract text from content items (handles both strings and objects)
    const getText = (item) => {
      if (typeof item === 'string') return item;
      if (typeof item === 'object' && item !== null) {
        return item.text || item.content || item.title || String(item);
      }
      return String(item);
    };
    
    let contentHTML = '';
    
    if (data.type === 'title') {
      contentHTML = `
        <div style="text-align:center; max-width:900px; padding:60px;">
          <h1 style="font-size:64px; font-weight:700; color:${accentColor}; margin-bottom:30px; line-height:1.2;">${getText(data.title)}</h1>
          ${data.subtitle ? `<p style="font-size:32px; color:${textColor}; opacity:0.8; line-height:1.4;">${getText(data.subtitle)}</p>` : ''}
        </div>`;
    } else if (data.type === 'agenda' || data.type === 'content') {
      const items = (data.content || []).slice(0, 4).map((item, i) => `
        <div style="display:flex; gap:20px; margin-bottom:30px; align-items:flex-start;">
          <span style="font-size:36px; color:${accentColor}; font-weight:700; min-width:50px;">${i+1}.</span>
          <p style="font-size:28px; color:${textColor}; line-height:1.5; margin:5px 0 0 0;">${getText(item)}</p>
        </div>
      `).join('');
      
      contentHTML = `
        <div style="max-width:900px; padding:80px 100px;">
          <h2 style="font-size:52px; color:${accentColor}; margin-bottom:50px; font-weight:600;">${getText(data.title)}</h2>
          <div>${items}</div>
        </div>`;
    } else if (data.type === 'highlight') {
      const boxes = (data.content || []).slice(0, 3).map(item => `
        <div style="background:${isDark ? 'rgba(245,241,235,0.1)' : 'rgba(139,94,60,0.08)'}; padding:40px; border-radius:12px; border-left:4px solid ${accentColor}; flex:1; min-width:200px;">
          <p style="font-size:26px; color:${textColor}; line-height:1.5; text-align:center;">${getText(item)}</p>
        </div>
      `).join('');
      
      contentHTML = `
        <div style="max-width:1100px; padding:80px 90px; text-align:center;">
          <h2 style="font-size:52px; color:${accentColor}; margin-bottom:60px; font-weight:600;">${getText(data.title)}</h2>
          <div style="display:flex; gap:30px; justify-content:center; flex-wrap:wrap;">${boxes}</div>
        </div>`;
    } else if (data.type === 'quote') {
      contentHTML = `
        <div style="max-width:1000px; padding:80px; text-align:center;">
          <p style="font-size:56px; color:${accentColor}; font-weight:600; line-height:1.4; margin-bottom:40px;">"${getText(data.title)}"</p>
          ${data.subtitle ? `<p style="font-size:28px; color:${textColor}; opacity:0.7;">— ${getText(data.subtitle)}</p>` : ''}
        </div>`;
    } else {
      contentHTML = `
        <div style="max-width:900px; padding:80px 100px;">
          <h2 style="font-size:52px; color:${accentColor}; margin-bottom:40px; font-weight:600;">${getText(data.title)}</h2>
          ${data.subtitle ? `<p style="font-size:28px; color:${textColor}; line-height:1.6;">${getText(data.subtitle)}</p>` : ''}
        </div>`;
    }
    
    return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:1280px;height:720px;overflow:hidden;background:${bgColor};font-family:'Inter',sans-serif;color:${textColor};display:flex;align-items:center;justify-content:center;}
</style></head><body>${contentHTML}</body></html>`;
  }

  function fallback(num, total, topic) {
    const data = {
      type: 'title',
      title: topic.substring(0, 50),
      subtitle: `Slide ${num} of ${total}`
    };
    const html = generateHTML(data, 'clean', num, total);
    return { html, data };
  }

  function fillThumb(el, html, idx) {
    const ifr = document.createElement('iframe');
    ifr.sandbox = 'allow-scripts allow-same-origin';
    const blob = new Blob([html], { type: 'text/html' });
    ifr.src = URL.createObjectURL(blob);
    el.innerHTML = `<span class="thumb-num">${idx+1}</span>`;
    el.appendChild(ifr);
  }

  function show(idx) {
    if (!slides[idx]) return;
    current = idx;

    document.querySelectorAll('.thumb').forEach((t,i) => t.classList.toggle('active', i === idx));

    const box = document.getElementById('pptBox');
    if (!box) return;
    box.innerHTML = '';

    const ifr = document.createElement('iframe');
    ifr.sandbox = 'allow-scripts allow-same-origin';
    ifr.style.cssText = 'width:100%;height:100%;border:none;display:block;';
    const blob = new Blob([slides[idx]], { type: 'text/html' });
    ifr.src = URL.createObjectURL(blob);
    box.appendChild(ifr);

    const lbl = document.getElementById('pptLabel');
    if (lbl) lbl.textContent = `Slide ${idx+1} of ${slides.filter(Boolean).length}`;

    document.getElementById('pptUse').disabled = false;
    document.getElementById('pptExportPPT').disabled = false;
    updateNav();
  }

  function go(dir) {
    const n = current + dir;
    const max = slides.filter(Boolean).length - 1;
    if (n >= 0 && n <= max && slides[n]) show(n);
  }

  function updateNav() {
    const max = slides.filter(Boolean).length - 1;
    const p = document.getElementById('pptPrev'), nx = document.getElementById('pptNext');
    if (p)  p.disabled  = current <= 0;
    if (nx) nx.disabled = current >= max;
  }

  function useSlide() {
    const html = slides[current];
    if (!html) return;
    if (window.editor && typeof window.editor.setValue === 'function') {
      window.editor.setValue(html);
    } else {
      const ta = document.getElementById('code');
      if (ta) ta.value = html;
    }
    const run = document.getElementById('runBtn');
    if (run) run.click();
  }

  async function exportToPPT() {
    if (slidesData.filter(Boolean).length === 0) return;
    
    status('Preparing PPT export…', true);
    
    try {
      // Load PptxGenJS library
      if (!window.PptxGenJS) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js';
        document.head.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }

      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';
      
      const theme = document.getElementById('pptTheme').value;
      const isDark = theme === 'dark';
      const bgColor = isDark ? '1a1612' : (theme === 'gradient' ? 'f5f1eb' : 'FFFFFF');
      const textColor = isDark ? 'f5f1eb' : '1a1612';
      const accentColor = '8b5e3c';

      for (let i = 0; i < slidesData.length; i++) {
        if (!slidesData[i]) continue;
        
        status(`Exporting slide ${i+1}/${slidesData.length}…`, true);
        
        const data = slidesData[i];
        const slide = pptx.addSlide();
        slide.background = { color: bgColor };
        
        // Add content based on slide type
        if (data.type === 'title') {
          slide.addText(data.title, {
            x: 1, y: 2.5, w: 8, h: 1,
            fontSize: 54, bold: true, color: accentColor,
            align: 'center', valign: 'middle'
          });
          if (data.subtitle) {
            slide.addText(data.subtitle, {
              x: 1, y: 3.8, w: 8, h: 0.6,
              fontSize: 28, color: textColor,
              align: 'center', valign: 'middle'
            });
          }
        } else if (data.type === 'agenda' || data.type === 'content') {
          slide.addText(data.title, {
            x: 0.5, y: 0.5, w: 9, h: 0.8,
            fontSize: 44, bold: true, color: accentColor
          });
          
          const bulletText = (data.content || []).slice(0, 4).map((item, idx) => ({
            text: item,
            options: { bullet: { code: `${idx+1}.` }, fontSize: 24, color: textColor }
          }));
          
          slide.addText(bulletText, {
            x: 0.8, y: 1.8, w: 8.4, h: 3,
            fontSize: 24, color: textColor, lineSpacing: 40
          });
        } else if (data.type === 'highlight') {
          slide.addText(data.title, {
            x: 0.5, y: 0.5, w: 9, h: 0.8,
            fontSize: 44, bold: true, color: accentColor, align: 'center'
          });
          
          const boxes = (data.content || []).slice(0, 3);
          const boxWidth = 2.8;
          const startX = (10 - (boxes.length * boxWidth + (boxes.length - 1) * 0.3)) / 2;
          
          boxes.forEach((item, idx) => {
            slide.addText(item, {
              x: startX + idx * (boxWidth + 0.3), y: 2.2, w: boxWidth, h: 2,
              fontSize: 22, color: textColor, align: 'center', valign: 'middle',
              fill: { color: isDark ? '2a2622' : 'f5f1eb' },
              line: { color: accentColor, width: 3 }
            });
          });
        } else if (data.type === 'quote') {
          slide.addText(`"${data.title}"`, {
            x: 1, y: 2, w: 8, h: 2,
            fontSize: 40, bold: true, color: accentColor,
            align: 'center', valign: 'middle'
          });
          if (data.subtitle) {
            slide.addText(`— ${data.subtitle}`, {
              x: 1, y: 4.2, w: 8, h: 0.5,
              fontSize: 24, color: textColor, align: 'center'
            });
          }
        } else {
          slide.addText(data.title, {
            x: 0.5, y: 2, w: 9, h: 1.5,
            fontSize: 44, bold: true, color: accentColor,
            align: 'center', valign: 'middle'
          });
        }
      }

      const topic = document.getElementById('pptPrompt').value.trim();
      const filename = `${topic.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}_presentation.pptx`;
      
      await pptx.writeFile({ fileName: filename });
      
      status(`${slidesData.filter(Boolean).length} slides ready`, false);
    } catch (error) {
      err('PPT export failed');
      status(`${slidesData.filter(Boolean).length} slides ready`, false);
      console.error('Export error:', error);
    }
  }

  document.getElementById('pptGen').addEventListener('click', generate);
  document.getElementById('pptPrompt').addEventListener('keydown', e => { if (e.key === 'Enter') generate(); });
  document.getElementById('pptPrev').addEventListener('click', () => go(-1));
  document.getElementById('pptNext').addEventListener('click', () => go(1));
  document.getElementById('pptUse').addEventListener('click', useSlide);
  document.getElementById('pptExportPPT').addEventListener('click', exportToPPT);

})();