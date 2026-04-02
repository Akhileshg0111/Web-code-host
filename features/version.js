class VersionControl {
    constructor() {
        this.versions = [];
        this.maxVersions = 50;
        this.storageKey = 'code_versions';
        this.autoSaveInterval = null;
        
        this.loadVersions();
        this.createUI();
        this.setupEventListeners();
        this.startAutoSave();
    }

    createUI() {
 const versionButton = document.createElement('button');
 versionButton.id = 'versionControlBtn';
 versionButton.innerHTML = `
     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
     </svg>
     <span class="font-semibold text-white-800">ArchiveX</span>
 `;
 versionButton.className = "w-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition flex items-center gap-2 border-b border-gray-200";
 
 const versionDropdownContainer = document.getElementById("optionsDropdown");
 if (versionDropdownContainer) {
     versionDropdownContainer.appendChild(versionButton);
 }

 const modal = document.createElement('div');
 modal.id = 'versionControlModal';
 modal.className = 'hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
 modal.innerHTML = `
     <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] flex flex-col">
         <div class="flex justify-between items-center mb-4 pb-4 border-b">
             <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                 </svg>
                 ArchiveX
             </h2>
             <button id="closeVersionModal" class="text-gray-500 hover:text-gray-700 text-3xl leading-none">&times;</button>
         </div>
         
         <div class="mb-4 flex gap-3">
             <div class="flex gap-2 items-center w-full">
                 <input 
                     type="text" 
                     id="versionName" 
                     placeholder="Version name (optional)..." 
                     class="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 text-black" 
                     maxlength="50"
                 >
                 <button 
                     id="saveVersionBtn" 
                     class="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 border-2 border-black"
                 >
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                     </svg>
                     <span>Save Current Version</span>
                 </button>
             </div>
         </div>

         <div class="mb-4 flex gap-2 text-sm">
             <span class="text-gray-600">Total Versions: <strong id="versionCount">0</strong></span>
             <span class="text-gray-600 ml-auto">
                 <button id="clearAllVersions" class="text-red-500 hover:text-red-700 font-semibold">Clear All</button>
             </span>
         </div>
         
         <div id="versionsList" class="flex-1 overflow-y-auto space-y-2 mb-4">
         </div>
         
         <div class="flex gap-3 pt-4 border-t">
             <div class="flex gap-2 flex-wrap">
                 <button id="exportVersions" class="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 border-2 border-black whitespace-nowrap">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                     </svg>
                     Export All
                 </button>
                 <button id="importVersions" class="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2 border-2 border-black whitespace-nowrap">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                     </svg>
                     Import
                 </button>
             </div>
             <input type="file" id="importFileInput" accept=".json" class="hidden">
         </div>
     </div>
 `;
 document.body.appendChild(modal);

 const notification = document.createElement('div');
 notification.id = 'versionNotification';
 notification.className = 'hidden fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg font-medium z-50';
 document.body.appendChild(notification);
}

    setupEventListeners() {
        const versionBtn = document.getElementById('versionControlBtn');
        const closeBtn = document.getElementById('closeVersionModal');
        const saveBtn = document.getElementById('saveVersionBtn');
        const clearBtn = document.getElementById('clearAllVersions');
        const exportBtn = document.getElementById('exportVersions');
        const importBtn = document.getElementById('importVersions');
        const importInput = document.getElementById('importFileInput');
        const modal = document.getElementById('versionControlModal');
        const versionName = document.getElementById('versionName');

        if (versionBtn) {
            versionBtn.addEventListener('click', () => this.openModal());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveVersion());
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllVersions());
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportVersions());
        }
        
        if (importBtn) {
            importBtn.addEventListener('click', () => {
                if (importInput) importInput.click();
            });
        }
        
        if (importInput) {
            importInput.addEventListener('change', (e) => this.importVersions(e));
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'versionControlModal') {
                    this.closeModal();
                }
            });
        }

        if (versionName) {
            versionName.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.saveVersion();
                }
            });
        }
    }

    startAutoSave() {
        this.autoSaveInterval = setInterval(() => {
            this.saveVersion('Auto-save', true);
        }, 5 * 60 * 1000);
    }

    loadVersions() {
        try {
            const stored = sessionStorage.getItem(this.storageKey);
            if (stored) {
                this.versions = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading versions:', error);
            this.versions = [];
        }
    }

    saveVersionsToStorage() {
        try {
            sessionStorage.setItem(this.storageKey, JSON.stringify(this.versions));
            return true;
        } catch (error) {
            console.error('Error saving versions:', error);
            this.showNotification('Failed to save version', 'error');
            return false;
        }
    }

    getEditorValue() {
        const selectors = [
            () => window.compiler?.editor?.getValue(),
            () => window.editor?.getValue(),
            () => document.querySelector('.CodeMirror')?.CodeMirror?.getValue(),
            () => document.getElementById('code')?.value,
            () => document.querySelector('textarea[name="code"]')?.value,
            () => document.querySelector('#editor textarea')?.value,
            () => document.querySelector('.editor textarea')?.value
        ];

        for (const selector of selectors) {
            try {
                const value = selector();
                if (value !== undefined && value !== null) {
                    return value;
                }
            } catch (e) {
                continue;
            }
        }

        return '';
    }

    setEditorValue(code) {
        const setters = [
            () => {
                if (window.compiler?.editor) {
                    window.compiler.editor.setValue(code);
                    return true;
                }
                return false;
            },
            () => {
                if (window.editor) {
                    window.editor.setValue(code);
                    return true;
                }
                return false;
            },
            () => {
                const cm = document.querySelector('.CodeMirror')?.CodeMirror;
                if (cm) {
                    cm.setValue(code);
                    return true;
                }
                return false;
            },
            () => {
                const codeArea = document.getElementById('code');
                if (codeArea) {
                    codeArea.value = code;
                    return true;
                }
                return false;
            },
            () => {
                const textarea = document.querySelector('textarea[name="code"]');
                if (textarea) {
                    textarea.value = code;
                    return true;
                }
                return false;
            }
        ];

        for (const setter of setters) {
            try {
                if (setter()) return;
            } catch (e) {
                continue;
            }
        }
    }

    getLanguage() {
        const langSelect = document.getElementById('language') || 
                         document.querySelector('select[name="language"]') ||
                         document.querySelector('#languageSelect');
        return langSelect ? langSelect.value : 'javascript';
    }

    setLanguage(language) {
        const langSelect = document.getElementById('language') || 
                          document.querySelector('select[name="language"]') ||
                          document.querySelector('#languageSelect');
        if (langSelect) {
            langSelect.value = language;
            
            if (window.compiler?.editor && window.compiler.languageConfig) {
                const mode = window.compiler.languageConfig[language]?.mode || "text/plain";
                window.compiler.editor.setOption("mode", mode);
            } else if (window.editor) {
                const modeMap = {
                    'python': 'python',
                    'javascript': 'javascript',
                    'java': 'text/x-java',
                    'cpp': 'text/x-c++src',
                    'c': 'text/x-csrc'
                };
                if (modeMap[language]) {
                    window.editor.setOption("mode", modeMap[language]);
                }
            }
        }
    }

    getStdin() {
        const stdinArea = document.getElementById('stdin') || 
                         document.querySelector('textarea[name="stdin"]') ||
                         document.querySelector('#input');
        return stdinArea ? stdinArea.value : '';
    }

    setStdin(stdin) {
        const stdinArea = document.getElementById('stdin') || 
                         document.querySelector('textarea[name="stdin"]') ||
                         document.querySelector('#input');
        if (stdinArea) stdinArea.value = stdin;
    }

    saveVersion(customName = null, isAutoSave = false) {
        const code = this.getEditorValue();
        
        if (!code || code.trim().length === 0) {
            if (!isAutoSave) {
                this.showNotification('Cannot save empty code', 'error');
            }
            return;
        }

        const language = this.getLanguage();
        const stdin = this.getStdin();

        if (this.versions.length > 0) {
            const lastVersion = this.versions[0];
            if (lastVersion.code === code && 
                lastVersion.language === language && 
                lastVersion.stdin === stdin) {
                if (!isAutoSave) {
                    this.showNotification('No changes to save', 'warning');
                }
                return;
            }
        }

        const versionNameInput = document.getElementById('versionName');
        const versionName = customName || (versionNameInput ? versionNameInput.value.trim() : '') || `Version ${this.versions.length + 1}`;
        
        const version = {
            id: Date.now(),
            name: versionName,
            code: code,
            language: language,
            stdin: stdin,
            timestamp: new Date().toISOString(),
            isAutoSave: isAutoSave
        };

        this.versions.unshift(version);

        if (this.versions.length > this.maxVersions) {
            this.versions = this.versions.slice(0, this.maxVersions);
        }

        const saved = this.saveVersionsToStorage();
        
        if (!isAutoSave && saved) {
            if (versionNameInput) versionNameInput.value = '';
            this.showNotification('Version saved successfully!', 'success');
            this.renderVersionsList();
        }
    }

    restoreVersion(versionId) {
        const version = this.versions.find(v => v.id === versionId);
        if (!version) {
            this.showNotification('Version not found', 'error');
            return;
        }

        if (confirm(`Restore "${version.name}"?\n\nThis will replace your current code.`)) {
            this.setEditorValue(version.code);
            this.setLanguage(version.language);
            this.setStdin(version.stdin);

            this.showNotification('Version restored successfully!', 'success');
            this.closeModal();
        }
    }

    deleteVersion(versionId) {
        const version = this.versions.find(v => v.id === versionId);
        if (!version) return;

        if (confirm(`Delete "${version.name}"?\n\nThis action cannot be undone.`)) {
            this.versions = this.versions.filter(v => v.id !== versionId);
            this.saveVersionsToStorage();
            this.showNotification('Version deleted', 'success');
            this.renderVersionsList();
        }
    }

    clearAllVersions() {
        if (this.versions.length === 0) {
            this.showNotification('No versions to clear', 'warning');
            return;
        }

        if (confirm(`Delete all ${this.versions.length} versions?\n\nThis action cannot be undone.`)) {
            this.versions = [];
            this.saveVersionsToStorage();
            this.showNotification('All versions cleared', 'success');
            this.renderVersionsList();
        }
    }

    exportVersions() {
        if (this.versions.length === 0) {
            this.showNotification('No versions to export', 'warning');
            return;
        }

        const dataStr = JSON.stringify(this.versions, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `code-versions-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showNotification('Versions exported successfully!', 'success');
    }

    importVersions(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                
                if (!Array.isArray(imported)) {
                    throw new Error('Invalid format');
                }

                const existingIds = new Set(this.versions.map(v => v.id));
                const newVersions = imported.filter(v => !existingIds.has(v.id));
                
                this.versions = [...this.versions, ...newVersions];
                this.versions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                
                if (this.versions.length > this.maxVersions) {
                    this.versions = this.versions.slice(0, this.maxVersions);
                }

                this.saveVersionsToStorage();
                this.showNotification(`Imported ${newVersions.length} new versions!`, 'success');
                this.renderVersionsList();
            } catch (error) {
                console.error('Import error:', error);
                this.showNotification('Failed to import versions', 'error');
            }
        };
        reader.readAsText(file);
        
        event.target.value = '';
    }

    openModal() {
        const modal = document.getElementById('versionControlModal');
        if (modal) {
            modal.classList.remove('hidden');
            this.renderVersionsList();
        }
    }

    closeModal() {
        const modal = document.getElementById('versionControlModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    renderVersionsList() {
        const listContainer = document.getElementById('versionsList');
        const versionCount = document.getElementById('versionCount');
        
        if (!listContainer) return;
        
        if (versionCount) {
            versionCount.textContent = this.versions.length;
        }

        if (this.versions.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-12 text-gray-500">
                    <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <p class="text-lg font-semibold">No versions saved yet</p>
                    <p class="text-sm mt-2">Save your first version to get started</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = this.versions.map(version => {
            const date = new Date(version.timestamp);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            const codePreview = version.code.slice(0, 100).replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const autoSaveLabel = version.isAutoSave ? '<span class="text-xs bg-blue-500 text-white px-2 py-0.5 rounded ml-2">Auto</span>' : '';
            
            return `
                <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <h3 class="font-bold text-gray-800 flex items-center">
                                ${version.name}
                                ${autoSaveLabel}
                            </h3>
                            <p class="text-sm text-gray-500">${formattedDate}</p>
                            <p class="text-xs text-gray-600 mt-1">
                                <span class="bg-gray-200 px-2 py-0.5 rounded">${version.language}</span>
                                <span class="ml-2">${version.code.length} characters</span>
                                ${version.stdin ? '<span class="ml-2">• Has input</span>' : ''}
                            </p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.versionControl.restoreVersion(${version.id})" class="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition">
                                Restore
                            </button>
                            <button onclick="window.versionControl.deleteVersion(${version.id})" class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                    <details class="mt-2">
                        <summary class="cursor-pointer text-sm text-blue-600 hover:text-blue-800">Show code preview</summary>
                        <pre class="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">${codePreview}${version.code.length > 100 ? '...' : ''}</pre>
                    </details>
                </div>
            `;
        }).join('');
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('versionNotification');
        if (!notification) return;
        
        notification.textContent = message;
        notification.className = 'fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg font-medium z-50';
        
        switch(type) {
            case 'success':
                notification.className += ' bg-green-500 text-white';
                break;
            case 'error':
                notification.className += ' bg-red-500 text-white';
                break;
            case 'warning':
                notification.className += ' bg-yellow-500 text-white';
                break;
            default:
                notification.className += ' bg-blue-500 text-white';
        }
        
        notification.classList.remove('hidden');
        
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 3000);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.versionControl = new VersionControl();
            console.log('Version Control System initialized');
        }, 1000);
    });
} else {
    setTimeout(() => {
        window.versionControl = new VersionControl();
        console.log('Version Control System initialized');
    }, 1000);
}