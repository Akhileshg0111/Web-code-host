(function() {
    'use strict';
    
    const GEMINI_API_KEY = 'AIzaSyBAYrR7rmytkZRvgOwFi9MI_cqGL_tTy0E';
    const GEMINI_VISION_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';
    

const STYLES = `
  #designToCodeModal {
    position: fixed;
    inset: 0;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
    background: rgba(0, 0, 0, 0.6);
}
    #designToCodeModal::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    #designToCodeModal.active {
        display: flex;
    }
    #designToCodeContent {
        background: #FFFFFF;
        border: 2px solid #000000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 0;
        max-width: 500px;
        width: 90%;
        position: relative;
        max-height: 85vh;
        overflow: hidden;
        animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 2;
    }
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }
        to { 
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    .dtc-header {
        background: #000000;
        padding: 20px 24px;
        position: relative;
        overflow: hidden;
        border-bottom: 2px solid #000000;
    }
    #designToCodeClose {
        position: absolute;
        top: 16px;
        right: 16px;
        background: transparent;
        border: 1px solid #ffffff;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        z-index: 10;
    }
    #designToCodeClose:hover {
        background: #ffffff;
        transform: scale(1.05);
    }
    #designToCodeClose:hover svg {
        color: #000000;
    }
    #designToCodeClose svg {
        width: 16px;
        height: 16px;
        color: #ffffff;
    }
    .dtc-title {
        font-size: 20px;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 4px;
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .dtc-title-icon {
        width: 36px;
        height: 36px;
        background: #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #000000;
        font-size: 18px;
        font-weight: 700;
        color: #000000;
    }
    .dtc-subtitle {
        font-size: 13px;
        color: #ffffff;
        position: relative;
        font-weight: 400;
    }
    .dtc-body {
        padding: 24px;
        overflow-y: auto;
        max-height: calc(85vh - 100px);
        background: #FFFFFF;
    }
    .dtc-upload-area {
        border-radius: 8px;
        padding: 32px 24px;
        text-align: center;
        border: 2px dashed #000000;
        background: #ffffff;
        cursor: pointer;
        transition: all 0.3s;
        margin-bottom: 20px;
        position: relative;
    }
    .dtc-upload-area:hover {
        border-color: #000000;
        background: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .dtc-upload-area.dragover {
        border-color: #000000;
        background: #ffffff;
        transform: scale(1.01);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
    .dtc-upload-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 12px;
        background: #000000;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #000000;
    }
    .dtc-upload-icon svg {
        width: 28px;
        height: 28px;
        color: #ffffff;
    }
    .dtc-upload-text {
        font-size: 16px;
        font-weight: 600;
        color: #000000;
        margin-bottom: 4px;
    }
    .dtc-upload-hint {
        font-size: 12px;
        color: #000000;
        font-weight: 400;
        opacity: 0.7;
    }
    #designFileInput {
        display: none;
    }
    .dtc-preview-container {
        display: none;
    }
    .dtc-preview-container.active {
        display: block;
    }
    .dtc-preview-image {
        width: 100%;
        max-height: 250px;
        object-fit: contain;
        border-radius: 8px;
        border: 2px solid #000000;
        background: #ffffff;
        padding: 12px;
    }
    .dtc-preview-actions {
        display: flex;
        gap: 10px;
        margin-top: 16px;
    }
    .dtc-btn {
        flex: 1;
        padding: 12px 20px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.2s;
        position: relative;
        overflow: hidden;
    }
    .dtc-btn-primary {
        background: #000000;
        border: 2px solid #000000;
        color: #ffffff;
    }
    .dtc-btn-primary:hover {
        background: #ffffff;
        color: #000000;
        border: 2px solid #000000;
        transform: translateY(-2px);
    }
    .dtc-btn-secondary {
        background: #ffffff;
        color: #000000;
        border: 2px solid #000000;
    }
    .dtc-btn-secondary:hover {
        background: #000000;
        color: #ffffff;
        border: 2px solid #000000;
        transform: translateY(-2px);
    }
    .dtc-options {
        margin-bottom: 20px;
    }
    .dtc-option-group {
        margin-bottom: 16px;
    }
    .dtc-label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 600;
        color: #000000;
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .dtc-label svg {
        width: 12px;
        height: 12px;
        color: #000000;
    }
    .dtc-select {
        width: 100%;
        padding: 10px 12px;
        border: 2px solid #000000;
        border-radius: 6px;
        font-size: 13px;
        color: #000000;
        background: #FFFFFF;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 500;
    }
    .dtc-select:focus {
        outline: none;
        border-color: #000000;
    }
    .dtc-select option {
        background: #ffffff;
        color: #000000;
    }
    .dtc-textarea {
        width: 100%;
        padding: 10px 12px;
        border: 2px solid #000000;
        border-radius: 6px;
        font-size: 13px;
        color: #000000;
        background: #FFFFFF;
        resize: vertical;
        min-height: 80px;
        font-family: inherit;
        transition: all 0.2s;
        font-weight: 400;
    }
    .dtc-textarea:focus {
        outline: none;
        border-color: #000000;
    }
    .dtc-textarea::placeholder {
        color: #000000;
        opacity: 0.5;
    }
    .dtc-loading {
        text-align: center;
        padding: 32px 24px;
    }
    .dtc-loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #ffffff;
        border-top-color: #000000;
        border-radius: 50%;
        animation: dtc-spin 0.8s linear infinite;
        margin: 0 auto 16px;
    }
    @keyframes dtc-spin {
        to { transform: rotate(360deg); }
    }
    .dtc-loading-text {
        font-size: 15px;
        font-weight: 600;
        color: #000000;
        margin-bottom: 4px;
    }
    .dtc-loading-subtext {
        font-size: 12px;
        color: #000000;
        opacity: 0.7;
    }
    .dtc-tip {
        background: #ffffff;
        border-left: 3px solid #000000;
        padding: 12px;
        border-radius: 6px;
        margin-top: 16px;
        border: 2px solid #000000;
    }
    .dtc-tip-title {
        font-size: 12px;
        font-weight: 600;
        color: #000000;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .dtc-tip-text {
        font-size: 11px;
        color: #000000;
        line-height: 1.5;
        opacity: 0.8;
    }
`;
    
    function injectStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = STYLES;
        document.head.appendChild(styleElement);
    }
    
    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'designToCodeModal';
        modal.innerHTML = `
            <div id="designToCodeContent">
                <div class="dtc-header">
                    <button id="designToCodeClose">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    <div class="dtc-title">
                        <div class="dtc-title-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                        </div>
                        Design to Code
                    </div>
                    <p class="dtc-subtitle">Transform your design mockups into production-ready code powered by AI</p>
                </div>
                
                <div class="dtc-body">
                    <div id="dtcUploadSection">
                        <div class="dtc-upload-area" id="dtcUploadArea">
                            <div class="dtc-upload-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                </svg>
                            </div>
                            <div class="dtc-upload-text">Drop your design here</div>
                            <div class="dtc-upload-hint">or click to browse • PNG, JPG, WebP supported</div>
                            <input type="file" id="designFileInput" accept="image/png,image/jpeg,image/jpg,image/webp">
                        </div>
                        
                        <div class="dtc-tip">
                            <div class="dtc-tip-title">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Tips for Best Results
                            </div>
                            <div class="dtc-tip-text">
                                • Use high-resolution mockups with clear UI elements<br>
                                • Include all text, buttons, and interactive components<br>
                                • Annotate functionality or provide style specifications<br>
                                • Ensure good contrast and proper lighting in the image
                            </div>
                        </div>
                    </div>
                    
                    <div id="dtcPreviewSection" class="dtc-preview-container">
                        <img id="dtcPreviewImage" class="dtc-preview-image" alt="Design Preview">
                        
                        <div class="dtc-options">
                            <div class="dtc-option-group">
                                <label class="dtc-label">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                                    </svg>
                                    Framework
                                </label>
                                <select id="dtcFramework" class="dtc-select">
                                    <option value="html">Pure HTML/CSS/JS</option>
                                    <option value="tailwind">HTML with Tailwind CSS</option>
                                    <option value="bootstrap">HTML with Bootstrap</option>
                                </select>
                            </div>
                            
                            <div class="dtc-option-group">
                                <label class="dtc-label">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                    Additional Instructions
                                </label>
                                <textarea id="dtcInstructions" class="dtc-textarea" placeholder="e.g., Make it responsive, add smooth animations, use dark theme, include hover effects..."></textarea>
                            </div>
                        </div>
                        
                        <div class="dtc-preview-actions">
                            <button id="dtcGenerateBtn" class="dtc-btn dtc-btn-primary">
                                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                                Generate Code
                            </button>
                            <button id="dtcCancelBtn" class="dtc-btn dtc-btn-secondary">
                                <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                Cancel
                            </button>
                        </div>
                    </div>
                    
                    <div id="dtcLoadingSection" style="display: none;">
                        <div class="dtc-loading">
                            <div class="dtc-loading-spinner"></div>
                            <div class="dtc-loading-text">Analyzing Design...</div>
                            <div class="dtc-loading-subtext">AI is converting your mockup into code</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setupEventListeners();
    }
    
    function setupEventListeners() {
        const modal = document.getElementById('designToCodeModal');
        const closeBtn = document.getElementById('designToCodeClose');
        const uploadArea = document.getElementById('dtcUploadArea');
        const fileInput = document.getElementById('designFileInput');
        const generateBtn = document.getElementById('dtcGenerateBtn');
        const cancelBtn = document.getElementById('dtcCancelBtn');
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleFileSelect(file);
            }
        });
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleFileSelect(file);
        });
        
        generateBtn.addEventListener('click', generateCode);
        cancelBtn.addEventListener('click', resetModal);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    let selectedImage = null;
    
    function handleFileSelect(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage = e.target.result;
            document.getElementById('dtcPreviewImage').src = selectedImage;
            document.getElementById('dtcUploadSection').style.display = 'none';
            document.getElementById('dtcPreviewSection').classList.add('active');
        };
        reader.readAsDataURL(file);
    }
    
    function resetModal() {
        selectedImage = null;
        document.getElementById('designFileInput').value = '';
        document.getElementById('dtcPreviewImage').src = '';
        document.getElementById('dtcFramework').value = 'html';
        document.getElementById('dtcInstructions').value = '';
        document.getElementById('dtcUploadSection').style.display = 'block';
        document.getElementById('dtcPreviewSection').classList.remove('active');
        document.getElementById('dtcLoadingSection').style.display = 'none';
    }
    
    async function generateCode() {
        if (!selectedImage) return;
        
        const framework = document.getElementById('dtcFramework').value;
        const instructions = document.getElementById('dtcInstructions').value.trim();
        
        document.getElementById('dtcPreviewSection').classList.remove('active');
        document.getElementById('dtcLoadingSection').style.display = 'block';
        
        try {
            const base64Image = selectedImage.split(',')[1];
            
            let prompt = `You are an expert web developer. Analyze this design mockup image and convert it into complete, production-ready code.
    
    Framework: ${framework === 'html' ? 'Pure HTML with inline CSS and JavaScript' : framework === 'tailwind' ? 'HTML with Tailwind CSS classes' : 'HTML with Bootstrap classes'}
    
    Requirements:
    - Generate complete, working HTML code
    - use emoji instead of svg icons
    - Include all visible elements from the design
    - Match colors, fonts, spacing, and layout as closely as possible
    - Make it responsive and mobile-friendly
    - Add proper semantic HTML
    - Include hover effects and transitions
    - Add placeholder images where needed (use https://via.placeholder.com)
    ${instructions ? `\nAdditional requirements: ${instructions}` : ''}
    
    Return ONLY the complete HTML code wrapped in \`\`\`html syntax. No explanations.`;
    
            const response = await fetch(`${GEMINI_VISION_API}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            {
                                inline_data: {
                                    mime_type: 'image/jpeg',
                                    data: base64Image
                                }
                            }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.4,
                        maxOutputTokens: 8192,
                    }
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', errorData);
                throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            
            // Check if the response has the expected structure
            if (!data.candidates || !data.candidates[0]) {
                console.error('Unexpected API response:', data);
                throw new Error('Invalid API response structure. The model may not exist or the API key may be invalid.');
            }
            
            const generatedText = data.candidates[0].content.parts[0].text;
            const code = extractHTMLCode(generatedText);
            
            if (code) {
                closeModal();
                showToast('Generating code...', 'success');
                await typeCodeIntoEditor(code);
                if (window.compiler) {
                    window.compiler.previewHTML();
                }
                showToast('Code generated successfully!', 'success');
            } else {
                throw new Error('Could not extract HTML code');
            }
            
        } catch (error) {
            console.error('Generation error:', error);
            closeModal();
            showToast('Failed to generate code. Please try again.', 'error');
        }
    }
    
    async function typeCodeIntoEditor(code) {
        const cm = getCodeMirrorInstance();
        if (!cm) {
            setEditorCode(code);
            return;
        }
        
        cm.setValue('');
        
        const CHARS_PER_BATCH = 5;
        const DELAY_MS = 10;
        
        let currentIndex = 0;
        
        while (currentIndex < code.length) {
            const chunk = code.slice(currentIndex, currentIndex + CHARS_PER_BATCH);
            const currentContent = cm.getValue();
            cm.setValue(currentContent + chunk);
            
            cm.scrollTo(0, cm.getScrollInfo().height);
            
            currentIndex += CHARS_PER_BATCH;
            
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
    }
    
    function extractHTMLCode(response) {
        const htmlBlockRegex = /```html\s*([\s\S]*?)```/i;
        const genericCodeBlockRegex = /```[\w]*\s*([\s\S]*?)```/;
        
        let match = response.match(htmlBlockRegex) || response.match(genericCodeBlockRegex);
        
        if (match && match[1]) {
            return match[1].trim();
        }
        
        return response.trim();
    }
    
    function setEditorCode(code) {
        const cm = getCodeMirrorInstance();
        if (cm) {
            cm.setValue(code);
        } else {
            const textarea = document.getElementById('code');
            if (textarea) textarea.value = code;
        }
    }
    
    function getCodeMirrorInstance() {
        const editorElements = document.querySelectorAll('.CodeMirror');
        if (editorElements.length > 0) {
            return editorElements[0].CodeMirror;
        }
        return null;
    }
    
    function openModal() {
        document.getElementById('designToCodeModal').classList.add('active');
    }
    
    function closeModal() {
        document.getElementById('designToCodeModal').classList.remove('active');
        resetModal();
    }
    
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 32px;
            right: 32px;
            padding: 18px 28px;
            border-radius: 14px;
            font-weight: 700;
            z-index: 10001;
            font-size: 15px;
            box-shadow: 0 0 50px ${type === 'success' ? 'rgba(37, 99, 235, 0.8)' : 'rgba(239, 68, 68, 0.8)'};
            border: 2px solid ${type === 'success' ? '#3b82f6' : '#ef4444'};
            ${type === 'success' ? 'background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); color: #ffffff;' : 'background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: #ffffff;'}
            animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100px)';
            toast.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                toast.remove();
                style.remove();
            }, 300);
        }, 4000);
    }
    
    function addMenuButton() {
        const optionsDropdown = document.getElementById('optionsDropdown');
        if (!optionsDropdown) return;
        
        const designBtn = document.createElement('button');
        designBtn.className = 'w-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition flex items-center gap-2 border-b border-gray-200';
        designBtn.innerHTML = `
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span class="font-semibold text-white-800">Design to Code</span>
        `;
        
        designBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            optionsDropdown.classList.add('hidden');
            openModal();
        });
        
        optionsDropdown.appendChild(designBtn);
    }
    
    function init() {
        injectStyles();
        createModal();
        addMenuButton();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();