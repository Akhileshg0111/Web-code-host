(function() {
    'use strict';
    
    const GEMINI_API_KEY = 'AIzaSyBAYrR7rmytkZRvgOwFi9MI_cqGL_tTy0E';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';
    
    const ELEMENTS_LIBRARY = {
        'Hero Section': {
            html: '<section style="height: 100%; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: white; padding: 20px; text-align: center; box-sizing: border-box;"><h1 style="font-size: 2.5em; margin: 0 0 15px 0;">Welcome</h1><p style="font-size: 1.2em; margin: 0 0 25px 0;">Build something amazing</p><button style="background: white; color: var(--primary); border: none; padding: 12px 35px; font-size: 1em; border-radius: 50px; cursor: pointer; font-weight: bold;">Get Started</button></section>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>',
            category: 'Layout'
        },
        'Card': {
            html: '<div style="height: 100%; width: 100%; display: flex; flex-direction: column; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); box-sizing: border-box; overflow: hidden;"><h3 style="color: #333; margin: 0 0 10px 0;">Card Title</h3><p style="color: #666; flex-grow: 1; margin: 0 0 15px 0;">Card content goes here.</p><button style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 4px; align-self: flex-start;">Action</button></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
            category: 'Content'
        },
        'Pricing Card': {
            html: '<div style="height: 100%; width: 100%; background: white; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); text-align: center; box-sizing: border-box; display: flex; flex-direction: column;"><h3 style="color: var(--primary); margin: 0 0 10px 0; font-size: 1.5em;">Pro Plan</h3><div style="font-size: 3em; font-weight: bold; color: #333; margin: 15px 0;"><span style="font-size: 0.5em; vertical-align: super;">$</span>29</div><ul style="list-style: none; padding: 0; margin: 20px 0; flex-grow: 1;"><li style="padding: 8px 0; color: #666;">✓ Unlimited Projects</li><li style="padding: 8px 0; color: #666;">✓ Priority Support</li><li style="padding: 8px 0; color: #666;">✓ Advanced Analytics</li></ul><button style="width: 100%; background: var(--primary); color: white; border: none; padding: 14px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1em;">Choose Plan</button></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
            category: 'Content'
        },
        'Testimonial': {
            html: '<div style="height: 100%; width: 100%; background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); box-sizing: border-box;"><div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;"><div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary));"></div><div><h4 style="margin: 0; color: #333; font-size: 1.1em;">John Doe</h4><p style="margin: 0; color: #999; font-size: 0.9em;">CEO at Company</p></div></div><p style="color: #666; line-height: 1.6; margin: 0;">This product has transformed our business. Highly recommended for anyone looking to scale!</p><div style="color: #fbbf24; margin-top: 10px; font-size: 1.2em;">★★★★★</div></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>',
            category: 'Content'
        },
        'Feature Box': {
            html: '<div style="height: 100%; width: 100%; background: white; border-radius: 10px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); text-align: center; box-sizing: border-box;"><div style="width: 70px; height: 70px; margin: 0 auto 20px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2em;">⚡</div><h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.3em;">Fast Performance</h3><p style="color: #666; line-height: 1.6; margin: 0;">Lightning fast load times and optimized for peak performance.</p></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
            category: 'Content'
        },
        'Button': {
            html: '<button style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: white; border: none; display: flex; align-items: center; justify-content: center; font-size: 1em; border-radius: 8px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">Click Me</button>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>',
            category: 'Interactive'
        },
        'Icon Button': {
            html: '<button style="width: 100%; height: 100%; background: var(--primary); color: white; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 1em; border-radius: 50px; cursor: pointer; font-weight: 600; padding: 0 20px;">🚀 Launch</button>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>',
            category: 'Interactive'
        },
        'Image': {
            html: '<img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=600" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
            category: 'Media'
        },
        'Avatar': {
            html: '<div style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; color: white; font-size: 2em; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">JD</div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
            category: 'Media'
        },
        'Video Player': {
            html: '<div style="width: 100%; height: 100%; background: #000; border-radius: 8px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;"><div style="position: absolute; inset: 0; background: url(https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600) center/cover;"></div><div style="position: relative; width: 80px; height: 80px; background: rgba(255,255,255,0.95); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;"><div style="width: 0; height: 0; border-left: 25px solid var(--primary); border-top: 15px solid transparent; border-bottom: 15px solid transparent; margin-left: 5px;"></div></div></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
            category: 'Media'
        },
        'Text Block': {
            html: '<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: hidden;"><h2 style="margin-top: 0; color: #333;">Heading</h2><p style="color: #666; line-height: 1.6;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
            category: 'Content'
        },
        'Quote Block': {
            html: '<div style="width: 100%; height: 100%; padding: 20px; box-sizing: border-box; border-left: 4px solid var(--primary); background: rgba(0,0,0,0.02);"><p style="font-size: 1.2em; font-style: italic; color: #555; margin: 0 0 10px 0;">"Design is not just what it looks like and feels like. Design is how it works."</p><p style="color: #999; font-size: 0.9em; margin: 0;">— Steve Jobs</p></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
            category: 'Content'
        },
        'Stats Counter': {
            html: '<div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 20px; text-align: center; border-radius: 10px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;"><div style="font-size: 3.5em; font-weight: bold; margin: 0;">1000+</div><div style="font-size: 1.1em; margin-top: 10px; opacity: 0.9;">Happy Customers</div></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
            category: 'Content'
        },
        'Form': {
            html: '<form style="width: 100%; height: 100%; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); display: flex; flex-direction: column; justify-content: center; box-sizing: border-box;"><h3 style="margin: 0 0 15px 0; color: #333;">Contact Us</h3><input type="text" placeholder="Name" style="margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95em;"><input type="email" placeholder="Email" style="margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95em;"><textarea placeholder="Message" style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 6px; min-height: 80px; font-size: 0.95em; font-family: inherit;"></textarea><button style="background: var(--primary); color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 1em;">Send Message</button></form>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>',
            category: 'Interactive'
        },
        'Search Bar': {
            html: '<div style="width: 100%; height: 100%; display: flex; align-items: center; background: white; border-radius: 50px; padding: 0 20px; box-shadow: 0 2px 15px rgba(0,0,0,0.1); box-sizing: border-box;"><input type="text" placeholder="Search..." style="flex: 1; border: none; outline: none; font-size: 1em; padding: 10px;"><button style="background: var(--primary); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">🔍</button></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
            category: 'Interactive'
        },
        'Newsletter': {
            html: '<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;"><h3 style="margin: 0 0 10px 0; font-size: 1.5em;">Subscribe to Newsletter</h3><p style="margin: 0 0 20px 0; opacity: 0.9;">Get updates delivered to your inbox</p><div style="display: flex; gap: 10px;"><input type="email" placeholder="Enter your email" style="flex: 1; padding: 12px; border: none; border-radius: 6px; font-size: 0.95em;"><button style="background: white; color: #667eea; border: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; cursor: pointer;">Subscribe</button></div></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
            category: 'Interactive'
        },
        'Grid 2': {
            html: '<div style="width: 100%; height: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;"><div style="background: rgba(0,0,0,0.05); border: 2px dashed rgba(0,0,0,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">Column 1</div><div style="background: rgba(0,0,0,0.05); border: 2px dashed rgba(0,0,0,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">Column 2</div></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>',
            category: 'Layout'
        },
        'Grid 3': {
            html: '<div style="width: 100%; height: 100%; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;"><div style="background: rgba(0,0,0,0.05); border: 2px dashed rgba(0,0,0,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">Col 1</div><div style="background: rgba(0,0,0,0.05); border: 2px dashed rgba(0,0,0,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">Col 2</div><div style="background: rgba(0,0,0,0.05); border: 2px dashed rgba(0,0,0,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999;">Col 3</div></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"/></svg>',
            category: 'Layout'
        },
        'Grid 4': {
            html: '<div style="width: 100%; height: 100%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;"><div style="background: rgba(0,0,0,0.05); border: 2px dashed rgba(0,0,0,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.85em;">1</div><div style="background: rgba(0,0,0,0.05); border: 2px dashed rgba(0,0,0,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.85em;">2</div><div style="background: rgba(0,0,0,0.05); border: 2px dashed rgba(0,0,0,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.85em;">3</div><div style="background: rgba(0,0,0,0.05); border: 2px dashed rgba(0,0,0,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 0.85em;">4</div></div>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z"/></svg>',
            category: 'Layout'
        },
        'Navbar': {
            html: '<nav style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-between; background: white; padding: 0 30px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); box-sizing: border-box;"><span style="font-weight: bold; color: var(--primary); font-size: 1.3em;">Brand</span><div style="display: flex; gap: 25px;"><a href="#" style="text-decoration: none; color: #333; font-weight: 500;">Home</a><a href="#" style="text-decoration: none; color: #333; font-weight: 500;">About</a><a href="#" style="text-decoration: none; color: #333; font-weight: 500;">Contact</a></div></nav>',
            icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16"/></svg>',
            category: 'Layout'
        },
        'Footer': {
            html: '<footer style="width: 100%; height: 100%; background: #1f2937; color: white; padding: 30px; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box;"><div><h4 style="margin: 0 0 10px 0;">Company</h4><p style="margin: 0; opacity: 0.7; font-size: 0.9em;">© 2024 All rights reserved</p></div><div style="display: flex; gap: 15px;"><a href="#" style="color: white; text-decoration: none; opacity: 0.7;">Privacy</a><a href="#" style="color: white; text-decoration: none; opacity: 0.7;">Terms</a><a href="#" style="color: white; text-decoration: none; opacity: 0.7;">Contact</a></div></footer>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>',
category: 'Layout'
},
'Sidebar': {
html: '<aside style="width: 100%; height: 100%; background: #f8fafc; border-right: 1px solid #e2e8f0; padding: 20px; box-sizing: border-box;"><h3 style="margin: 0 0 20px 0; color: #333;">Menu</h3><div style="display: flex; flex-direction: column; gap: 10px;"><a href="#" style="padding: 10px; background: white; border-radius: 6px; text-decoration: none; color: #555; font-weight: 500;">Dashboard</a><a href="#" style="padding: 10px; background: var(--primary); color: white; border-radius: 6px; text-decoration: none; font-weight: 500;">Analytics</a><a href="#" style="padding: 10px; background: white; border-radius: 6px; text-decoration: none; color: #555; font-weight: 500;">Settings</a></div></aside>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>',
category: 'Layout'
},
'Divider': {
html: '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><div style="width: 90%; height: 2px; background: linear-gradient(to right, transparent, var(--primary), transparent);"></div></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>',
category: 'Layout'
},
'Badge': {
html: '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><span style="background: var(--primary); color: white; padding: 6px 16px; border-radius: 50px; font-size: 0.85em; font-weight: bold;">NEW</span></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>',
category: 'Content'
},
'Alert': {
html: '<div style="width: 100%; height: 100%; background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 6px; box-sizing: border-box; display: flex; align-items: center; gap: 12px;"><div style="font-size: 1.5em;">⚠️</div><div><h4 style="margin: 0 0 5px 0; color: #92400e;">Warning</h4><p style="margin: 0; color: #78350f; font-size: 0.9em;">This is an important alert message</p></div></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
category: 'Content'
},
'Progress Bar': {
html: '<div style="width: 100%; height: 100%; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;"><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span style="font-weight: 600; color: #333;">Progress</span><span style="color: #666;">75%</span></div><div style="width: 100%; height: 12px; background: #e5e7eb; border-radius: 50px; overflow: hidden;"><div style="width: 75%; height: 100%; background: linear-gradient(to right, var(--primary), var(--secondary)); border-radius: 50px;"></div></div></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
category: 'Interactive'
},
'Toggle Switch': {
html: '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; gap: 15px;"><span style="color: #666; font-weight: 500;">Dark Mode</span><div style="width: 60px; height: 32px; background: var(--primary); border-radius: 50px; position: relative; cursor: pointer;"><div style="width: 26px; height: 26px; background: white; border-radius: 50%; position: absolute; top: 3px; right: 3px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div></div></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
category: 'Interactive'
},
'Checkbox': {
html: '<div style="width: 100%; height: 100%; display: flex; align-items: center; padding: 15px; box-sizing: border-box;"><label style="display: flex; align-items: center; gap: 10px; cursor: pointer;"><input type="checkbox" style="width: 20px; height: 20px; accent-color: var(--primary);"><span style="color: #333; font-weight: 500;">Accept terms and conditions</span></label></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
category: 'Interactive'
},
'Social Icons': {
html: '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; gap: 15px;"><a href="#" style="width: 45px; height: 45px; background: #1da1f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; font-size: 1.3em;">𝕏</a><a href="#" style="width: 45px; height: 45px; background: #0077b5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; font-size: 1.3em;">in</a><a href="#" style="width: 45px; height: 45px; background: #333; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; font-size: 1.3em;">⚙</a></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>',
category: 'Media'
},
'Dropdown': {
html: '<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; display: flex; align-items: center;"><select style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1em; background: white; cursor: pointer; color: #333;"><option>Select Option</option><option>Option 1</option><option>Option 2</option><option>Option 3</option></select></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>',
category: 'Interactive'
},
'Tab Navigation': {
html: '<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box;"><div style="display: flex; gap: 5px; border-bottom: 2px solid #e5e7eb;"><button style="padding: 12px 24px; background: var(--primary); color: white; border: none; border-radius: 6px 6px 0 0; cursor: pointer; font-weight: 600;">Tab 1</button><button style="padding: 12px 24px; background: transparent; color: #666; border: none; cursor: pointer; font-weight: 600;">Tab 2</button><button style="padding: 12px 24px; background: transparent; color: #666; border: none; cursor: pointer; font-weight: 600;">Tab 3</button></div></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>',
category: 'Interactive'
},
'Breadcrumb': {
html: '<div style="width: 100%; height: 100%; display: flex; align-items: center; padding: 0 15px; box-sizing: border-box;"><nav style="display: flex; align-items: center; gap: 8px; font-size: 0.95em;"><a href="#" style="color: var(--primary); text-decoration: none;">Home</a><span style="color: #999;">/</span><a href="#" style="color: var(--primary); text-decoration: none;">Category</a><span style="color: #999;">/</span><span style="color: #666; font-weight: 600;">Page</span></nav></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>',
category: 'Layout'
},
'Tag': {
html: '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; padding: 10px; box-sizing: border-box;"><span style="background: #dbeafe; color: #1e40af; padding: 6px 14px; border-radius: 20px; font-size: 0.85em; font-weight: 600;">React</span><span style="background: #fce7f3; color: #9f1239; padding: 6px 14px; border-radius: 20px; font-size: 0.85em; font-weight: 600;">Design</span><span style="background: #d1fae5; color: #065f46; padding: 6px 14px; border-radius: 20px; font-size: 0.85em; font-weight: 600;">UI/UX</span></div>',
icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>',
category: 'Content'
}
};const THEMES = {
    blue: { primary: '#2563eb', secondary: '#1e40af' },
    purple: { primary: '#9333ea', secondary: '#7e22ce' },
    emerald: { primary: '#059669', secondary: '#047857' },
    orange: { primary: '#ea580c', secondary: '#c2410c' },
    midnight: { primary: '#0f172a', secondary: '#1e293b' },
    rose: { primary: '#e11d48', secondary: '#be123c' },
    cyan: { primary: '#06b6d4', secondary: '#0891b2' },
    amber: { primary: '#f59e0b', secondary: '#d97706' }
};

const BACKGROUNDS = [
    { name: 'White', value: '#ffffff' },
    { name: 'Light', value: '#f8fafc' },
    { name: 'Dark', value: '#0f172a' },
    { name: 'Dots', value: 'radial-gradient(#cbd5e1 1px, transparent 1px)' }
];

let currentTheme = 'blue';
let currentBackground = '#ffffff';
let elementCounter = 0;
let selectedElement = null;
let undoStack = [];
let currentCategory = 'all';

function initDragDropBuilder() {
    const dropdownContainer = document.getElementById('optionsDropdown');
    if (!dropdownContainer) return;

    const builderBtn = document.createElement('button');
    builderBtn.className = 'w-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition flex items-center gap-2 border-b border-gray-200';
    builderBtn.innerHTML = `<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg><span class="font-semibold text-white-800">Pro Page Builder</span>`;
    
    builderBtn.addEventListener('click', openBuilderModal);
    dropdownContainer.appendChild(builderBtn);
}

function openBuilderModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-gray-900 z-[9999] flex flex-col font-sans';
    modal.id = 'dragDropBuilderModal';

    const style = document.createElement('style');
    style.textContent = `
        .element-wrapper { position: absolute; cursor: move; box-sizing: border-box; user-select: none; transition: outline 0.15s ease; }
        .element-wrapper.selected { outline: 2px solid #3b82f6; outline-offset: 2px; z-index: 50; }
        .element-wrapper:hover:not(.selected) { outline: 1px dashed #94a3b8; outline-offset: 2px; }
        .element-content { width: 100%; height: 100%; overflow: hidden; pointer-events: none; }
        .resize-handle { position: absolute; width: 10px; height: 10px; background: #fff; border: 2px solid #3b82f6; border-radius: 50%; z-index: 51; display: none; transition: transform 0.15s ease; }
        .resize-handle:hover { transform: scale(1.2); }
        .element-wrapper.selected .resize-handle { display: block; }
        .resize-nw { top: -6px; left: -6px; cursor: nw-resize; }
        .resize-n { top: -6px; left: 50%; margin-left: -5px; cursor: n-resize; }
        .resize-ne { top: -6px; right: -6px; cursor: ne-resize; }
        .resize-e { top: 50%; right: -6px; margin-top: -5px; cursor: e-resize; }
        .resize-se { bottom: -6px; right: -6px; cursor: se-resize; }
        .resize-s { bottom: -6px; left: 50%; margin-left: -5px; cursor: s-resize; }
        .resize-sw { bottom: -6px; left: -6px; cursor: sw-resize; }
        .resize-w { top: 50%; left: -6px; margin-top: -5px; cursor: w-resize; }
        .builder-sidebar::-webkit-scrollbar { width: 5px; }
        .builder-sidebar::-webkit-scrollbar-thumb { background: #475569; border-radius: 5px; }
        .cat-tab.active { background: #4f46e5; color: white; }
    `;
    document.head.appendChild(style);

    modal.innerHTML = `
        <div class="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
            <div class="flex items-center gap-4">
                <span class="text-white font-bold text-lg tracking-tight">Builder<span class="text-indigo-400">Pro</span></span>
                <div class="h-6 w-px bg-gray-700"></div>
                <div class="flex gap-2">
                    <button id="undoBtn" class="p-2 text-gray-400 hover:text-white transition" title="Undo"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg></button>
                    <button id="clearCanvas" class="p-2 text-gray-400 hover:text-red-400 transition" title="Clear All"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="flex bg-gray-800 rounded-lg p-1 border border-gray-700" id="themeSelector"></div>
<button id="aiLayoutBtn" class="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-purple-600/30 flex items-center gap-2">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
    AI Layout
</button>
<button id="generateCode" class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-600/30">Export Code</button>
                <button id="closeBuilder" class="text-gray-400 hover:text-white transition"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
            </div>
        </div>
        
        <div class="flex flex-1 overflow-hidden">
            <div class="w-72 bg-gray-900 border-r border-gray-800 flex flex-col builder-sidebar z-20 shadow-xl">
                <div class="p-4 border-b border-gray-800">
                    <div class="grid grid-cols-3 gap-2 mb-3">
                        <button class="cat-tab active text-xs py-2 rounded-md text-white font-medium transition" data-cat="all">All</button>
                        <button class="cat-tab text-xs py-2 rounded-md text-gray-400 hover:text-white font-medium transition" data-cat="Layout">Layout</button>
                        <button class="cat-tab text-xs py-2 rounded-md text-gray-400 hover:text-white font-medium transition" data-cat="Content">Content</button>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="cat-tab text-xs py-2 rounded-md text-gray-400 hover:text-white font-medium transition" data-cat="Interactive">Interactive</button>
                        <button class="cat-tab text-xs py-2 rounded-md text-gray-400 hover:text-white font-medium transition" data-cat="Media">Media</button>
                    </div>
                </div>
                <div id="elementsLibrary" class="flex-1 overflow-y-auto p-4 space-y-2"></div>
            </div>

            <div class="flex-1 bg-gray-100 relative overflow-auto flex flex-col items-center py-8" id="canvasContainer">
                <div id="dropZone" class="w-[90%] max-w-[1200px] bg-white shadow-2xl min-h-[800px] relative transition-colors duration-200" style="--primary: ${THEMES[currentTheme].primary}; --secondary: ${THEMES[currentTheme].secondary};">
                    <div id="emptyState" class="absolute inset-0 flex items-center justify-center text-gray-300 pointer-events-none">
                        <div class="text-center">
                            <svg class="w-24 h-24 mx-auto opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                            <p class="mt-4 font-medium opacity-40 text-lg">Drag elements here to start building</p>
                        </div>
                    </div>
                </div>
                <div id="floatingToolbar" class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl z-50 flex items-center gap-6 opacity-0 pointer-events-none transition-all duration-200">
                    <button id="aiEditBtn" class="flex items-center gap-2 hover:text-indigo-400 text-sm font-medium transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> AI Edit</button>
                    <div class="w-px h-5 bg-gray-700"></div>
                    <button id="duplicateBtn" class="flex items-center gap-2 hover:text-green-400 text-sm font-medium transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg> Duplicate</button>
                    <div class="w-px h-5 bg-gray-700"></div>
                    <button id="deleteBtn" class="hover:text-red-400 text-sm font-medium transition">Delete</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    initializeBuilder();
    renderThemes();
}

function renderThemes() {
    const container = document.getElementById('themeSelector');
    container.innerHTML = '';
    Object.entries(THEMES).forEach(([key, colors]) => {
        const btn = document.createElement('button');
        btn.className = `w-6 h-6 rounded-full border-2 transition ${key === currentTheme ? 'border-white scale-110' : 'border-gray-600'}`;
        btn.style.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
        btn.onclick = () => {
            currentTheme = key;
            document.getElementById('dropZone').style.setProperty('--primary', colors.primary);
            document.getElementById('dropZone').style.setProperty('--secondary', colors.secondary);
            renderThemes();
        };
        container.appendChild(btn);
    });
}

function initializeBuilder() {
    renderLibrary();
    
    document.querySelectorAll('.cat-tab').forEach(t => t.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-tab').forEach(b => {
            b.classList.remove('active', 'text-white');
            b.classList.add('text-gray-400');
        });
        e.target.classList.add('active', 'text-white');
        e.target.classList.remove('text-gray-400');
        currentCategory = e.target.dataset.cat;
        renderLibrary();
    }));

    const dropZone = document.getElementById('dropZone');
    const container = document.getElementById('canvasContainer');
    
    container.addEventListener('click', (e) => {
        if(e.target === container || e.target === dropZone) {
            if(selectedElement) selectedElement.classList.remove('selected');
            selectedElement = null;
            updateToolbar();
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        dropZone.style.boxShadow = '0 0 0 3px #3b82f6';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        const name = e.dataTransfer.getData('elementName');
        
        if (name && ELEMENTS_LIBRARY[name]) {
            document.getElementById('emptyState').style.display = 'none';
            const rect = dropZone.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top + container.scrollTop;
            
            saveState();
            addElementToCanvas(name, ELEMENTS_LIBRARY[name].html, x, y);
        }
    });

    document.getElementById('deleteBtn').addEventListener('click', () => {
        if(selectedElement) {
            saveState();
            selectedElement.remove();
            selectedElement = null;
            updateToolbar();checkEmptyCanvas();
        }
    });

    document.getElementById('duplicateBtn').addEventListener('click', () => {
        if(selectedElement) {
            saveState();
            const clone = selectedElement.cloneNode(true);
            clone.id = `el-${++elementCounter}`;
            clone.style.left = `${parseInt(selectedElement.style.left) + 20}px`;
            clone.style.top = `${parseInt(selectedElement.style.top) + 20}px`;
            clone.classList.remove('selected');
            dropZone.appendChild(clone);
            setupInteractions(clone);
            selectElement(clone);
        }
    });

    document.getElementById('aiEditBtn').addEventListener('click', () => {
        if(selectedElement) openAIEditor(selectedElement);
    });

    document.getElementById('closeBuilder').addEventListener('click', () => document.getElementById('dragDropBuilderModal').remove());
    document.getElementById('aiLayoutBtn').addEventListener('click', openAILayoutArranger);
    document.getElementById('generateCode').addEventListener('click', generateCode);
    document.getElementById('undoBtn').addEventListener('click', undo);
    document.getElementById('clearCanvas').addEventListener('click', () => {
        if(confirm('Clear all elements? This cannot be undone.')) {
            saveState();
            const dropZone = document.getElementById('dropZone');
            dropZone.innerHTML = `<div id="emptyState" class="absolute inset-0 flex items-center justify-center text-gray-300 pointer-events-none"><div class="text-center"><svg class="w-24 h-24 mx-auto opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg><p class="mt-4 font-medium opacity-40 text-lg">Drag elements here to start building</p></div></div>`;
            elementCounter = 0;
            selectedElement = null;
            updateToolbar();
        }
    });
}

