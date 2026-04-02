(function() {
    'use strict';
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        addSearchButton();
        addPDFExportButton();
    }
    
    function addSearchButton() {
        const optionsDropdown = document.getElementById('optionsDropdown');
        if (!optionsDropdown) return;
        
        const searchButton = document.createElement('button');
        searchButton.className = 'w-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition flex items-center gap-2 border-b border-gray-200';
        searchButton.innerHTML = `
            <svg class="w-5 h-5 text-white-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span class="font-medium text-white-800">Search in Editor</span>
        `;
        
        searchButton.addEventListener('click', (e) => {
            e.stopPropagation();
            openSearchDialog();
            document.getElementById('optionsDropdown').classList.add('hidden');
        });
        
        optionsDropdown.appendChild(searchButton);
    }
    
    function addPDFExportButton() {
        const optionsDropdown = document.getElementById('optionsDropdown');
        if (!optionsDropdown) return;
        
        const pdfButton = document.createElement('button');
        pdfButton.id = 'exportPDFBtn';
        pdfButton.className = 'w-full text-left px-4 py-3 bg-white hover:bg-gray-50 transition flex items-center gap-2 border-b border-gray-200';
        pdfButton.innerHTML = `
            <svg class="w-5 h-5 text-white-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            <span class="font-medium text-white-800">Export as PDF</span>
        `;
        
        pdfButton.addEventListener('click', (e) => {
            e.stopPropagation();
            exportToPDF();
            document.getElementById('optionsDropdown').classList.add('hidden');
        });
        
        optionsDropdown.appendChild(pdfButton);
    }
    
    function openSearchDialog() {
        const existingDialog = document.getElementById('searchDialog');
        if (existingDialog) {
            existingDialog.remove();
        }
        
        const searchDialog = document.createElement('div');
        searchDialog.id = 'searchDialog';
        searchDialog.className = 'fixed top-20 right-4 bg-white rounded-2xl shadow-2xl z-[9999] border-2 border-red-500 w-96';
        searchDialog.innerHTML = `
            <div class="bg-black px-5 py-4 rounded-t-2xl border-b-2 border-red-500">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-bold text-white">Search & Replace</h3>
                    <button id="closeSearchDialog" class="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg p-1.5 transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="p-5">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-800 mb-1.5">Find:</label>
                        <input type="text" id="searchInput" placeholder="Search for..." 
                               class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-800 mb-1.5">Replace with:</label>
                        <input type="text" id="replaceInput" placeholder="Replace with..." 
                               class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors">
                    </div>
                    
                    <div class="flex items-center gap-4 text-sm">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="caseSensitive" class="w-4 h-4 accent-red-500">
                            <span class="text-gray-700 font-medium">Case sensitive</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="useRegex" class="w-4 h-4 accent-red-500">
                            <span class="text-gray-700 font-medium">Regex</span>
                        </label>
                    </div>
                    
                    <div id="searchResults" class="text-sm text-gray-600 font-medium"></div>
                    
                    <div class="flex gap-2 pt-2">
                        <button id="findNextBtn" class="flex-1 bg-black text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all border border-red-500">
                            Find Next
                        </button>
                        <button id="replaceBtn" class="flex-1 bg-white text-black px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all border-2 border-black">
                            Replace
                        </button>
                        <button id="replaceAllBtn" class="flex-1 bg-red-500 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-all">
                            Replace All
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchDialog);
        
        const cm = getCodeMirrorInstance();
        let currentMatchIndex = -1;
        let matches = [];
        
        document.getElementById('closeSearchDialog').addEventListener('click', () => {
            searchDialog.remove();
            if (cm) cm.focus();
        });
        
        document.getElementById('searchInput').addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
        
        document.getElementById('findNextBtn').addEventListener('click', () => {
            findNext();
        });
        
        document.getElementById('replaceBtn').addEventListener('click', () => {
            replaceOne();
        });
        
        document.getElementById('replaceAllBtn').addEventListener('click', () => {
            replaceAll();
        });
        
        document.getElementById('searchInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                findNext();
            } else if (e.key === 'Escape') {
                searchDialog.remove();
            }
        });
        
        document.getElementById('replaceInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                replaceOne();
            }
        });
        
        function performSearch(searchTerm) {
            if (!cm || !searchTerm) {
                matches = [];
                currentMatchIndex = -1;
                document.getElementById('searchResults').textContent = '';
                return;
            }
            
            const caseSensitive = document.getElementById('caseSensitive').checked;
            const useRegex = document.getElementById('useRegex').checked;
            const code = cm.getValue();
            
            matches = [];
            
            try {
                if (useRegex) {
                    const flags = caseSensitive ? 'g' : 'gi';
                    const regex = new RegExp(searchTerm, flags);
                    let match;
                    
                    while ((match = regex.exec(code)) !== null) {
                        const pos = cm.posFromIndex(match.index);
                        matches.push({
                            from: pos,
                            to: cm.posFromIndex(match.index + match[0].length),
                            text: match[0]
                        });
                    }
                } else {
                    const searchStr = caseSensitive ? searchTerm : searchTerm.toLowerCase();
                    const codeStr = caseSensitive ? code : code.toLowerCase();
                    
                    let index = 0;
                    while ((index = codeStr.indexOf(searchStr, index)) !== -1) {
                        const pos = cm.posFromIndex(index);
                        matches.push({
                            from: pos,
                            to: cm.posFromIndex(index + searchTerm.length),
                            text: code.substr(index, searchTerm.length)
                        });
                        index += searchTerm.length;
                    }
                }
                
                currentMatchIndex = matches.length > 0 ? 0 : -1;
                document.getElementById('searchResults').textContent = 
                    matches.length > 0 ? `Found ${matches.length} match${matches.length !== 1 ? 'es' : ''}` : 'No matches found';
                
                if (matches.length > 0) {
                    highlightMatch(currentMatchIndex);
                }
            } catch (error) {
                document.getElementById('searchResults').textContent = 'Invalid regex pattern';
            }
        }
        
        function highlightMatch(index) {
            if (!cm || index < 0 || index >= matches.length) return;
            
            const match = matches[index];
            cm.setSelection(match.from, match.to);
            cm.scrollIntoView({from: match.from, to: match.to}, 100);
            
            document.getElementById('searchResults').textContent = 
                `Match ${index + 1} of ${matches.length}`;
        }
        
        function findNext() {
            const searchTerm = document.getElementById('searchInput').value;
            if (!searchTerm) return;
            
            if (matches.length === 0) {
                performSearch(searchTerm);
                return;
            }
            
            currentMatchIndex = (currentMatchIndex + 1) % matches.length;
            highlightMatch(currentMatchIndex);
        }
        
        function replaceOne() {
            if (!cm || currentMatchIndex < 0 || currentMatchIndex >= matches.length) return;
            
            const replaceText = document.getElementById('replaceInput').value;
            const match = matches[currentMatchIndex];
            
            cm.replaceRange(replaceText, match.from, match.to);
            
            const searchTerm = document.getElementById('searchInput').value;
            performSearch(searchTerm);
        }
        
        function replaceAll() {
            if (!cm || matches.length === 0) return;
            
            const replaceText = document.getElementById('replaceInput').value;
            
            for (let i = matches.length - 1; i >= 0; i--) {
                cm.replaceRange(replaceText, matches[i].from, matches[i].to);
            }
            
            matches = [];
            currentMatchIndex = -1;
            document.getElementById('searchResults').textContent = 'All matches replaced';
            
            setTimeout(() => {
                const searchTerm = document.getElementById('searchInput').value;
                performSearch(searchTerm);
            }, 100);
        }
        
        document.getElementById('searchInput').focus();
    }
    
    async function exportToPDF() {
        const code = getCodeMirrorInstance()?.getValue() || document.getElementById('code')?.value || '';
        
        if (!code.trim()) {
            showToast('Please write some code before exporting', 'error');
            return;
        }
        
        const fileName = prompt('Enter filename (without extension):', 'webpage-export');
        if (!fileName) return;
        
        try {
            showLoading('Preparing export...');
            
            if (!window.JSZip) {
                await loadJSZip();
            }
            
            if (!window.html2pdf) {
                await loadHtml2Pdf();
            }
            
            const zip = new JSZip();
            
            zip.file(fileName + '.html', code);
            
            hideLoading();
            showLoading('Generating PDF...');
            
            const preview = document.getElementById('preview');
            let pdfBlob;
            
            if (preview && preview.contentWindow) {
                const iframeDoc = preview.contentDocument || preview.contentWindow.document;
                const element = iframeDoc.documentElement;
                
                const opt = {
                    margin: 10,
                    filename: fileName + '.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { 
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        letterRendering: true,
                        allowTaint: true,
                        scrollY: 0,
                        scrollX: 0
                    },
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'portrait',
                        compress: true
                    },
                    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
                };
                
                const clonedElement = element.cloneNode(true);
                pdfBlob = await html2pdf().set(opt).from(clonedElement).outputPdf('blob');
            } else {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = code;
                document.body.appendChild(tempDiv);
                tempDiv.style.position = 'absolute';
                tempDiv.style.left = '-9999px';
                
                const opt = {
                    margin: 10,
                    filename: fileName + '.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { 
                        scale: 2,
                        useCORS: true,
                        logging: false
                    },
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'portrait'
                    }
                };
                
                pdfBlob = await html2pdf().set(opt).from(tempDiv).outputPdf('blob');
                document.body.removeChild(tempDiv);
            }
            
            zip.file(fileName + '.pdf', pdfBlob);
            
            hideLoading();
            showLoading('Creating ZIP file...');
            
            const zipBlob = await zip.generateAsync({type: 'blob'});
            
            const url = URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName + '.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            hideLoading();
            showToast('Export successful! Downloaded as ' + fileName + '.zip', 'success');
            
        } catch (error) {
            hideLoading();
            console.error('Export error:', error);
            showToast('Failed to export. Please try again.', 'error');
        }
    }
    
    function loadHtml2Pdf() {
        return new Promise((resolve, reject) => {
            if (window.html2pdf) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    function loadJSZip() {
        return new Promise((resolve, reject) => {
            if (window.JSZip) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    function getCodeMirrorInstance() {
        const editorElements = document.querySelectorAll('.CodeMirror');
        if (editorElements.length > 0) {
            return editorElements[0].CodeMirror;
        }
        return null;
    }
    
    function showLoading(message = 'Loading...') {
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[10000] backdrop-blur-sm';
        overlay.id = 'featureLoadingOverlay';
        overlay.innerHTML = `
            <div class="bg-white rounded-2xl p-8 text-center max-w-sm border-2 border-red-500">
                <div class="flex gap-2 justify-center mb-4">
                    <div class="w-3 h-3 bg-black rounded-full animate-bounce"></div>
                    <div class="w-3 h-3 bg-red-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-3 h-3 bg-black rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
                <p class="text-gray-800 font-semibold">${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    
    function hideLoading() {
        const overlay = document.getElementById('featureLoadingOverlay');
        if (overlay) overlay.remove();
    }
    
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-8 right-8 px-6 py-3 rounded-lg shadow-lg font-semibold z-[10000] transform transition-all border-2 ${
            type === 'success' ? 'bg-black text-white border-red-500' : 'bg-white text-black border-red-500'
        }`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            openSearchDialog();
        }
    });
    
})();