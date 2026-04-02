(function() {
    'use strict';
    
    let editor = null;
    
    const waitForEditor = setInterval(() => {
        const cm = document.querySelector('.CodeMirror');
        if (cm && cm.CodeMirror) {
            editor = cm.CodeMirror;
            clearInterval(waitForEditor);
            initEnhancements();
        }
    }, 100);
    
    function initEnhancements() {
        setupDuplicateLine();
        setupDeleteLine();
        setupMoveLines();
    }
    
    function setupDuplicateLine() {
        editor.setOption('extraKeys', {
            ...editor.getOption('extraKeys'),
            'Ctrl-Shift-D': (cm) => {
                const cursor = cm.getCursor();
                const line = cm.getLine(cursor.line);
                cm.replaceRange('\n' + line, { line: cursor.line, ch: line.length });
                cm.setCursor(cursor.line + 1, cursor.ch);
            }
        });
    }
    
    function setupDeleteLine() {
        editor.setOption('extraKeys', {
            ...editor.getOption('extraKeys'),
            'Ctrl-Shift-K': (cm) => {
                const cursor = cm.getCursor();
                cm.replaceRange('', { line: cursor.line, ch: 0 }, { line: cursor.line + 1, ch: 0 });
            }
        });
    }
    
    function setupMoveLines() {
        editor.setOption('extraKeys', {
            ...editor.getOption('extraKeys'),
            'Alt-Up': (cm) => {
                const cursor = cm.getCursor();
                if (cursor.line > 0) {
                    const currentLine = cm.getLine(cursor.line);
                    const previousLine = cm.getLine(cursor.line - 1);
                    cm.replaceRange(currentLine + '\n', { line: cursor.line - 1, ch: 0 }, { line: cursor.line - 1, ch: previousLine.length });
                    cm.replaceRange(previousLine, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: currentLine.length });
                    cm.setCursor(cursor.line - 1, cursor.ch);
                }
            },
            'Alt-Down': (cm) => {
                const cursor = cm.getCursor();
                if (cursor.line < cm.lineCount() - 1) {
                    const currentLine = cm.getLine(cursor.line);
                    const nextLine = cm.getLine(cursor.line + 1);
                    cm.replaceRange(nextLine, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: currentLine.length });
                    cm.replaceRange(currentLine + '\n', { line: cursor.line + 1, ch: 0 }, { line: cursor.line + 1, ch: nextLine.length });
                    cm.setCursor(cursor.line + 1, cursor.ch);
                }
            }
        });
    }
    
    const style = document.createElement('style');
    style.textContent = `
        #keyboardShortcuts * {
            font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
             "Courier New", monospace;
        }
    `;
    document.head.appendChild(style);
    
    const keyboardShortcutsHelp = document.createElement('div');
    keyboardShortcutsHelp.id = 'keyboardShortcuts';
    keyboardShortcutsHelp.className = 'hidden fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]';
    keyboardShortcutsHelp.innerHTML = `
        <div class="bg-white rounded-xl max-w-2xl w-full mx-4 shadow-2xl overflow-hidden border-2 border-black">
            <div class="bg-black px-6 py-4 flex items-center justify-between border-b-2 border-black">
                <h2 class="text-xl font-bold text-white">⌨️ Keyboard Shortcuts</h2>
                <button onclick="document.getElementById('keyboardShortcuts').classList.add('hidden')" class="text-white hover:bg-gray-800 rounded-lg p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="p-6 max-h-96 overflow-y-auto">
                <div class="space-y-4">
                    <div class="border-b-2 border-black pb-2">
                        <h3 class="font-bold text-black mb-2">Editing</h3>
                        <div class="space-y-1 text-sm">
                            <div class="flex justify-between"><span style="color:black;">Duplicate Line</span><kbd class="bg-black border-2 border-black px-2 py-1 rounded">Ctrl + Shift + D</kbd></div>
<div class="flex justify-between">
    <span style="color:black;">Delete Line</span>
    <kbd class="bg-black border-2 border-black px-2 py-1 rounded">
        Ctrl + Shift + K
    </kbd>
</div>

                            <div class="flex justify-between"><span style="color:black;">Move Line Up</span><kbd class="bg-black border-2 border-black px-2 py-1 rounded">Alt + Up</kbd></div>
                            <div class="flex justify-between"><span style="color:black;">Move Line Down</span><kbd class="bg-black border-2 border-black px-2 py-1 rounded">Alt + Down</kbd></div>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-bold text-black mb-2">Preview</h3>
                        <div class="space-y-1 text-sm">
                            <div class="flex justify-between"><span>Run Preview</span><kbd class="bg-black border-2 border-black px-2 py-1 rounded">Ctrl + Enter</kbd></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(keyboardShortcutsHelp);
    
    const shortcutsButton = document.createElement('button');
    shortcutsButton.className = 'w-full text-left px-4 py-3 bg-white hover:bg-gray-100 transition flex items-center gap-2 border-b-2 border-black';
    shortcutsButton.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
        </svg>
        <span class="font-semibold text-white">Keyboard Shortcuts</span>
    `;
    shortcutsButton.addEventListener('click', () => {
        keyboardShortcutsHelp.classList.remove('hidden');
    });
    
    const optionsDropdown = document.getElementById('optionsDropdown');
    if (optionsDropdown) {
        optionsDropdown.appendChild(shortcutsButton);
    }
    
})();