function renderLibrary() {
    const lib = document.getElementById('elementsLibrary');
    lib.innerHTML = '';
    
    Object.entries(ELEMENTS_LIBRARY)
        .filter(([_, data]) => currentCategory === 'all' || data.category === currentCategory)
        .forEach(([name, data]) => {
            const item = document.createElement('div');
            item.className = 'bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-indigo-500 hover:bg-gray-750 cursor-grab active:cursor-grabbing group transition-all duration-200';
            item.draggable = true;
            item.innerHTML = `
                <div class="flex items-center gap-3 pointer-events-none">
                    <div class="text-gray-400 group-hover:text-indigo-400 transition">${data.icon}</div>
                    <span class="text-gray-200 text-sm font-medium">${name}</span>
                </div>
            `;
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('elementName', name);
                item.style.opacity = '0.5';
            });
            item.addEventListener('dragend', () => item.style.opacity = '1');
            lib.appendChild(item);
        });
}

function addElementToCanvas(name, html, x, y) {
    const dropZone = document.getElementById('dropZone');
    const wrapper = document.createElement('div');
    wrapper.id = `el-${++elementCounter}`;
    wrapper.className = 'element-wrapper';
    wrapper.style.left = `${x}px`;
    wrapper.style.top = `${y}px`;
    wrapper.style.width = name === 'Hero Section' || name === 'Navbar' || name === 'Footer' ? '100%' : '300px';
    wrapper.style.height = name === 'Hero Section' ? '400px' : name === 'Navbar' || name === 'Footer' ? '80px' : 'auto';
    if (name === 'Navbar' || name === 'Footer') wrapper.style.left = '0';

    wrapper.innerHTML = `
        <div class="element-content">${html}</div>
        <div class="resize-handle resize-nw"></div><div class="resize-handle resize-n"></div>
        <div class="resize-handle resize-ne"></div><div class="resize-handle resize-e"></div>
        <div class="resize-handle resize-se"></div><div class="resize-handle resize-s"></div>
        <div class="resize-handle resize-sw"></div><div class="resize-handle resize-w"></div>
    `;

    dropZone.appendChild(wrapper);
    setupInteractions(wrapper);
    updateCanvasHeight();
    selectElement(wrapper);
}

