(function() {
    'use strict';
    
    const THEMES = {
        red: {
            primary: '#ff0000',
            primaryLight: 'rgba(255, 0, 0, 0.3)',
            primaryDark: '#cc0000',
            gradient: 'linear-gradient(to right, #ff0000, #cc0000)',
            shadow: '0 0 15px rgba(255, 0, 0, 0.7)',
            glowSmall: '0 0 8px #ff0000',
            glowMedium: '0 0 15px #ff0000, 0 0 30px #ff0000',
            borderColor: 'rgba(255, 0, 0, 0.3)',
            textShadow: '0 0 15px rgba(255, 0, 0, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(30, 10, 50, 0.4) 0%, transparent 80%)'
        },
        blue: {
            primary: '#0066ff',
            primaryLight: 'rgba(0, 102, 255, 0.3)',
            primaryDark: '#0052cc',
            gradient: 'linear-gradient(to right, #0066ff, #0052cc)',
            shadow: '0 0 15px rgba(0, 102, 255, 0.7)',
            glowSmall: '0 0 8px #0066ff',
            glowMedium: '0 0 15px #0066ff, 0 0 30px #0066ff',
            borderColor: 'rgba(0, 102, 255, 0.3)',
            textShadow: '0 0 15px rgba(0, 102, 255, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(10, 30, 50, 0.4) 0%, transparent 80%)'
        },
        green: {
            primary: '#00ff00',
            primaryLight: 'rgba(0, 255, 0, 0.3)',
            primaryDark: '#00cc00',
            gradient: 'linear-gradient(to right, #00ff00, #00cc00)',
            shadow: '0 0 15px rgba(0, 255, 0, 0.7)',
            glowSmall: '0 0 8px #00ff00',
            glowMedium: '0 0 15px #00ff00, 0 0 30px #00ff00',
            borderColor: 'rgba(0, 255, 0, 0.3)',
            textShadow: '0 0 15px rgba(0, 255, 0, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(10, 50, 30, 0.4) 0%, transparent 80%)'
        },
        purple: {
            primary: '#9900ff',
            primaryLight: 'rgba(153, 0, 255, 0.3)',
            primaryDark: '#7700cc',
            gradient: 'linear-gradient(to right, #9900ff, #7700cc)',
            shadow: '0 0 15px rgba(153, 0, 255, 0.7)',
            glowSmall: '0 0 8px #9900ff',
            glowMedium: '0 0 15px #9900ff, 0 0 30px #9900ff',
            borderColor: 'rgba(153, 0, 255, 0.3)',
            textShadow: '0 0 15px rgba(153, 0, 255, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(30, 10, 50, 0.4) 0%, transparent 80%)'
        },
        cyan: {
            primary: '#00ffff',
            primaryLight: 'rgba(0, 255, 255, 0.3)',
            primaryDark: '#00cccc',
            gradient: 'linear-gradient(to right, #00ffff, #00cccc)',
            shadow: '0 0 15px rgba(0, 255, 255, 0.7)',
            glowSmall: '0 0 8px #00ffff',
            glowMedium: '0 0 15px #00ffff, 0 0 30px #00ffff',
            borderColor: 'rgba(0, 255, 255, 0.3)',
            textShadow: '0 0 15px rgba(0, 255, 255, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(10, 40, 50, 0.4) 0%, transparent 80%)'
        },
        orange: {
            primary: '#ff6600',
            primaryLight: 'rgba(255, 102, 0, 0.3)',
            primaryDark: '#cc5200',
            gradient: 'linear-gradient(to right, #ff6600, #cc5200)',
            shadow: '0 0 15px rgba(255, 102, 0, 0.7)',
            glowSmall: '0 0 8px #ff6600',
            glowMedium: '0 0 15px #ff6600, 0 0 30px #ff6600',
            borderColor: 'rgba(255, 102, 0, 0.3)',
            textShadow: '0 0 15px rgba(255, 102, 0, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(50, 25, 10, 0.4) 0%, transparent 80%)'
        },
        yellow: {
            primary: '#ffff00',
            primaryLight: 'rgba(255, 255, 0, 0.3)',
            primaryDark: '#cccc00',
            gradient: 'linear-gradient(to right, #ffff00, #cccc00)',
            shadow: '0 0 15px rgba(255, 255, 0, 0.7)',
            glowSmall: '0 0 8px #ffff00',
            glowMedium: '0 0 15px #ffff00, 0 0 30px #ffff00',
            borderColor: 'rgba(255, 255, 0, 0.3)',
            textShadow: '0 0 15px rgba(255, 255, 0, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(50, 50, 10, 0.4) 0%, transparent 80%)'
        },
        pink: {
            primary: '#ff0099',
            primaryLight: 'rgba(255, 0, 153, 0.3)',
            primaryDark: '#cc0077',
            gradient: 'linear-gradient(to right, #ff0099, #cc0077)',
            shadow: '0 0 15px rgba(255, 0, 153, 0.7)',
            glowSmall: '0 0 8px #ff0099',
            glowMedium: '0 0 15px #ff0099, 0 0 30px #ff0099',
            borderColor: 'rgba(255, 0, 153, 0.3)',
            textShadow: '0 0 15px rgba(255, 0, 153, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(50, 10, 30, 0.4) 0%, transparent 80%)'
        },
        white: {
            primary: '#ffffff',
            primaryLight: 'rgba(255, 255, 255, 0.4)',
            primaryDark: '#cccccc',
            gradient: 'linear-gradient(to right, #ffffff, #cccccc)',
            shadow: '0 0 15px rgba(255, 255, 255, 0.7)',
            glowSmall: '0 0 8px #ffffff',
            glowMedium: '0 0 15px #ffffff, 0 0 30px #ffffff',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(40, 40, 50, 0.4) 0%, transparent 80%)'
        },
        violet: {
            primary: '#8800ff',
            primaryLight: 'rgba(136, 0, 255, 0.3)',
            primaryDark: '#6600cc',
            gradient: 'linear-gradient(to right, #8800ff, #6600cc)',
            shadow: '0 0 15px rgba(136, 0, 255, 0.7)',
            glowSmall: '0 0 8px #8800ff',
            glowMedium: '0 0 15px #8800ff, 0 0 30px #8800ff',
            borderColor: 'rgba(136, 0, 255, 0.3)',
            textShadow: '0 0 15px rgba(136, 0, 255, 0.9)',
            bgGradient: 'radial-gradient(circle at 50% 50%, rgba(25, 10, 50, 0.4) 0%, transparent 80%)'
        }
    };

    let currentTheme = 'red';
    let themeData = {};

    try {
        themeData = JSON.parse(sessionStorage.getItem('editorTheme') || '{}');
        currentTheme = themeData.theme || 'red';
    } catch(e) {
        currentTheme = 'red';
    }

    function createThemeSwitcher() {
        const themeButton = document.createElement('button');
        themeButton.className = 'w-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 border-b border-gray-200';
        themeButton.innerHTML = `
            <svg class="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
            </svg>
            <span class="font-medium text-white-800">Color Theme</span>
        `;

        const themeModal = document.createElement('div');
        themeModal.className = 'hidden fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4';
        themeModal.style.backdropFilter = 'blur(4px)';
        themeModal.innerHTML = `
            <div class="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden transform transition-all">
                <div class="bg-black px-6 py-5">
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 class="text-2xl font-bold text-white tracking-tight">Select Theme</h2>
                            <p class="text-sm text-gray-400 mt-1">Choose your preferred color scheme</p>
                        </div>
                        <button id="closeThemeModal" class="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="p-6 bg-gradient-to-br from-gray-50 to-white">
                    <div class="grid grid-cols-5 gap-3">
                        ${Object.keys(THEMES).map(themeName => `
                            <button class="theme-option group flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${currentTheme === themeName ? 'border-gray-800 bg-gradient-to-br from-gray-100 to-white shadow-md' : 'border-gray-200 hover:border-gray-400 bg-white'}" data-theme="${themeName}">
                                <div class="w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110" style="background: ${THEMES[themeName].gradient}; box-shadow: ${THEMES[themeName].glowSmall}"></div>
                                <span class="text-xs font-semibold text-gray-700 capitalize tracking-wide">${themeName}</span>
                                ${currentTheme === themeName ? '<div class="w-1.5 h-1.5 rounded-full bg-gray-800"></div>' : ''}
                            </button>
                        `).join('')}
                    </div>
                    <div class="mt-5 pt-5 border-t border-gray-200">
                        <p class="text-xs text-gray-500 text-center">Theme preference is saved for this session</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(themeModal);

        themeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            themeModal.classList.remove('hidden');
        });

        themeModal.querySelector('#closeThemeModal').addEventListener('click', () => {
            themeModal.classList.add('hidden');
        });

        themeModal.addEventListener('click', (e) => {
            if (e.target === themeModal) {
                themeModal.classList.add('hidden');
            }
        });

        themeModal.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const themeName = btn.dataset.theme;
                applyTheme(themeName);
                themeModal.classList.add('hidden');
                
                themeModal.querySelectorAll('.theme-option').forEach(b => {
                    b.classList.remove('border-gray-800', 'bg-gradient-to-br', 'from-gray-100', 'to-white', 'shadow-md');
                    b.classList.add('border-gray-200', 'bg-white');
                    const indicator = b.querySelector('.w-1\\.5');
                    if (indicator) indicator.remove();
                });
                
                btn.classList.remove('border-gray-200', 'bg-white');
                btn.classList.add('border-gray-800', 'bg-gradient-to-br', 'from-gray-100', 'to-white', 'shadow-md');
                btn.innerHTML += '<div class="w-1.5 h-1.5 rounded-full bg-gray-800"></div>';
            });
        });

        const optionsDropdown = document.getElementById('optionsDropdown');
        if (optionsDropdown) {
            optionsDropdown.appendChild(themeButton);
        }
    }

    function applyTheme(themeName) {
        const theme = THEMES[themeName];
        currentTheme = themeName;
        
        try {
            sessionStorage.setItem('editorTheme', JSON.stringify({ theme: themeName }));
        } catch(e) {
            console.error('Failed to save theme');
        }

        document.body.style.backgroundImage = `${theme.bgGradient}, url('https://www.transparenttextures.com/patterns/stardust.png')`;

        const style = document.createElement('style');
        style.id = 'dynamic-theme-style';
        const existingStyle = document.getElementById('dynamic-theme-style');
        if (existingStyle) existingStyle.remove();

        style.textContent = `
            .btn-clean {
                border-color: ${theme.primaryLight} !important;
            }
            .btn-clean:hover {
                color: ${theme.primary} !important;
                text-shadow: ${theme.textShadow} !important;
                border-color: ${theme.primary} !important;
                box-shadow: 0 0 10px ${theme.primaryLight} !important;
            }
            .saber-header {
                box-shadow: ${theme.glowMedium} !important;
            }
            .saber-label {
                color: ${theme.primary} !important;
            }
            .lightsaber-divider {
                box-shadow: ${theme.glowMedium} !important;
            }
            h1 {
                text-shadow: ${theme.shadow} !important;
            }
            .w-20.h-0\\.5 {
                box-shadow: ${theme.glowSmall} !important;
                background: ${theme.primary} !important;
            }
            #optionsDropdown {
                border-color: ${theme.primaryDark} !important;
            }
        `;

        document.head.appendChild(style);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createThemeSwitcher();
            applyTheme(currentTheme);
        });
    } else {
        createThemeSwitcher();
        applyTheme(currentTheme);
    }
})();