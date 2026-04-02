(function() {
    'use strict';
    class MultiPageEditor {
        constructor() {
            this.pages = {};
            this.activePageId = null;
            this.pageCounter = 1;
            this.editorInstance = null;
            this.init();
        }
        init() {
            this.waitForEditor();
        }
        waitForEditor() {
            const checkEditor = setInterval(() => {
                const editorEl = document.querySelector('.CodeMirror');
                if (editorEl && editorEl.CodeMirror) {
                    clearInterval(checkEditor);
                    this.editorInstance = editorEl.CodeMirror;
                    this.createPageSelectorButton();
                    this.createDefaultPage();
                    this.setupPreviewLinkHandler();
                }
            }, 100);
            setTimeout(() => clearInterval(checkEditor), 10000);
        }
        createPageSelectorButton() {
            const controlsContainer = document.getElementById('controlsContainer');
            if (!controlsContainer) return;
            const pageSelectorContainer = document.createElement('div');
            pageSelectorContainer.className = 'relative';
            pageSelectorContainer.innerHTML = `
                <button id="pageSelectorBtn" class="btn-clean">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span id="currentPageName">Home Page</span>
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                <div id="pageSelectorDropdown" class="hidden absolute top-full left-0 mt-4 rounded-lg shadow-2xl min-w-[320px] z-50 overflow-hidden max-h-[500px] overflow-y-auto bg-white border-2 border-black">
                </div>
            `;
            controlsContainer.insertBefore(pageSelectorContainer, controlsContainer.children[1]);
            const pageSelectorBtn = document.getElementById('pageSelectorBtn');
            const pageSelectorDropdown = document.getElementById('pageSelectorDropdown');
            if (pageSelectorBtn && pageSelectorDropdown) {
                pageSelectorBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    pageSelectorDropdown.classList.toggle('hidden');
                    if (!pageSelectorDropdown.classList.contains('hidden')) {
                        this.renderPageSelectorDropdown();
                    }
                });
                document.addEventListener('click', (e) => {
                    if (!pageSelectorDropdown.contains(e.target) && !pageSelectorBtn.contains(e.target)) {
                        pageSelectorDropdown.classList.add('hidden');
                    }
                });
            }
        }
        renderPageSelectorDropdown() {
            const dropdown = document.getElementById('pageSelectorDropdown');
            if (!dropdown) return;
            dropdown.innerHTML = '';
            const header = document.createElement('div');
            header.className = 'px-5 py-4 border-b-2 border-black bg-black';
            header.innerHTML = `
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-white font-bold text-sm flex items-center gap-2 uppercase tracking-wider">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        <span>Pages</span>
                    </h3>
                    <span class="bg-white text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">${Object.keys(this.pages).length}</span>
                </div>
                <button id="createNewPageBtnInline" class="w-full bg-white hover:bg-black text-black hover:text-white border-2 border-black font-bold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wide text-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    <span>New Page</span>
                </button>
            `;
            dropdown.appendChild(header);
            document.getElementById('createNewPageBtnInline').addEventListener('click', () => {
                this.createNewPageDialog();
                dropdown.classList.add('hidden');
            });
            const pagesContainer = document.createElement('div');
            pagesContainer.className = 'p-3 space-y-2 max-h-[400px] overflow-y-auto';
            if (Object.keys(this.pages).length === 0) {
                pagesContainer.innerHTML = `
                    <div class="text-center py-10">
                        <svg class="w-12 h-12 mx-auto text-black opacity-20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <p class="text-black font-bold uppercase tracking-wide text-xs opacity-60">No pages yet</p>
                        <p class="text-black text-xs mt-1 opacity-40">Create your first page above</p>
                    </div>
                `;
            } else {
                Object.values(this.pages).forEach((page) => {
                    const isActive = page.id === this.activePageId;
                    const pageBtn = document.createElement('div');
                    pageBtn.className = `group rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive 
                            ? 'bg-black border-2 border-black' 
                            : 'bg-white hover:bg-gray-100 border-2 border-black'
                    }`;
                    pageBtn.innerHTML = `
                        <div class="flex items-center justify-between p-3">
                            <div class="flex items-center gap-2 flex-1 min-w-0">
                                <div class="${isActive ? 'bg-white' : 'bg-black group-hover:bg-gray-800'} p-2 rounded-lg transition-all duration-200">
                                    <svg class="w-4 h-4 ${isActive ? 'text-black' : 'text-white'}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="${isActive ? 'text-white' : 'text-black group-hover:text-black'} font-bold text-sm truncate uppercase tracking-wide">${page.title}</p>
                                    <p class="${isActive ? 'text-white opacity-60' : 'text-black opacity-50'} text-xs mt-0.5">${this.formatDate(page.createdAt)}</p>
                                </div>
                                ${isActive ? '<span class="bg-white text-black text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">Active</span>' : ''}
                            </div>
                            <div class="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200" onclick="event.stopPropagation()">
                                <button class="bg-white hover:bg-black text-black hover:text-white p-1.5 rounded-lg transition-all border-2 border-black" onclick="window.multiPageEditor.renamePage('${page.id}')" title="Rename">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                </button>
                                <button class="bg-white hover:bg-black text-black hover:text-white p-1.5 rounded-lg transition-all border-2 border-black" onclick="window.multiPageEditor.deletePage('${page.id}')" title="Delete">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    `;
                    pageBtn.addEventListener('click', (e) => {
                        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
                            this.switchToPage(page.id);
                            dropdown.classList.add('hidden');
                        }
                    });
                    pagesContainer.appendChild(pageBtn);
                });
            }
            dropdown.appendChild(pagesContainer);
        }
        updateCurrentPageName() {
            const currentPageNameEl = document.getElementById('currentPageName');
            if (currentPageNameEl && this.activePageId && this.pages[this.activePageId]) {
                currentPageNameEl.textContent = this.pages[this.activePageId].title;
            }
        }
        createDefaultPage() {
            const existingCode = this.editorInstance.getValue();
            this.createPage('Home Page', existingCode || '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Home Page</title>\n</head>\n<body>\n    <h1>Welcome to Home Page</h1>\n    <p>Link to other pages: <a href="about.html">About Page</a></p>\n</body>\n</html>');
        }
        createPage(title, content = '') {
            const pageId = `page_${this.pageCounter++}_${Date.now()}`;
            if (!content) {
                content = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${title}</title>\n</head>\n<body>\n    <h1>${title}</h1>\n    <p><a href="home.html">Back to Home</a></p>\n</body>\n</html>`;
            }
            this.pages[pageId] = {
                id: pageId,
                title: title,
                content: content,
                createdAt: Date.now()
            };
            this.switchToPage(pageId);
            return pageId;
        }
        switchToPage(pageId) {
            if (this.activePageId && this.pages[this.activePageId]) {
                this.pages[this.activePageId].content = this.editorInstance.getValue();
            }
            this.activePageId = pageId;
            const page = this.pages[pageId];
            if (page) {
                this.editorInstance.setValue(page.content);
                this.editorInstance.clearHistory();
                this.updateCurrentPageName();
                setTimeout(() => {
                    this.renderPreview(page.content);
                }, 50);
            }
        }
        navigatePreviewOnly(pageId) {
            const page = this.pages[pageId];
            if (page) {
                this.renderPreview(page.content);
            }
        }
        createNewPageDialog() {
            const dialog = document.createElement('div');
            dialog.className = 'fixed inset-0 bg-black/60 flex items-center justify-center z-[10000] backdrop-blur-sm';
            dialog.innerHTML = `
                <div class="bg-white border-2 border-black rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                    <div class="text-center mb-5">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-black">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-black uppercase tracking-wide mb-1">New Page</h3>
                        <p class="text-black opacity-60 text-sm">Enter page title</p>
                    </div>
                    <div class="mb-5">
                        <input type="text" id="newPageTitle" placeholder="e.g., About, Contact, Services" class="w-full px-4 py-3 bg-white border-2 border-black rounded-lg focus:outline-none focus:border-black text-black transition-all" />
                    </div>
                    <div class="flex gap-2">
                        <button id="confirmCreatePage" class="flex-1 bg-black hover:bg-white text-white hover:text-black border-2 border-black px-5 py-3 rounded-lg font-bold uppercase tracking-wide text-xs transition-all">
                            Create Page
                        </button>
                        <button id="cancelCreatePage" class="flex-1 bg-white hover:bg-black text-black hover:text-white border-2 border-black px-5 py-3 rounded-lg font-bold uppercase tracking-wide text-xs transition-all">
                            Cancel
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(dialog);
            const input = document.getElementById('newPageTitle');
            input.focus();
            document.getElementById('confirmCreatePage').addEventListener('click', () => {
                const pageTitle = input.value.trim();
                if (pageTitle) {
                    this.createPage(pageTitle);
                    dialog.remove();
                } else {
                    input.classList.add('border-black');
                    input.placeholder = '⚠ Title required!';
                }
            });
            document.getElementById('cancelCreatePage').addEventListener('click', () => {
                dialog.remove();
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('confirmCreatePage').click();
                }
            });
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    dialog.remove();
                }
            });
        }
        renamePage(pageId) {
            const page = this.pages[pageId];
            if (!page) return;
            const dialog = document.createElement('div');
            dialog.className = 'fixed inset-0 bg-black/60 flex items-center justify-center z-[10000] backdrop-blur-sm';
            dialog.innerHTML = `
                <div class="bg-white border-2 border-black rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                    <div class="text-center mb-5">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-black">
                            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-black uppercase tracking-wide">Rename Page</h3>
                        <p class="text-black opacity-60 mt-1 text-sm">Update page title</p>
                    </div>
                    <input type="text" id="renamePageInput" value="${page.title}" class="w-full px-4 py-3 bg-white border-2 border-black rounded-lg mb-5 focus:outline-none focus:border-black text-black transition" />
                    <div class="flex gap-2">
                        <button id="confirmRename" class="flex-1 bg-black hover:bg-white text-white hover:text-black border-2 border-black px-5 py-2.5 rounded-lg font-bold uppercase tracking-wide text-xs transition-all">
                            Save
                        </button>
                        <button id="cancelRename" class="flex-1 bg-white hover:bg-black text-black hover:text-white border-2 border-black px-5 py-2.5 rounded-lg font-bold uppercase tracking-wide text-xs transition-all">
                            Cancel
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(dialog);
            const input = document.getElementById('renamePageInput');
            input.focus();
            input.select();
            document.getElementById('confirmRename').addEventListener('click', () => {
                const newTitle = input.value.trim();
                if (newTitle) {
                    page.title = newTitle;
                    this.updateCurrentPageName();
                    this.renderPageSelectorDropdown();
                    dialog.remove();
                }
            });
            document.getElementById('cancelRename').addEventListener('click', () => {
                dialog.remove();
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('confirmRename').click();
                }
            });
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) dialog.remove();
            });
        }
        deletePage(pageId) {
            if (Object.keys(this.pages).length <= 1) {
                const alertDialog = document.createElement('div');
                alertDialog.className = 'fixed inset-0 bg-black/60 flex items-center justify-center z-[10000] backdrop-blur-sm';
                alertDialog.innerHTML = `
                    <div class="bg-white border-2 border-black rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl text-center">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-black">
                            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-black mb-2 uppercase tracking-wide">Cannot Delete</h3>
                        <p class="text-black opacity-60 mb-5 text-sm">Need at least one page!</p>
                        <button onclick="this.closest('.fixed').remove()" class="bg-white hover:bg-black text-black hover:text-white border-2 border-black px-5 py-2.5 rounded-lg font-bold uppercase tracking-wide text-xs transition-all w-full">
                            Got it
                        </button>
                    </div>
                `;
                document.body.appendChild(alertDialog);
                return;
            }
            const dialog = document.createElement('div');
            dialog.className = 'fixed inset-0 bg-black/60 flex items-center justify-center z-[10000] backdrop-blur-sm';
            dialog.innerHTML = `
                <div class="bg-white border-2 border-black rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                    <div class="text-center mb-5">
                        <div class="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 bg-black">
                            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-black uppercase tracking-wide">Delete Page?</h3>
                        <p class="text-black opacity-60 mt-1 text-sm">Delete "<strong class="text-black">${this.pages[pageId].title}</strong>"?</p>
                        <p class="text-black text-xs mt-1 font-semibold opacity-80">Cannot be undone!</p>
                    </div>
                    <div class="flex gap-2">
                        <button id="confirmDelete" class="flex-1 bg-black hover:bg-white text-white hover:text-black border-2 border-black px-5 py-2.5 rounded-lg font-bold uppercase tracking-wide text-xs transition-all">
                            Delete
                        </button>
                        <button id="cancelDelete" class="flex-1 bg-white hover:bg-black text-black hover:text-white border-2 border-black px-5 py-2.5 rounded-lg font-bold uppercase tracking-wide text-xs transition-all">
                            Cancel
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(dialog);
            document.getElementById('confirmDelete').addEventListener('click', () => {
                const wasActive = this.activePageId === pageId;
                delete this.pages[pageId];
                if (wasActive) {
                    const firstPageId = Object.keys(this.pages)[0];
                    this.switchToPage(firstPageId);
                }
                this.renderPageSelectorDropdown();
                dialog.remove();
            });
            document.getElementById('cancelDelete').addEventListener('click', () => {
                dialog.remove();
            });
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) dialog.remove();
            });
        }
        setupPreviewLinkHandler() {
            const previewIframe = document.getElementById('preview');
            if (!previewIframe) return;
            previewIframe.addEventListener('load', () => {
                this.attachLinkHandlersToPreview();
            });
        }
        findPageByName(searchName) {
            searchName = searchName.toLowerCase().trim();
            for (const page of Object.values(this.pages)) {
                const pageTitle = page.title.toLowerCase().trim();
                const normalizedTitle = pageTitle.replace(/\s+/g, '-');
                if (pageTitle === searchName || 
                    normalizedTitle === searchName ||
                    pageTitle.replace(/\s+/g, '') === searchName) {
                    return page;
                }
            }
            return null;
        }
        updatePreview() {
            if (window.compiler && typeof window.compiler.previewHTML === 'function') {
                window.compiler.previewHTML();
            }
        }
        renderPreview(code) {
            const previewIframe = document.getElementById('preview');
            if (!previewIframe) return;
            const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(code);
            iframeDoc.close();
            setTimeout(() => {
                this.attachLinkHandlersToPreview();
            }, 100);
        }
        attachLinkHandlersToPreview() {
            const previewIframe = document.getElementById('preview');
            if (!previewIframe) return;
            try {
                const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
                const links = iframeDoc.querySelectorAll('a');
                links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        const href = link.getAttribute('href');
                        if (!href) return;
                        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
                            return;
                        }
                        e.preventDefault();
                        const pageName = href.replace(/^\/+|\.html$/gi, '').toLowerCase();
                        const targetPage = this.findPageByName(pageName);
                        if (targetPage) {
                            this.navigatePreviewOnly(targetPage.id);
                        } else {
                            this.showNotification(`Page "${pageName}" not found!`, 'warning');
                        }
                    });
                });
            } catch (error) {
                console.log('Could not attach link handlers:', error);
            }
        }
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `fixed bottom-8 right-8 px-5 py-3 rounded-lg shadow-2xl font-semibold z-[10000] transform transition-all border-2 border-black ${
                type === 'warning' ? 'bg-white text-black' : 
                type === 'error' ? 'bg-black text-white' : 
                'bg-white text-black'
            }`;
            notification.innerHTML = `
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="uppercase tracking-wide text-sm">${message}</span>
                </div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
        formatDate(timestamp) {
            const date = new Date(timestamp);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            if (diffMins < 1) return 'just now';
            if (diffMins < 60) return `${diffMins}m ago`;
            if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
            return date.toLocaleDateString();
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.multiPageEditor = new MultiPageEditor();
        });
    } else {
        window.multiPageEditor = new MultiPageEditor();
    }
})();