function selectElement(el) {
    if (selectedElement) selectedElement.classList.remove('selected');
    selectedElement = el;
    el.classList.add('selected');
    updateToolbar();
}

function updateToolbar() {
    const toolbar = document.getElementById('floatingToolbar');
    if (selectedElement) {
        toolbar.style.opacity = '1';
        toolbar.style.pointerEvents = 'auto';
    } else {
        toolbar.style.opacity = '0';
        toolbar.style.pointerEvents = 'none';
    }
}

function checkEmptyCanvas() {
    const dropZone = document.getElementById('dropZone');
    const hasElements = dropZone.querySelectorAll('.element-wrapper').length > 0;
    const emptyState = document.getElementById('emptyState');
    if (emptyState) {
        emptyState.style.display = hasElements ? 'none' : 'flex';
    }
}

function updateCanvasHeight() {
    const dropZone = document.getElementById('dropZone');
    const elements = dropZone.querySelectorAll('.element-wrapper');
    let maxBottom = 800;

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const parentRect = dropZone.getBoundingClientRect();
        const bottom = (rect.top - parentRect.top) + rect.height;
        if (bottom > maxBottom) maxBottom = bottom;
    });

    dropZone.style.minHeight = `${maxBottom + 200}px`;
}

function setupInteractions(wrapper) {
    wrapper.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('resize-handle')) return;
        e.stopPropagation();
        selectElement(wrapper);

        const startX = e.clientX;
        const startY = e.clientY;
        const startLeft = wrapper.offsetLeft;
        const startTop = wrapper.offsetTop;

        function onMove(ev) {
            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;
            wrapper.style.left = `${startLeft + dx}px`;
            wrapper.style.top = `${startTop + dy}px`;
            updateCanvasHeight();
        }

        function onUp() {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
            saveState();
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });

    wrapper.querySelectorAll('.resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = wrapper.offsetWidth;
            const startHeight = wrapper.offsetHeight;
            const startLeft = wrapper.offsetLeft;
            const startTop = wrapper.offsetTop;
            const type = Array.from(handle.classList).find(c => c.startsWith('resize-')).split('-')[1];

            function onResize(ev) {
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;

                if (type.includes('e')) wrapper.style.width = `${Math.max(50, startWidth + dx)}px`;
                if (type.includes('s')) wrapper.style.height = `${Math.max(30, startHeight + dy)}px`;
                if (type.includes('w')) {
                    const newWidth = Math.max(50, startWidth - dx);
                    wrapper.style.width = `${newWidth}px`;
                    wrapper.style.left = `${startLeft + (startWidth - newWidth)}px`;
                }
                if (type.includes('n')) {
                    const newHeight = Math.max(30, startHeight - dy);
                    wrapper.style.height = `${newHeight}px`;
                    wrapper.style.top = `${startTop + (startHeight - newHeight)}px`;
                }
                updateCanvasHeight();
            }

            function onStop() {
                document.removeEventListener('mousemove', onResize);
                document.removeEventListener('mouseup', onStop);
                saveState();
            }

            document.addEventListener('mousemove', onResize);
            document.addEventListener('mouseup', onStop);
        });
    });
}

