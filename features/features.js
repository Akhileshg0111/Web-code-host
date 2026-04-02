(function() {
    'use strict';

    class TemplateLibrary {
        constructor() {
           this.templates = {
    cards: [
        {
            name: 'Minimal Card',
            code: `<div style="max-width: 320px; border-radius: 16px; overflow: hidden; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)'">
    <img src="https://via.placeholder.com/320x200" style="width: 100%; height: 200px; object-fit: cover; display: block;">
    <div style="padding: 24px;">
        <h3 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 20px; font-weight: 600; letter-spacing: -0.02em;">Modern Architecture</h3>
        <p style="margin: 0 0 20px 0; color: #666; line-height: 1.6; font-size: 15px;">Explore contemporary design principles that shape our living spaces.</p>
        <button style="background: #000; color: white; border: none; padding: 11px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#000'">Explore</button>
    </div>
</div>`
        },
        {
            name: 'Glass Profile Card',
            code: `<div style="max-width: 340px; border-radius: 24px; background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.18); padding: 40px; text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.12);">
    <img src="https://via.placeholder.com/100" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.3); margin-bottom: 20px; object-fit: cover;">
    <h2 style="margin: 0 0 6px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Alexandra Chen</h2>
    <p style="margin: 0 0 24px 0; color: #666; font-size: 15px;">Product Designer</p>
    <div style="display: flex; gap: 12px; justify-content: center;">
        <button style="flex: 1; background: #000; color: white; border: none; padding: 12px 20px; border-radius: 10px; cursor: pointer; font-weight: 500; font-size: 14px; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#000'">Connect</button>
        <button style="flex: 1; background: rgba(0,0,0,0.06); color: #1a1a1a; border: none; padding: 12px 20px; border-radius: 10px; cursor: pointer; font-weight: 500; font-size: 14px; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.1)'" onmouseout="this.style.background='rgba(0,0,0,0.06)'">Message</button>
    </div>
</div>`
        },
        {
            name: 'Premium Pricing Card',
            code: `<div style="max-width: 340px; border-radius: 20px; border: 1px solid #e8e8e8; background: white; padding: 36px; transition: all 0.3s;" onmouseover="this.style.borderColor='#000'; this.style.boxShadow='0 12px 40px rgba(0,0,0,0.12)'" onmouseout="this.style.borderColor='#e8e8e8'; this.style.boxShadow='none'">
    <div style="display: inline-block; padding: 6px 14px; background: #f5f5f5; border-radius: 20px; font-size: 13px; font-weight: 500; color: #666; margin-bottom: 20px;">Professional</div>
    <div style="margin: 24px 0;">
        <span style="font-size: 52px; font-weight: 700; color: #1a1a1a; letter-spacing: -0.03em;">$49</span>
        <span style="color: #999; font-size: 16px; margin-left: 4px;">/mo</span>
    </div>
    <p style="margin: 0 0 28px 0; color: #666; line-height: 1.6; font-size: 15px;">Everything you need to scale your creative business.</p>
    <ul style="list-style: none; padding: 0; margin: 0 0 32px 0;">
        <li style="padding: 14px 0; border-bottom: 1px solid #f5f5f5; color: #1a1a1a; font-size: 15px; display: flex; align-items: center; gap: 12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Unlimited projects</li>
        <li style="padding: 14px 0; border-bottom: 1px solid #f5f5f5; color: #1a1a1a; font-size: 15px; display: flex; align-items: center; gap: 12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>200GB cloud storage</li>
        <li style="padding: 14px 0; border-bottom: 1px solid #f5f5f5; color: #1a1a1a; font-size: 15px; display: flex; align-items: center; gap: 12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Priority support 24/7</li>
        <li style="padding: 14px 0; color: #1a1a1a; font-size: 15px; display: flex; align-items: center; gap: 12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Custom domain</li>
    </ul>
    <button style="width: 100%; background: #000; color: white; border: none; padding: 16px; border-radius: 12px; cursor: pointer; font-size: 15px; font-weight: 600; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#000'">Get started</button>
</div>`
        },
        {
            name: 'Feature Showcase Card',
            code: `<div style="max-width: 380px; background: white; border-radius: 24px; padding: 44px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 12px 48px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 24px rgba(0,0,0,0.06)'">
    <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 18px; margin-bottom: 28px; display: flex; align-items: center; justify-content: center;">
        <svg style="width: 36px; height: 36px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
    </div>
    <h3 style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 26px; font-weight: 600; letter-spacing: -0.02em;">Ultra Performance</h3>
    <p style="margin: 0; color: #666; line-height: 1.7; font-size: 16px;">Deliver exceptional speed with our optimized infrastructure and cutting-edge technology stack.</p>
</div>`
        },
        {
            name: 'E-commerce Product Card',
            code: `<div style="max-width: 300px; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.08); transition: all 0.3s;" onmouseover="this.style.boxShadow='0 8px 32px rgba(0,0,0,0.12)'" onmouseout="this.style.boxShadow='0 2px 16px rgba(0,0,0,0.08)'">
    <div style="position: relative; overflow: hidden; background: #f8f8f8;">
        <img src="https://via.placeholder.com/300x320" style="width: 100%; height: 320px; object-fit: cover; display: block; transition: all 0.4s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        <span style="position: absolute; top: 16px; right: 16px; background: #ff3b30; color: white; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">-45%</span>
    </div>
    <div style="padding: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">Premium Wireless Headphones</h4>
        <p style="margin: 0 0 16px 0; color: #999; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 500;">Audio Equipment</p>
        <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 20px;">
            <span style="font-size: 28px; font-weight: 700; color: #1a1a1a;">$149</span>
            <span style="font-size: 18px; color: #999; text-decoration: line-through;">$269</span>
        </div>
        <button style="width: 100%; background: #000; color: white; border: none; padding: 14px; border-radius: 12px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#000'">Add to Cart</button>
    </div>
</div>`
        },
        {
            name: 'Testimonial Card',
            code: `<div style="max-width: 440px; background: white; border-radius: 24px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid #f0f0f0;">
    <div style="display: flex; gap: 4px; margin-bottom: 24px;">
        ${Array(5).fill('<svg width="20" height="20" viewBox="0 0 24 24" fill="#FFB800"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>').join('')}
    </div>
    <p style="color: #1a1a1a; line-height: 1.7; margin: 0 0 28px 0; font-size: 17px; font-weight: 400;">This platform has revolutionized our workflow. The intuitive design and powerful features make it indispensable for our team's daily operations.</p>
    <div style="display: flex; gap: 16px; align-items: center;">
        <img src="https://via.placeholder.com/56" style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover;">
        <div>
            <h4 style="margin: 0 0 4px 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">Michael Torres</h4>
            <p style="margin: 0; color: #999; font-size: 14px;">Director of Operations, TechFlow</p>
        </div>
    </div>
</div>`
        },
        {
            name: 'Analytics Card',
            code: `<div style="max-width: 300px; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); border-radius: 24px; padding: 36px; color: white; box-shadow: 0 8px 32px rgba(30,60,114,0.24); position: relative; overflow: hidden;">
    <div style="position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
    <div style="position: relative;">
        <div style="font-size: 13px; font-weight: 500; margin-bottom: 12px; opacity: 0.85; text-transform: uppercase; letter-spacing: 1px;">Total Revenue</div>
        <div style="font-size: 44px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em;">$24.8K</div>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 14px;">
            <div style="display: flex; align-items: center; gap: 4px; background: rgba(52,211,153,0.2); padding: 4px 10px; border-radius: 12px; color: #34d399;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                <span style="font-weight: 600;">18.2%</span>
            </div>
            <span style="opacity: 0.75;">vs last month</span>
        </div>
    </div>
</div>`
        },
        {
            name: 'Blog Article Card',
            code: `<div style="max-width: 400px; background: white; border-radius: 20px; overflow: hidden; border: 1px solid #f0f0f0; transition: all 0.3s;" onmouseover="this.style.borderColor='#e0e0e0'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 32px rgba(0,0,0,0.08)'" onmouseout="this.style.borderColor='#f0f0f0'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
    <img src="https://via.placeholder.com/400x240" style="width: 100%; height: 240px; object-fit: cover; display: block;">
    <div style="padding: 28px;">
        <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: center;">
            <span style="background: #f0f0f0; color: #666; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Design</span>
            <span style="color: #999; font-size: 13px;">8 min read</span>
        </div>
        <h3 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 22px; line-height: 1.3; font-weight: 600; letter-spacing: -0.01em;">The Future of Minimalist Interface Design</h3>
        <p style="margin: 0 0 24px 0; color: #666; line-height: 1.6; font-size: 15px;">Discover emerging trends and principles shaping the next generation of user experiences and digital products.</p>
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="https://via.placeholder.com/40" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                <div>
                    <div style="font-size: 14px; font-weight: 600; color: #1a1a1a;">Emma Wilson</div>
                    <div style="font-size: 12px; color: #999;">Apr 18, 2024</div>
                </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor: pointer;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
    </div>
</div>`
        }
    ],
    buttons: [
        {
            name: 'Primary Button',
            code: `<button style="background: #000; color: white; border: none; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.12);" onmouseover="this.style.background='#333'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 16px rgba(0,0,0,0.2)'" onmouseout="this.style.background='#000'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.12)'">Get Started</button>`
        },
        {
            name: 'Gradient Button',
            code: `<button style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px 36px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 20px rgba(102,126,234,0.35); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 28px rgba(102,126,234,0.45)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 20px rgba(102,126,234,0.35)'">Explore Features</button>`
        },
        {
            name: 'Outline Button',
            code: `<button style="background: transparent; color: #1a1a1a; border: 2px solid #1a1a1a; padding: 13px 32px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#1a1a1a'; this.style.color='white'" onmouseout="this.style.background='transparent'; this.style.color='#1a1a1a'">Learn More</button>`
        },
        {
            name: 'Icon Button',
            code: `<button style="background: #10b981; color: white; border: none; padding: 13px 28px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; transition: all 0.2s; box-shadow: 0 2px 12px rgba(16,185,129,0.25);" onmouseover="this.style.background='#059669'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 20px rgba(16,185,129,0.35)'" onmouseout="this.style.background='#10b981'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 12px rgba(16,185,129,0.25)'">
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
    Confirm
</button>`
        },
        {
            name: 'Glass Button',
            code: `<button style="background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); color: #1a1a1a; border: 1px solid rgba(255,255,255,0.25); padding: 14px 32px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,0.08); transition: all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.transform='translateY(0)'">Glass Effect</button>`
        },
        {
            name: 'Soft Shadow Button',
            code: `<button style="background: white; color: #1a1a1a; border: none; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06); transition: all 0.3s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 4px 16px rgba(0,0,0,0.12), 0 16px 40px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)'">Elevated</button>`
        }
    ],
    forms: [
        {
            name: 'Modern Login Form',
            code: `<div style="max-width: 420px; margin: 60px auto; padding: 48px; background: white; border-radius: 24px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid #f0f0f0;">
    <h2 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 28px; font-weight: 700; letter-spacing: -0.02em;">Welcome back</h2>
    <p style="margin: 0 0 36px 0; color: #999; font-size: 15px;">Sign in to continue to your account</p>
    <form>
        <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">Email address</label>
            <input type="email" placeholder="your@email.com" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='#000'; this.style.boxShadow='0 0 0 3px rgba(0,0,0,0.05)'" onblur="this.style.borderColor='#e8e8e8'; this.style.boxShadow='none'">
        </div>
        <div style="margin-bottom: 32px;">
            <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">Password</label>
            <input type="password" placeholder="Enter your password" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='#000'; this.style.boxShadow='0 0 0 3px rgba(0,0,0,0.05)'" onblur="this.style.borderColor='#e8e8e8'; this.style.boxShadow='none'">
        </div>
        <button type="submit" style="width: 100%; background: #000; color: white; border: none; padding: 16px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; margin-bottom: 20px;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#000'">Sign in</button>
    </form>
    <p style="text-align: center; margin: 0; color: #999; font-size: 14px;">Don't have an account? <a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 600;">Create one</a></p>
</div>`
        },
        {
            name: 'Elegant Contact Form',
            code: `<div style="max-width: 540px; margin: 60px auto; padding: 48px; background: linear-gradient(to bottom, #fafafa, white); border-radius: 24px; border: 1px solid #e8e8e8;">
    <h2 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 32px; font-weight: 700; letter-spacing: -0.03em;">Get in touch</h2>
    <p style="margin: 0 0 40px 0; color: #666; font-size: 16px; line-height: 1.6;">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
    <form>
        <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">Full name</label>
            <input type="text" placeholder="John Doe" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; box-sizing: border-box; background: white; transition: all 0.2s;" onfocus="this.style.borderColor='#1a1a1a'" onblur="this.style.borderColor='#e8e8e8'">
        </div>
        <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">Email</label>
            <input type="email" placeholder="john@company.com" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; box-sizing: border-box; background: white; transition: all 0.2s;" onfocus="this.style.borderColor='#1a1a1a'" onblur="this.style.borderColor='#e8e8e8'">
        </div>
        <div style="margin-bottom: 28px;">
            <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">Message</label>
            <textarea placeholder="Tell us about your project..." rows="5" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; resize: vertical; box-sizing: border-box; background: white; font-family: inherit; transition: all 0.2s;" onfocus="this.style.borderColor='#1a1a1a'" onblur="this.style.borderColor='#e8e8e8'"></textarea>
        </div>
        <button type="submit" style="background: #1a1a1a; color: white; border: none; padding: 16px 36px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#1a1a1a'">Send message</button>
    </form>
</div>`
        },
        {
            name: 'Newsletter Subscription',
            code: `<div style="max-width: 640px; margin: 60px auto; padding: 56px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border-radius: 28px; text-align: center; color: white; box-shadow: 0 12px 48px rgba(0,0,0,0.2);">
    <h2 style="margin: 0 0 16px 0; font-size: 36px; font-weight: 700; letter-spacing: -0.03em;">Stay in the loop</h2>
    <p style="margin: 0 0 36px 0; font-size: 17px; opacity: 0.85; line-height: 1.6;">Join our newsletter for the latest updates, insights, and exclusive content delivered to your inbox.</p>
    <form style="display: flex; gap: 12px; max-width: 480px; margin: 0 auto;">
        <input type="email" placeholder="Enter your email address" style="flex: 1; padding: 16px 20px; border: 1.5px solid rgba(255,255,255,0.15); border-radius: 12px; font-size: 15px; background: rgba(255,255,255,0.08); color: white; transition: all 0.2s;" onfocus="this.style.borderColor='rgba(255,255,255,0.4)'; this.style.background='rgba(255,255,255,0.12)'" onblur="this.style.borderColor='rgba(255,255,255,0.15)'; this.style.background='rgba(255,255,255,0.08)'">
        <button type="submit" style="background: white; color: #1a1a1a; border: none; padding: 16px 32px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.2s;" onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='white'">Subscribe</button>
    </form>
</div>`
        },
        {
            name: 'Registration Form',
            code: `<div style="max-width: 480px; margin: 60px auto; padding: 48px; background: white; border-radius: 24px; box-shadow: 0 8px 40px rgba(0,0,0,0.1);">
    <h2 style="margin: 0 0 8px 0; color: #1a1a1a; font-size: 30px; font-weight: 700; letter-spacing: -0.02em;">Create your account</h2>
    <p style="margin: 0 0 36px 0; color: #999; font-size: 15px;">Get started with your free account</p>
    <form>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div>
                <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">First name</label>
                <input type="text" placeholder="John" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='#1a1a1a'" onblur="this.style.borderColor='#e8e8e8'">
            </div>
            <div>
                <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">Last name</label>
                <input type="text" placeholder="Doe" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='#1a1a1a'" onblur="this.style.borderColor='#e8e8e8'">
            </div>
        </div>
        <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">Email address</label>
            <input type="email" placeholder="john@example.com" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='#1a1a1a'" onblur="this.style.borderColor='#e8e8e8'">
        </div>
        <div style="margin-bottom: 32px;">
            <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">Password</label>
            <input type="password" placeholder="Create a strong password" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; box-sizing: border-box; transition: all 0.2s;" onfocus="this.style.borderColor='#1a1a1a'" onblur="this.style.borderColor='#e8e8e8'">
        </div>
        <button type="submit" style="width: 100%; background: #1a1a1a; color: white; border: none; padding: 16px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; margin-bottom: 20px; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#1a1a1a'">Create account</button>
        <p style="text-align: center; margin: 0; color: #999; font-size: 13px;">Already have an account? <a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 600;">Sign in</a></p>
    </form>
</div>`
        },
        {
            name: 'Minimal Search Bar',
            code: `<div style="max-width: 600px; margin: 60px auto;">
    <div style="position: relative;">
        <input type="text" placeholder="Search for anything..." style="width: 100%; padding: 18px 56px 18px 24px; border: 1.5px solid #e8e8e8; border-radius: 16px; font-size: 16px; box-sizing: border-box; transition: all 0.2s; background: white;" onfocus="this.style.borderColor='#1a1a1a'; this.style.boxShadow='0 4px 24px rgba(0,0,0,0.08)'" onblur="this.style.borderColor='#e8e8e8'; this.style.boxShadow='none'">
        <button style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: #1a1a1a; border: none; padding: 12px 16px; border-radius: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#1a1a1a'">
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>
            </svg>
        </button>
    </div>
</div>`
        },
        {
            name: 'Feedback Form',
            code: `<div style="max-width: 520px; margin: 60px auto; padding: 48px; background: white; border-radius: 24px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid #f0f0f0;">
    <h2 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 28px; font-weight: 700; letter-spacing: -0.02em;">Share your feedback</h2>
    <p style="margin: 0 0 36px 0; color: #666; font-size: 15px;">Help us improve by sharing your experience</p>
    <form>
        <div style="margin-bottom: 28px;">
            <label style="display: block; margin-bottom: 14px; color: #1a1a1a; font-weight: 600; font-size: 14px;">How would you rate your experience?</label>
            <div style="display: flex; gap: 12px; justify-content: center;">
                ${['😞','😕','😐','🙂','😊'].map((emoji, i) => `<button type="button" style="flex: 1; padding: 20px; border: 1.5px solid #e8e8e8; border-radius: 12px; background: white; cursor: pointer; font-size: 32px; transition: all 0.2s;" onmouseover="this.style.borderColor='#1a1a1a'; this.style.background='#fafafa'; this.style.transform='scale(1.05)'" onmouseout="this.style.borderColor='#e8e8e8'; this.style.background='white'; this.style.transform='scale(1)'">${emoji}</button>`).join('')}
            </div>
        </div>
        <div style="margin-bottom: 32px;">
            <label style="display: block; margin-bottom: 10px; color: #1a1a1a; font-weight: 600; font-size: 14px;">Tell us more (optional)</label>
            <textarea placeholder="What did you like or dislike?" rows="4" style="width: 100%; padding: 14px 16px; border: 1.5px solid #e8e8e8; border-radius: 10px; font-size: 15px; resize: vertical; box-sizing: border-box; font-family: inherit; transition: all 0.2s;" onfocus="this.style.borderColor='#1a1a1a'" onblur="this.style.borderColor='#e8e8e8'"></textarea>
        </div>
        <button type="submit" style="width: 100%; background: #1a1a1a; color: white; border: none; padding: 16px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#1a1a1a'">Submit feedback</button>
    </form>
</div>`
        }
    ],
    navbars: [
        {
            name: 'Clean Navbar',
            code: `<nav style="background: white; padding: 20px 60px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f0f0f0;">
    <div style="color: #1a1a1a; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">Brand</div>
    <ul style="list-style: none; display: flex; gap: 36px; margin: 0; padding: 0; align-items: center;">
        <li><a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='#666'" onmouseout="this.style.color='#1a1a1a'">Products</a></li>
        <li><a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='#666'" onmouseout="this.style.color='#1a1a1a'">Solutions</a></li>
        <li><a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='#666'" onmouseout="this.style.color='#1a1a1a'">Pricing</a></li>
        <li><a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='#666'" onmouseout="this.style.color='#1a1a1a'">Company</a></li>
        <li><button style="background: #1a1a1a; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#1a1a1a'">Get Started</button></li>
    </ul>
</nav>`
        },
        {
            name: 'Dark Navbar',
            code: `<nav style="background: #1a1a1a; padding: 22px 60px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
    <div style="color: white; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">Studio</div>
    <ul style="list-style: none; display: flex; gap: 40px; margin: 0; padding: 0; align-items: center;">
        <li><a href="#" style="color: rgba(255,255,255,0.85); text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.85)'">Work</a></li>
        <li><a href="#" style="color: rgba(255,255,255,0.85); text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.85)'">Services</a></li>
        <li><a href="#" style="color: rgba(255,255,255,0.85); text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.85)'">About</a></li>
        <li><a href="#" style="color: rgba(255,255,255,0.85); text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255,255,255,0.85)'">Contact</a></li>
        <li><button style="background: white; color: #1a1a1a; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#f0f0f0'" onmouseout="this.style.background='white'">Let's Talk</button></li>
    </ul>
</nav>`
        },
        {
            name: 'Gradient Navbar',
            code: `<nav style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 22px 60px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 24px rgba(102,126,234,0.25);">
    <div style="color: white; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">Vivid</div>
    <ul style="list-style: none; display: flex; gap: 40px; margin: 0; padding: 0; align-items: center;">
        <li><a href="#" style="color: white; text-decoration: none; font-weight: 500; font-size: 15px; opacity: 0.9; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.9'">Features</a></li>
        <li><a href="#" style="color: white; text-decoration: none; font-weight: 500; font-size: 15px; opacity: 0.9; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.9'">Pricing</a></li>
        <li><a href="#" style="color: white; text-decoration: none; font-weight: 500; font-size: 15px; opacity: 0.9; transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.9'">Resources</a></li>
        <li><button style="background: white; color: #667eea; border: none; padding: 10px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'">Start Free</button></li>
    </ul>
</nav>`
        },
        {
            name: 'Glass Navbar',
            code: `<nav style="background: rgba(255,255,255,0.7); backdrop-filter: blur(20px); padding: 20px 60px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.5); position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
    <div style="color: #1a1a1a; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">Frost</div>
    <ul style="list-style: none; display: flex; gap: 36px; margin: 0; padding: 0; align-items: center;">
        <li><a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='#666'" onmouseout="this.style.color='#1a1a1a'">Home</a></li>
        <li><a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='#666'" onmouseout="this.style.color='#1a1a1a'">Portfolio</a></li>
        <li><a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='#666'" onmouseout="this.style.color='#1a1a1a'">Blog</a></li>
        <li><a href="#" style="color: #1a1a1a; text-decoration: none; font-weight: 500; font-size: 15px; transition: color 0.2s;" onmouseover="this.style.color='#666'" onmouseout="this.style.color='#1a1a1a'">Contact</a></li>
        <li><button style="background: #1a1a1a; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#333'" onmouseout="this.style.background='#1a1a1a'">Sign Up</button></li>
    </ul>
</nav>`
        }
    ],
    animations: [
        {
            name: 'Smooth Fade In',
            code: `<div style="animation: smoothFadeIn 1.2s ease-out;">
    <h2 style="font-size: 36px; color: #1a1a1a; font-weight: 700; margin-bottom: 16px;">Content appears gracefully</h2>
    <p style="font-size: 18px; color: #666; line-height: 1.7;">Beautiful fade-in animation with smooth timing</p>
</div>

<style>
@keyframes smoothFadeIn {
    from { 
        opacity: 0;
        transform: translateY(20px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}
</style>`
        },
        {
            name: 'Scale Up',
            code: `<div style="animation: scaleUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);">
    <div style="padding: 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 24px; text-align: center; color: white; box-shadow: 0 12px 48px rgba(102,126,234,0.3);">
        <h2 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700;">Bouncy Scale</h2>
        <p style="margin: 0; font-size: 17px; opacity: 0.9;">Smooth elastic animation effect</p>
    </div>
</div>

<style>
@keyframes scaleUp {
    from { 
        transform: scale(0.8);
        opacity: 0;
    }
    to { 
        transform: scale(1);
        opacity: 1;
    }
}
</style>`
        },
        {
            name: 'Pulse Ring',
            code: `<div style="display: flex; align-items: center; justify-content: center; min-height: 200px;">
    <div style="position: relative; width: 80px; height: 80px;">
        <div style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; position: absolute;"></div>
        <div style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; position: absolute; animation: pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
    </div>
</div>

<style>
@keyframes pulseRing {
    0% { 
        transform: scale(1);
        opacity: 1;
    }
    100% { 
        transform: scale(1.8);
        opacity: 0;
    }
}
</style>`
        },
        {
            name: 'Slide From Bottom',
            code: `<div style="animation: slideFromBottom 1s ease-out;">
    <div style="padding: 40px; background: white; border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); border: 1px solid #f0f0f0;">
        <h2 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 28px; font-weight: 700;">Sliding Content</h2>
        <p style="margin: 0; color: #666; font-size: 16px; line-height: 1.6;">Elegant slide-up animation</p>
    </div>
</div>

<style>
@keyframes slideFromBottom {
    from { 
        transform: translateY(60px);
        opacity: 0;
    }
    to { 
        transform: translateY(0);
        opacity: 1;
    }
}
</style>`
        },
        {
            name: 'Floating',
            code: `<div style="display: flex; justify-content: center; align-items: center; min-height: 200px;">
    <div style="padding: 32px 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; color: white; font-size: 24px; font-weight: 700; box-shadow: 0 12px 32px rgba(102,126,234,0.3); animation: floating 3s ease-in-out infinite;">
        Floating Element
    </div>
</div>

<style>
@keyframes floating {
    0%, 100% { 
        transform: translateY(0px);
    }
    50% { 
        transform: translateY(-20px);
    }
}
</style>`
        },
        {
            name: 'Gradient Shift',
            code: `<div style="padding: 60px; background: linear-gradient(135deg, #667eea, #764ba2, #f093fb); background-size: 400% 400%; border-radius: 24px; text-align: center; color: white; animation: gradientShift 8s ease infinite;">
    <h2 style="margin: 0 0 12px 0; font-size: 36px; font-weight: 700;">Flowing Gradients</h2>
    <p style="margin: 0; font-size: 18px; opacity: 0.95;">Mesmerizing color transitions</p>
</div>

<style>
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
</style>`
        },
                    {
                        name: '3D Button',
                        code: `<button style="background: linear-gradient(145deg, #667eea, #764ba2); color: white; border: none; padding: 15px 35px; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer; box-shadow: 0 8px 15px rgba(102,126,234,0.3), inset 0 -4px 0 rgba(0,0,0,0.2); transition: all 0.2s;" onmousedown="this.style.transform='translateY(2px)'; this.style.boxShadow='0 4px 8px rgba(102,126,234,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)'" onmouseup="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 15px rgba(102,126,234,0.3), inset 0 -4px 0 rgba(0,0,0,0.2)'">3D Button</button>`
                    },
                    {
                        name: 'Loading Button',
                        code: `<button style="background: #007bff; color: white; border: none; padding: 14px 30px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 10px;">
                        <svg style="width: 20px; height: 20px; animation: spin 1s linear infinite;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    </button>
                    <style>
                    @keyframes spin { to { transform: rotate(360deg); } }
                    </style>`
                    },
                    {
                        name: 'Social Button',
                        code: `<button style="background: #1da1f2; color: white; border: none; padding: 12px 25px; border-radius: 25px; font-size: 15px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s;" onmouseover="this.style.background='#1a8cd8'" onmouseout="this.style.background='#1da1f2'">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                        Share on Twitter
                    </button>`
                    }
                ],
                animations: [
                    {
                        name: 'Fade In',
                        code: `<div style="animation: fadeIn 1s ease-in;">
    <h2>This content fades in</h2>
    <p>Beautiful fade-in animation effect</p>
</div>

<style>
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>`
                    },
                    {
                        name: 'Zoom In',
                        code: `<div style="animation: zoomIn 0.6s ease-out;">
                        <div style="padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; text-align: center; color: white;">
                            <h2 style="margin: 0 0 15px 0;">Zooming In!</h2>
                            <p style="margin: 0;">This element zooms into view</p>
                        </div>
                    </div>
                    
                    <style>
                    @keyframes zoomIn {
                        from { 
                            transform: scale(0);
                            opacity: 0;
                        }
                        to { 
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                    </style>`
                    },
                    {
                        name: 'Glow Effect',
                        code: `<div style="display: inline-block; padding: 30px 50px; background: #1a1a2e; color: white; border-radius: 15px; font-size: 24px; font-weight: bold; animation: glow 2s ease-in-out infinite;">
                        Glowing Text
                    </div>
                    
                    <style>
                    @keyframes glow {
                        0%, 100% { 
                            box-shadow: 0 0 20px #00ff88, 0 0 30px #00ff88, 0 0 40px #00ff88;
                        }
                        50% { 
                            box-shadow: 0 0 30px #00ff88, 0 0 50px #00ff88, 0 0 70px #00ff88;
                        }
                    }
                    </style>`
                    },
                    {
                        name: 'Slide In',
                        code: `<div style="animation: slideIn 0.8s ease-out;">
    <h2>This content slides in</h2>
    <p>Smooth slide animation from left</p>
</div>

<style>
@keyframes slideIn {
    from { 
        transform: translateX(-100px);
        opacity: 0;
    }
    to { 
        transform: translateX(0);
        opacity: 1;
    }
}
</style>`
                    },
                    {
                        name: 'Bounce',
                        code: `<button style="padding: 15px 30px; background: #007bff; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; animation: bounce 2s infinite;">
    Click Me!
</button>

<style>
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    60% { transform: translateY(-10px); }
}
</style>`
                    },
                    {
                        name: 'Pulse',
                        code: `<div style="width: 100px; height: 100px; background: #007bff; border-radius: 50%; margin: 50px auto; animation: pulse 2s infinite;">
</div>

<style>
@keyframes pulse {
    0% { 
        transform: scale(1);
        opacity: 1;
    }
    50% { 
        transform: scale(1.2);
        opacity: 0.7;
    }
    100% { 
        transform: scale(1);
        opacity: 1;
    }
}
</style>`
                    },
                    {
                        name: 'Rotate',
                        code: `<div style="width: 100px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 50px auto; animation: rotate 3s linear infinite;">
</div>

<style>
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>`
                    },
                    {
                        name: 'Typing Effect',
                        code: `<h1 style="font-family: monospace; font-size: 32px; border-right: 3px solid; width: fit-content; white-space: nowrap; overflow: hidden; animation: typing 3s steps(20) infinite, blink 0.5s step-end infinite;">
Hello, World!
</h1>
<style>
@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}
@keyframes blink {
    50% { border-color: transparent; }
}
</style>`},
{
    name: 'Shake',
    code: `<div style="padding: 30px; background: #ff4757; color: white; border-radius: 10px; text-align: center; font-weight: bold; font-size: 18px; display: inline-block; animation: shake 0.5s infinite;">
Alert Message</div>
<style>
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
</style>`}
],
layouts: [
    {
        name: 'Hero Section',
        code: `<div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px;">
<div style="max-width: 800px;">
<h1 style="font-size: 56px; color: white; margin: 0 0 20px 0; font-weight: bold;">Welcome to Our Platform</h1>
<p style="font-size: 20px; color: rgba(255,255,255,0.9); margin: 0 0 40px 0; line-height: 1.6;">Build amazing things with our powerful tools and features</p>
<div style="display: flex; gap: 15px; justify-content: center;">
<button style="background: white; color: #667eea; border: none; padding: 15px 40px; border-radius: 30px; font-size: 18px; font-weight: bold; cursor: pointer;">Get Started</button>
<button style="background: transparent; color: white; border: 2px solid white; padding: 15px 40px; border-radius: 30px; font-size: 18px; font-weight: bold; cursor: pointer;">Learn More</button>
</div>
</div></div>`
                    },
                    {
                        name: 'Pricing Section',
                        code: `<div style="padding: 80px 50px; background: #f8f9fa;">
                        <h2 style="text-align: center; font-size: 42px; margin: 0 0 15px 0; color: #333;">Choose Your Plan</h2>
                        <p style="text-align: center; color: #666; margin: 0 0 50px 0; font-size: 18px;">Select the perfect plan for your needs</p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; max-width: 1100px; margin: 0 auto;">
                            ${['Starter', 'Professional', 'Enterprise'].map((plan, i) => `
                                <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,${i===1 ? '0.15' : '0.08'}); ${i===1 ? 'transform: scale(1.05); border: 3px solid #007bff;' : ''}">
                                    ${i===1 ? '<div style="background: #007bff; color: white; padding: 8px; border-radius: 10px; font-size: 12px; font-weight: bold; margin: -40px -40px 20px; margin-bottom: 20px;">MOST POPULAR</div>' : ''}
                                    <h3 style="margin: 0 0 15px 0; color: #333; font-size: 24px;">${plan}</h3>
                                    <div style="margin: 20px 0;">
                                        <span style="font-size: 48px; font-weight: bold; color: #007bff;">$${[19, 49, 99][i]}</span>
                                        <span style="color: #666; font-size: 16px;">/month</span>
                                    </div>
                                    <ul style="list-style: none; padding: 0; margin: 25px 0; text-align: left;">
                                        ${['✓ 5 Projects', '✓ 10GB Storage', '✓ Basic Support'].map(f => `<li style="padding: 12px 0; color: #555;">${f}</li>`).join('')}
                                    </ul>
                                    <button style="width: 100%; background: ${i===1 ? '#007bff' : 'transparent'}; color: ${i===1 ? 'white' : '#007bff'}; border: 2px solid #007bff; padding: 15px; border-radius: 10px; font-size: 16px; font-weight: bold; cursor: pointer; margin-top: 20px;">Get Started</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>`
                    },
                    {
                        name: 'Team Section',
                        code: `<div style="padding: 80px 50px; background: white;">
                        <h2 style="text-align: center; font-size: 42px; margin: 0 0 15px 0; color: #333;">Meet Our Team</h2>
                        <p style="text-align: center; color: #666; margin: 0 0 50px 0; font-size: 18px;">The brilliant minds behind our success</p>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; max-width: 1200px; margin: 0 auto;">
                            ${['CEO', 'CTO', 'Designer', 'Developer'].map(role => `
                                <div style="text-align: center;">
                                    <img src="https://via.placeholder.com/150" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px; border: 5px solid #f0f0f0;">
                                    <h3 style="margin: 0 0 5px 0; color: #333; font-size: 20px;">Team Member</h3>
                                    <p style="margin: 0 0 15px 0; color: #007bff; font-weight: 600;">${role}</p>
                                    <div style="display: flex; gap: 15px; justify-content: center;">
                                        ${['M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'].map(d => `
                                            <a href="#" style="display: inline-block; width: 35px; height: 35px; background: #f0f0f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s;" onmouseover="this.style.background='#007bff'" onmouseout="this.style.background='#f0f0f0'">
                                                <svg width="16" height="16" fill="#666" viewBox="0 0 16 16"><path d="${d}"/></svg>
                                            </a>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>`
                    },
                    {
                        name: '3 Column Layout',
                        code: `<div style="padding: 80px 50px; background: #f8f9fa;">
    <h2 style="text-align: center; font-size: 42px; margin: 0 0 50px 0; color: #333;">Our Features</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 1200px; margin: 0 auto;">
        <div style="background: white; padding: 40px; border-radius: 15px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="width: 60px; height: 60px; background: #007bff; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">1</div>
            <h3 style="margin: 0 0 15px 0; color: #333;">Fast Performance</h3>
            <p style="margin: 0; color: #666; line-height: 1.6;">Lightning fast load times and optimized performance</p>
        </div>
        <div style="background: white; padding: 40px; border-radius: 15px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="width: 60px; height: 60px; background: #28a745; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">2</div>
            <h3 style="margin: 0 0 15px 0; color: #333;">Secure</h3>
            <p style="margin: 0; color: #666; line-height: 1.6;">Bank-level security to protect your data</p>
        </div>
        <div style="background: white; padding: 40px; border-radius: 15px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="width: 60px; height: 60px; background: #ffc107; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">3</div>
            <h3 style="margin: 0 0 15px 0; color: #333;">Easy to Use</h3>
            <p style="margin: 0; color: #666; line-height: 1.6;">Intuitive interface that anyone can use</p>
        </div>
    </div>
</div>`
                    },
                    {
                        name: 'Footer',
                        code: `<footer style="background: #222; color: white; padding: 60px 50px 30px;">
    <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; margin-bottom: 40px;">
            <div>
                <h3 style="margin: 0 0 20px 0; font-size: 20px;">Company</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">About Us</a></li>
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Careers</a></li>
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Blog</a></li>
                </ul>
            </div>
            <div>
                <h3 style="margin: 0 0 20px 0; font-size: 20px;">Products</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Features</a></li>
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Pricing</a></li>
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">API</a></li>
                </ul>
            </div>
            <div>
                <h3 style="margin: 0 0 20px 0; font-size: 20px;">Support</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Help Center</a></li>
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Contact</a></li>
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Status</a></li>
                </ul>
            </div>
            <div>
                <h3 style="margin: 0 0 20px 0; font-size: 20px;">Legal</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Privacy</a></li>
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Terms</a></li>
                    <li style="margin-bottom: 10px;"><a href="#" style="color: #aaa; text-decoration: none;">Cookie Policy</a></li>
                </ul>
            </div>
        </div>
        <div style="border-top: 1px solid #444; padding-top: 30px; text-align: center; color: #888;">
            <p style="margin: 0;">© 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</footer>`
                    },
                    {
                        name: 'CTA Section',
                        code: `<div style="padding: 100px 50px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); text-align: center;">
    <div style="max-width: 700px; margin: 0 auto;">
        <h2 style="font-size: 48px; color: white; margin: 0 0 20px 0; font-weight: bold;">Ready to Get Started?</h2>
        <p style="font-size: 20px; color: rgba(255,255,255,0.95); margin: 0 0 40px 0; line-height: 1.6;">Join thousands of satisfied customers and transform your business today</p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <button style="background: white; color: #f5576c; border: none; padding: 18px 45px; border-radius: 30px; font-size: 18px; font-weight: bold; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">Start Free Trial</button>
            <button style="background: transparent; color: white; border: 2px solid white; padding: 18px 45px; border-radius: 30px; font-size: 18px; font-weight: bold; cursor: pointer;">Contact Sales</button>
        </div>
    </div>
</div>`
                    }
                ]
            };
            this.currentCategory = 'cards';
            this.init();
        }init()
        {
            const checkInterval = setInterval(() => {
                const controls = document.getElementById('controlsContainer');
                if (controls) {
                    clearInterval(checkInterval);
                    this.addTemplateButton();
                }
            }, 100);
            setTimeout(() => clearInterval(checkInterval), 10000);
        }

        addTemplateButton() {
            const controls = document.getElementById('controlsContainer');
            if (!controls || document.getElementById('templateLibraryBtn')) return;

            const button = document.createElement('button');
            button.id = 'templateLibraryBtn';
            button.className = 'bg-red-900 hover:bg-red-950 text-white px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2';
            button.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"/>
                </svg>
                Templates
            `;

            button.addEventListener('click', () => this.openModal());
            controls.appendChild(button);
            this.createModal();
        }

        createModal() {
            if (document.getElementById('templateLibraryModal')) return;

            const modal = document.createElement('div');
            modal.id = 'templateLibraryModal';
            modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6';
            modal.innerHTML = `
                <div class="bg-white rounded-lg w-full max-w-5xl h-[90vh] flex flex-col shadow-xl overflow-hidden">
                    <div class="bg-red-950 px-6 py-4 flex items-center justify-between">
                        <h2 class="text-xl font-semibold text-white flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"/>
                            </svg>
                            Template Library
                        </h2>
                        <button id="closeTemplateModal" class="text-white hover:bg-black rounded-lg p-1.5 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div class="px-6 py-3 border-b">
                        <div id="categoryTabs" class="flex gap-2 overflow-x-auto"></div>
                    </div>

                    <div class="flex-1 overflow-hidden relative">
                        <div id="sliderContainer" class="h-full"></div>
                        
                        <button id="prevSlide" class="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md z-10 transition-all opacity-0 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        
                        <button id="nextSlide" class="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md z-10 transition-all opacity-0 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>

                    <div class="px-6 py-3 border-t bg-gray-50 flex justify-center">
                        <div id="slideIndicators" class="flex gap-2"></div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            document.getElementById('closeTemplateModal').addEventListener('click', () => this.closeModal());
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'templateLibraryModal') this.closeModal();
            });

            document.getElementById('prevSlide').addEventListener('click', () => this.prevSlide());
            document.getElementById('nextSlide').addEventListener('click', () => this.nextSlide());

            this.renderCategories();
            this.renderSlider('cards');
        }

        renderCategories() {
            const container = document.getElementById('categoryTabs');
            if (!container) return;

            const categories = [
                { key: 'cards', label: 'Cards', icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5z' },
                { key: 'buttons', label: 'Buttons', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
                { key: 'forms', label: 'Forms', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { key: 'navbars', label: 'Navbars', icon: 'M4 6h16M4 12h16M4 18h16' },
                { key: 'animations', label: 'Animations', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                { key: 'layouts', label: 'Layouts', icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z' }
            ];

            container.innerHTML = categories.map(cat => `
                <button 
                    class="category-tab px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                        cat.key === this.currentCategory 
                            ? 'bg-red-900 text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                    }"
                    data-category="${cat.key}"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${cat.icon}"/>
                    </svg>
                    ${cat.label}
                </button>
            `).join('');

            document.querySelectorAll('.category-tab').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const category = e.currentTarget.dataset.category;
                    this.currentCategory = category;
                    this.currentSlide = 0;
                    document.querySelectorAll('.category-tab').forEach(b => {
                        b.className = 'category-tab px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 text-gray-700 hover:bg-gray-100';
                    });
                    e.currentTarget.className = 'category-tab px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 bg-red-900 text-white';
                    this.renderSlider(category);
                });
            });
        }

        renderSlider(category) {
            const container = document.getElementById('sliderContainer');
            if (!container) return;

            const templates = this.templates[category] || [];
            this.currentSlide = 0;

            if (templates.length === 0) {
                container.innerHTML = `
                    <div class="h-full flex items-center justify-center">
                        <div class="text-center">
                            <svg class="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                            </svg>
                            <p class="text-lg font-medium text-gray-600">No templates yet</p>
                            <p class="text-sm text-gray-400 mt-1">Templates will appear here</p>
                        </div>
                    </div>
                `;
                this.updateNavigation(0);
                return;
            }

            container.innerHTML = `
                <div class="slider-track h-full flex transition-transform duration-500 ease-out" style="transform: translateX(0%)">
                    ${templates.map((template, index) => `
                        <div class="slider-slide flex-shrink-0 w-full h-full px-8 py-6 flex items-center justify-center">
                            <div class="bg-white border rounded-lg overflow-hidden max-w-4xl w-full h-full flex flex-col">
                                <div class="bg-gray-50 px-5 py-3 flex items-center justify-between border-b">
                                    <h3 class="text-base font-medium text-gray-800">${template.name}</h3>
                                    <button 
                                        class="bg-red-900 hover:bg-red-950 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                                        onclick="window.templateLibrary.insertTemplate('${category}', ${index})"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                                        </svg>
                                        Insert Code
                                    </button>
                                </div>
                                <div class="flex-1 p-4 overflow-auto bg-white">
                                    <div class="preview-container bg-gray-50 rounded-lg p-4 h-full">
                                        ${template.code}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            this.updateNavigation(templates.length);
            this.updateIndicators(templates.length);
        }

        updateNavigation(totalSlides) {
            const prevBtn = document.getElementById('prevSlide');
            const nextBtn = document.getElementById('nextSlide');

            if (totalSlides <= 1) {
                prevBtn.style.opacity = '0';
                prevBtn.style.pointerEvents = 'none';
                nextBtn.style.opacity = '0';
                nextBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.opacity = this.currentSlide > 0 ? '1' : '0.3';
                prevBtn.style.pointerEvents = this.currentSlide > 0 ? 'auto' : 'none';
                nextBtn.style.opacity = this.currentSlide < totalSlides - 1 ? '1' : '0.3';
                nextBtn.style.pointerEvents = this.currentSlide < totalSlides - 1 ? 'auto' : 'none';
            }
        }

        updateIndicators(totalSlides) {
            const container = document.getElementById('slideIndicators');
            if (!container || totalSlides === 0) {
                container.innerHTML = '';
                return;
            }

            container.innerHTML = Array.from({ length: totalSlides }, (_, i) => `
                <button 
                    class="indicator-dot w-2 h-2 rounded-full transition-all duration-300 ${
                        i === this.currentSlide 
                            ? 'bg-red-900 w-6' 
                            : 'bg-gray-300 hover:bg-gray-400'
                    }"
                    data-slide="${i}"
                ></button>
            `).join('');

            document.querySelectorAll('.indicator-dot').forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const slideIndex = parseInt(e.target.dataset.slide);
                    this.goToSlide(slideIndex);
                });
            });
        }

        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
                this.updateSlidePosition();
            }
        }

        nextSlide() {
            const templates = this.templates[this.currentCategory] || [];
            if (this.currentSlide < templates.length - 1) {
                this.currentSlide++;
                this.updateSlidePosition();
            }
        }

        goToSlide(index) {
            const templates = this.templates[this.currentCategory] || [];
            if (index >= 0 && index < templates.length) {
                this.currentSlide = index;
                this.updateSlidePosition();
            }
        }

        updateSlidePosition() {
            const track = document.querySelector('.slider-track');
            const templates = this.templates[this.currentCategory] || [];
            
            if (track) {
                track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
            }
            
            this.updateNavigation(templates.length);
            this.updateIndicators(templates.length);
        }

        insertTemplate(category, index) {
            const template = this.templates[category][index];
            if (!template) return;

            const editor = this.getEditor();
            if (editor) {
                const currentCode = editor.getValue();
                const newCode = currentCode + '\n\n' + template.code;
                editor.setValue(newCode);
                this.showNotification(`${template.name} inserted successfully!`, 'success');
                this.closeModal();
            } else {
                this.showNotification('Could not find editor', 'error');
            }
        }

        getEditor() {
            if (window.compiler && window.compiler.editor) {
                return window.compiler.editor;
            }
            const cmElement = document.querySelector('.CodeMirror');
            if (cmElement && cmElement.CodeMirror) {
                return cmElement.CodeMirror;
            }
            return null;
        }

        openModal() {
            const modal = document.getElementById('templateLibraryModal');
            if (modal) {
                modal.classList.remove('hidden');
                this.renderSlider(this.currentCategory);
            }
        }

        closeModal() {
            const modal = document.getElementById('templateLibraryModal');
            if (modal) modal.classList.add('hidden');
        }

        showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 px-5 py-3 rounded-lg shadow-lg font-medium z-[9999] flex items-center gap-2 transform transition-all duration-300 ${
                type === 'success' ? 'bg-red-900' : 'bg-red-950'
            } text-white`;
            
            const icon = type === 'success' 
                ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
                : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
            
            notification.innerHTML = icon + '<span>' + message + '</span>';
            notification.style.transform = 'translateX(400px)';
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);

            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.templateLibrary = new TemplateLibrary();
        });
    } else {
        window.templateLibrary = new TemplateLibrary();
    }
})();