function saveState() {
    const dropZone = document.getElementById('dropZone');
    undoStack.push(dropZone.innerHTML);
    if(undoStack.length > 20) undoStack.shift();
}

function undo() {
    if(undoStack.length === 0) return;
    const html = undoStack.pop();
    const dropZone = document.getElementById('dropZone');
    dropZone.innerHTML = html;
    
    dropZone.querySelectorAll('.element-wrapper').forEach(el => setupInteractions(el));
    selectedElement = null;
    updateToolbar();
    checkEmptyCanvas();
}

function openAIEditor(wrapper) {
    const content = wrapper.querySelector('.element-content');
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center backdrop-blur-sm';
    overlay.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl p-7 w-[550px] max-w-[90vw]">
            <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI Assistant</span>
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </h3>
            <p class="text-gray-600 mb-4 text-sm">Describe your changes and AI will modify the element for you</p>
            <textarea id="aiPrompt" class="w-full border-2 border-gray-200 rounded-xl p-4 mb-4 h-36 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none" placeholder="Examples:
- Make the button round with red background
- Increase font size to 24px
- Add a shadow effect and gradient
- Change to dark theme with white text
- Center align all content"></textarea>
            <div class="flex justify-end gap-3">
                <button id="cancelAi" class="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">Cancel</button>
                <button id="runAi" class="px-7 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition flex items-center gap-2 font-medium shadow-lg shadow-indigo-500/30">
                    <span>Generate</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#cancelAi').addEventListener('click', () => {
        overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    overlay.querySelector('#runAi').addEventListener('click', async (e) => {
        const btn = e.target.closest('button');
        const promptInput = document.getElementById('aiPrompt');
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            promptInput.classList.add('border-red-500');
            setTimeout(() => promptInput.classList.remove('border-red-500'), 1000);
            return;
        }
        
        const originalHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="ml-2">Processing...</span>`;
        
        try {
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are an expert HTML/CSS developer. Modify the provided HTML element based on the user's request.

CRITICAL REQUIREMENTS:
1. The root element MUST have style="width:100%; height:100%;"
2. Preserve all box-sizing: border-box where appropriate
3. Return ONLY the modified HTML code
4. Do NOT include markdown code blocks, backticks, or explanations
5. Keep the structure semantic and clean
6. Ensure responsive behavior is maintained
7. Use inline styles as the original does

Current HTML Element:
${content.innerHTML}

User Modification Request:
${prompt}

Return the complete modified HTML:`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 2048
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response from AI');
            }

            let newHtml = data.candidates[0].content.parts[0].text;
            newHtml = newHtml.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();
            
            if (!newHtml || newHtml.length < 10) {
                throw new Error('Generated HTML is too short or empty');
            }

            saveState();
            content.innerHTML = newHtml;
            overlay.remove();
            showToast('✨ Element updated successfully!');
            
        } catch(err) {
            console.error('AI Editor Error:', err);
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            
            const errorMsg = document.createElement('div');
            errorMsg.className = 'mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm';
            errorMsg.innerHTML = `<strong>Error:</strong> ${err.message || 'Failed to process AI request. Please try again.'}`;
            btn.parentElement.parentElement.insertBefore(errorMsg, btn.parentElement);
            
            setTimeout(() => errorMsg.remove(), 5000);
        }
    });

    document.getElementById('aiPrompt').focus();
}
function openAILayoutArranger() {
    const dropZone = document.getElementById('dropZone');
    const elements = dropZone.querySelectorAll('.element-wrapper');
    
    if (elements.length === 0) {
        showToast('⚠️ Add some elements first!');
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center backdrop-blur-sm';
    overlay.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl p-7 w-[650px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
            <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">AI Layout Arranger</span>
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
            </h3>
            <p class="text-gray-600 mb-4 text-sm">Describe how you want to arrange and enhance your page layout</p>
            
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-4">
                <h4 class="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Current Elements (${elements.length})
                </h4>
                <div class="flex flex-wrap gap-2 mt-2">
                    ${Array.from(elements).map(el => {
                        const content = el.querySelector('.element-content');
                        let elementType = 'Element';
                        if (content.querySelector('nav')) elementType = 'Navbar';
                        else if (content.querySelector('footer')) elementType = 'Footer';
                        else if (content.querySelector('button')) elementType = 'Button';
                        else if (content.querySelector('form')) elementType = 'Form';
                        else if (content.querySelector('h1')) elementType = 'Hero';
                        else if (content.querySelector('img')) elementType = 'Image';
                        return `<span class="bg-white px-3 py-1 rounded-full text-xs font-medium text-purple-700 border border-purple-200">${elementType}</span>`;
                    }).join('')}
                </div>
            </div>
            
            <textarea id="layoutPrompt" class="w-full border-2 border-gray-200 rounded-xl p-4 mb-4 h-40 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition resize-none" placeholder="Examples:
- Create a professional landing page layout
- Arrange elements in a modern grid with hero at top
- Make it look like a SaaS homepage
- Add spacing between elements and center everything
- Create a sidebar layout with navbar at top
- Arrange in a portfolio style with image gallery
- Make it mobile-friendly with proper hierarchy"></textarea>
            
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-yellow-800">
                <strong>⚡ AI Powers:</strong> Can rearrange, resize, add new elements, modify styling, improve spacing, and completely redesign your layout!
            </div>
            
            <div class="flex justify-end gap-3">
                <button id="cancelLayoutAi" class="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">Cancel</button>
                <button id="runLayoutAi" class="px-7 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center gap-2 font-medium shadow-lg shadow-purple-500/30">
                    <span>Transform Layout</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#cancelLayoutAi').addEventListener('click', () => {
        overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    overlay.querySelector('#runLayoutAi').addEventListener('click', async (e) => {
        const btn = e.target.closest('button');
        const promptInput = document.getElementById('layoutPrompt');
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            promptInput.classList.add('border-red-500');
            setTimeout(() => promptInput.classList.remove('border-red-500'), 1000);
            return;
        }
        
        const originalHTML = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span class="ml-2">AI is working magic...</span>`;
        
        try {
            // Collect current elements data
            const elementsData = Array.from(elements).map((el, idx) => {
                return {
                    id: idx + 1,
                    html: el.querySelector('.element-content').innerHTML,
                    position: {
                        left: el.style.left,
                        top: el.style.top,
                        width: el.style.width,
                        height: el.style.height
                    }
                };
            });

            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are an expert web designer and developer. You need to arrange and enhance a web page layout.

CRITICAL REQUIREMENTS:
1. Return ONLY a JSON array of elements
2. Each element MUST have this structure:
   {
     "html": "complete HTML with inline styles including width:100%; height:100%;",
     "position": {
       "left": "value in px",
       "top": "value in px", 
       "width": "value in px or %",
       "height": "value in px or auto"
     }
   }
3. You can:
   - analyse all the elements and organise them properly
   - Rearrange existing elements and don't add new elements when asked to re arrange
   - Modify their HTML and styling
   - Add NEW elements if needed for better design
   - Remove elements that don't fit
   - Improve spacing, alignment, colors
   - Add backgrounds, shadows, effects
4. All HTML must use inline styles
5. Ensure professional spacing (minimum 20-30px between elements)
6. Make it visually appealing and modern
7. Return ONLY the JSON array, no explanations or markdown

Current Page Canvas:
- Canvas Width: 1200px maximum (elements must fit within this)
- Primary Color: ${THEMES[currentTheme].primary}
- Secondary Color: ${THEMES[currentTheme].secondary}

POSITIONING RULES (VERY IMPORTANT):
- left: must be between 0px and 1100px (stay within canvas)
- top: must start from 0px and increment properly (e.g., 0px, 100px, 500px, 800px)
- width: use "100%" for full-width elements (navbar, hero, footer) OR pixel values like "300px", "400px", "600px" up to 1200px
- height: use "auto" for flexible height OR specific values like "400px", "80px"
- Full-width elements (Navbar/Header/Footer): MUST use width: "100%" and left: "0px"
- Content elements: keep width between 200px-800px and position them with left values between 0-400px
- Stack elements vertically with proper top spacing (start at 0px, then 100px, 400px, 900px, etc.)

EXAMPLE OF GOOD POSITIONING:
[
  {"html": "...", "position": {"left": "0px", "top": "0px", "width": "100%", "height": "80px"}},
  {"html": "...", "position": {"left": "0px", "top": "80px", "width": "100%", "height": "400px"}},
  {"html": "...", "position": {"left": "50px", "top": "520px", "width": "350px", "height": "auto"}},
  {"html": "...", "position": {"left": "450px", "top": "520px", "width": "350px", "height": "auto"}}
]

Current Elements:
${JSON.stringify(elementsData, null, 2)}

User Request:
${prompt}

Return the complete JSON array of arranged/enhanced elements:`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.8,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 8192
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response from AI');
            }

            let aiResponse = data.candidates[0].content.parts[0].text;
            
            aiResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            

            let newElements;
            try {
                newElements = JSON.parse(aiResponse);
            } catch (parseError) {

                const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    newElements = JSON.parse(jsonMatch[0]);
                } else {
                    throw new Error('Could not parse AI response as JSON');
                }
            }

            if (!Array.isArray(newElements) || newElements.length === 0) {
                throw new Error('AI did not return a valid element array');
            }


            saveState();


            dropZone.innerHTML = `<div id="emptyState" class="absolute inset-0 flex items-center justify-center text-gray-300 pointer-events-none" style="display: none;"><div class="text-center"><svg class="w-24 h-24 mx-auto opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg><p class="mt-4 font-medium opacity-40 text-lg">Drag elements here to start building</p></div></div>`;


            const canvasWidth = dropZone.offsetWidth;


            newElements.forEach((elementData, index) => {
                const wrapper = document.createElement('div');
                wrapper.id = `el-${++elementCounter}`;
                wrapper.className = 'element-wrapper';
                

                let left = parseInt(elementData.position.left) || 0;
                let top = parseInt(elementData.position.top) || 0;
                let width = elementData.position.width;
                let height = elementData.position.height;
                

                left = Math.max(0, Math.min(left, canvasWidth - 100)); 
                top = Math.max(0, top);
                

                if (width && width.includes('%')) {

                } else {
                    let widthPx = parseInt(width) || 300;
                    widthPx = Math.min(widthPx, canvasWidth); 
                    width = `${widthPx}px`;
                }
                

                wrapper.style.left = `${left}px`;
                wrapper.style.top = `${top}px`;
                wrapper.style.width = width;
                wrapper.style.height = height || 'auto';

                wrapper.innerHTML = `
                    <div class="element-content">${elementData.html}</div>
                    <div class="resize-handle resize-nw"></div>
                    <div class="resize-handle resize-n"></div>
                    <div class="resize-handle resize-ne"></div>
                    <div class="resize-handle resize-e"></div>
                    <div class="resize-handle resize-se"></div>
                    <div class="resize-handle resize-s"></div>
                    <div class="resize-handle resize-sw"></div>
                    <div class="resize-handle resize-w"></div>
                `;

                dropZone.appendChild(wrapper);
                setupInteractions(wrapper);
            });

            updateCanvasHeight();
            selectedElement = null;
            updateToolbar();
            
            overlay.remove();
            showToast('✨ Layout transformed successfully!');
            
        } catch(err) {
            console.error('AI Layout Arranger Error:', err);
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            
            const errorMsg = document.createElement('div');
            errorMsg.className = 'mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm';
            errorMsg.innerHTML = `<strong>Error:</strong> ${err.message || 'Failed to process AI request. Please try again.'}`;
            btn.parentElement.parentElement.insertBefore(errorMsg, btn.parentElement);
            
            setTimeout(() => errorMsg.remove(), 5000);
        }
    });

    document.getElementById('layoutPrompt').focus();
}

function generateCode() {
    const dropZone = document.getElementById('dropZone');
    const elements = dropZone.querySelectorAll('.element-wrapper');
    
    if (elements.length === 0) {
        showToast('⚠️ Add some elements first!');
        return;
    }
    
    let bodyContent = '';

    elements.forEach(el => {
        const content = el.querySelector('.element-content').innerHTML;
        bodyContent += `<div style="position: absolute; left: ${el.style.left}; top: ${el.style.top}; width: ${el.style.width}; height: ${el.style.height};">${content}</div>\n`;
    });

    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Generated Page - BuilderPro</title>
<style>
:root { 
    --primary: ${THEMES[currentTheme].primary}; 
    --secondary: ${THEMES[currentTheme].secondary}; 
}
* { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
}
body { 
    margin: 0; 
    background: ${currentBackground}; 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
    min-height: 100vh; 
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
a {
    color: inherit;
    transition: all 0.3s ease;
}
button {
    transition: all 0.3s ease;
}
button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
input, textarea, select {
    font-family: inherit;
}
</style>
</head>
<body>
${bodyContent}
</body>
</html>`;

    const cm = document.querySelector('.CodeMirror')?.CodeMirror;
    if (cm) {
        cm.setValue(fullHtml);
    } else {
        const textarea = document.getElementById('code');
        if (textarea) {
            textarea.value = fullHtml;
        }
    }

    document.getElementById('dragDropBuilderModal').remove();
    
    if (window.compiler?.previewHTML) {
        window.compiler.previewHTML();
    }
    
    showToast('✅ Code exported successfully!');
}

function showToast(msg) {
    const existingToast = document.querySelector('.builder-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'builder-toast fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl z-[10001] font-medium flex items-center gap-3';
    toast.innerHTML = `<span>${msg}</span>`;
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });
    });
    
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}



function setupInteractions(wrapper) {
    let isDragging = false;
    let isResizing = false;

    wrapper.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('resize-handle')) return;
        if (isResizing) return;
        
        e.stopPropagation();
        selectElement(wrapper);

        isDragging = true;
        const startX = e.clientX;
        const startY = e.clientY;
        const startLeft = parseInt(wrapper.style.left) || 0;
        const startTop = parseInt(wrapper.style.top) || 0;

        function onMove(ev) {
            if (!isDragging) return;
            
            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;
            
            wrapper.style.left = `${Math.max(0, startLeft + dx)}px`;
            wrapper.style.top = `${Math.max(0, startTop + dy)}px`;
            updateCanvasHeight();
        }

        function onUp() {
            if (isDragging) {
                isDragging = false;
                saveState();
            }
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });

    wrapper.querySelectorAll('.resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            isResizing = true;
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = wrapper.offsetWidth;
            const startHeight = wrapper.offsetHeight;
            const startLeft = parseInt(wrapper.style.left) || 0;
            const startTop = parseInt(wrapper.style.top) || 0;
            const type = Array.from(handle.classList).find(c => c.startsWith('resize-')).split('-')[1];

            function onResize(ev) {
                if (!isResizing) return;
                
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;

                if (type.includes('e')) {
                    wrapper.style.width = `${Math.max(50, startWidth + dx)}px`;
                }
                if (type.includes('s')) {
                    wrapper.style.height = `${Math.max(30, startHeight + dy)}px`;
                }
                if (type.includes('w')) {
                    const newWidth = Math.max(50, startWidth - dx);
                    wrapper.style.width = `${newWidth}px`;
                    wrapper.style.left = `${startLeft + (startWidth - newWidth)}px`;
                }
                if (type.includes('n')) {
                    const newHeight = Math.max(30, startHeight - dy);
                    wrapper.style.height = `${newHeight}px`;
                    wrapper.style.top = `${startTop + (startHeight - newHeight)}px`;
                }
                updateCanvasHeight();
            }

            function onStop() {
                if (isResizing) {
                    isResizing = false;
                    saveState();
                }
                document.removeEventListener('mousemove', onResize);
                document.removeEventListener('mouseup', onStop);
            }

            document.addEventListener('mousemove', onResize);
            document.addEventListener('mouseup', onStop);
        });
    });
}

function selectElement(el) {
    if (selectedElement && selectedElement !== el) {
        selectedElement.classList.remove('selected');
    }
    selectedElement = el;
    el.classList.add('selected');
    updateToolbar();
}


function addElementToCanvas(name, html, x, y) {
    const dropZone = document.getElementById('dropZone');
    const wrapper = document.createElement('div');
    wrapper.id = `el-${++elementCounter}`;
    wrapper.className = 'element-wrapper';
    
    const isFullWidth = name === 'Hero Section' || name === 'Navbar' || name === 'Footer';
    const defaultWidth = isFullWidth ? '100%' : '300px';
    const defaultHeight = name === 'Hero Section' ? '400px' : 
                         (name === 'Navbar' || name === 'Footer') ? '80px' : 'auto';
    
    wrapper.style.left = isFullWidth ? '0' : `${Math.max(0, x - 150)}px`;
    wrapper.style.top = `${Math.max(0, y)}px`;
    wrapper.style.width = defaultWidth;
    wrapper.style.height = defaultHeight;

    wrapper.innerHTML = `
        <div class="element-content">${html}</div>
        <div class="resize-handle resize-nw"></div>
        <div class="resize-handle resize-n"></div>
        <div class="resize-handle resize-ne"></div>
        <div class="resize-handle resize-e"></div>
        <div class="resize-handle resize-se"></div>
        <div class="resize-handle resize-s"></div>
        <div class="resize-handle resize-sw"></div>
        <div class="resize-handle resize-w"></div>
    `;

    dropZone.appendChild(wrapper);
    setupInteractions(wrapper);
    updateCanvasHeight();
    selectElement(wrapper);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDragDropBuilder);
} else {
    initDragDropBuilder();
}

})();