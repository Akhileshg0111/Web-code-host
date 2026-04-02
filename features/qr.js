(function() {
    'use strict';
    
    const QR_STYLES = `
        #qrModal {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(8px);
        }
        #qrModal.active {
            display: flex;
        }
        #qrModalContent {
            background: white;
            border-radius: 16px;
            padding: 32px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        #qrModalClose {
            position: absolute;
            top: 16px;
            right: 16px;
            background: transparent;
            border: none;
            font-size: 28px;
            color: #666;
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
        }
        #qrModalClose:hover {
            background: #f0f0f0;
            color: #000;
        }
        #qrModalTitle {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 8px;
            text-align: center;
        }
        #qrModalSubtitle {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 24px;
            text-align: center;
        }
        #qrCodeContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 24px;
            background: white;
            border-radius: 12px;
            margin-bottom: 20px;
            position: relative;
        }
        #qrDownloadBtn {
            width: 100%;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s;
        }
        #qrDownloadBtn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }
        .qr-url-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
        }
        .qr-url-wrapper input {
            flex: 1;
        }
        .qr-trigger-btn {
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
            padding: 10px 16px;
            border: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.3s;
            box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4);
            white-space: nowrap;
            flex-shrink: 0;
        }
        .qr-trigger-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
            background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
        }
        .qr-trigger-btn svg {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
        }
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    function injectStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = QR_STYLES;
        document.head.appendChild(styleElement);
    }
    
    function createQRModal() {
        const modal = document.createElement('div');
        modal.id = 'qrModal';
        modal.innerHTML = `
            <div id="qrModalContent">
                <button id="qrModalClose">&times;</button>
                <h2 id="qrModalTitle">QR Code</h2>
                <p id="qrModalSubtitle">Scan to open this site</p>
                <div id="qrCodeContainer"></div>
                <button id="qrDownloadBtn">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    Download QR Code
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        
        document.getElementById('qrModalClose').addEventListener('click', closeQRModal);
        document.getElementById('qrDownloadBtn').addEventListener('click', downloadQRCode);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeQRModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeQRModal();
        });
    }
    
    function addQRButtons() {
        const sitesContainer = document.getElementById('sitesContainer');
        if (!sitesContainer) return;
        
        const observer = new MutationObserver(() => {
            const siteCards = sitesContainer.querySelectorAll('.bg-white.border-2');
            siteCards.forEach(card => {
                if (card.querySelector('.qr-trigger-btn')) return;
                
                const urlContainer = card.querySelector('.bg-gray-50.rounded-lg');
                if (!urlContainer) return;
                
                const urlInput = urlContainer.querySelector('input[type="text"][readonly]');
                if (!urlInput) return;
                
                const siteUrl = urlInput.value;
                
                const wrapper = document.createElement('div');
                wrapper.className = 'qr-url-wrapper';
                
                const inputClone = urlInput.cloneNode(true);
                
                const qrButton = document.createElement('button');
                qrButton.className = 'qr-trigger-btn';
                qrButton.innerHTML = `
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                    </svg>
                    QR
                `;
                
                qrButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    generateQRCode(siteUrl);
                });
                
                wrapper.appendChild(inputClone);
                wrapper.appendChild(qrButton);
                
                urlInput.parentElement.replaceChild(wrapper, urlInput);
            });
        });
        
        observer.observe(sitesContainer, { childList: true, subtree: true });
        
        const existingCards = sitesContainer.querySelectorAll('.bg-white.border-2');
        existingCards.forEach(card => {
            if (card.querySelector('.qr-trigger-btn')) return;
            
            const urlContainer = card.querySelector('.bg-gray-50.rounded-lg');
            if (!urlContainer) return;
            
            const urlInput = urlContainer.querySelector('input[type="text"][readonly]');
            if (!urlInput) return;
            
            const siteUrl = urlInput.value;
            
            const wrapper = document.createElement('div');
            wrapper.className = 'qr-url-wrapper';
            
            const inputClone = urlInput.cloneNode(true);
            
            const qrButton = document.createElement('button');
            qrButton.className = 'qr-trigger-btn';
            qrButton.innerHTML = `
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                </svg>
                QR
            `;
            
            qrButton.addEventListener('click', (e) => {
                e.stopPropagation();
                generateQRCode(siteUrl);
            });
            
            wrapper.appendChild(inputClone);
            wrapper.appendChild(qrButton);
            
            urlInput.parentElement.replaceChild(wrapper, urlInput);
        });
    }
    
    function generateQRCode(url) {
        const container = document.getElementById('qrCodeContainer');
        container.innerHTML = '';
        
        new QRCode(container, {
            text: url,
            width: 256,
            height: 256,
            colorDark: '#1a1a2e',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
        
        document.getElementById('qrModal').classList.add('active');
    }
    
    function closeQRModal() {
        document.getElementById('qrModal').classList.remove('active');
    }
    
    function createProfessionalQRCanvas() {
        const qrCanvas = document.querySelector('#qrCodeContainer canvas');
        if (!qrCanvas) return null;
        
        const finalSize = 1200;
        const padding = 120;
        const qrSize = 800;
        const cornerRadius = 60;
        
        const canvas = document.createElement('canvas');
        canvas.width = finalSize;
        canvas.height = finalSize;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, finalSize, finalSize);
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(0.5, '#1e40af');
        gradient.addColorStop(1, '#000000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, finalSize, finalSize);
        
        const containerX = (finalSize - qrSize - padding * 2) / 2;
        const containerY = containerX;
        const containerSize = qrSize + padding * 2;
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(containerX + cornerRadius, containerY);
        ctx.lineTo(containerX + containerSize - cornerRadius, containerY);
        ctx.arcTo(containerX + containerSize, containerY, containerX + containerSize, containerY + cornerRadius, cornerRadius);
        ctx.lineTo(containerX + containerSize, containerY + containerSize - cornerRadius);
        ctx.arcTo(containerX + containerSize, containerY + containerSize, containerX + containerSize - cornerRadius, containerY + containerSize, cornerRadius);
        ctx.lineTo(containerX + cornerRadius, containerY + containerSize);
        ctx.arcTo(containerX, containerY + containerSize, containerX, containerY + containerSize - cornerRadius, cornerRadius);
        ctx.lineTo(containerX, containerY + cornerRadius);
        ctx.arcTo(containerX, containerY, containerX + cornerRadius, containerY, cornerRadius);
        ctx.closePath();
        ctx.fill();
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15;
        
        const qrX = (finalSize - qrSize) / 2;
        const qrY = qrX + 40;
        ctx.shadowColor = 'transparent';
        ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);
        
        const centerX = finalSize / 2;
        const centerY = finalSize / 2 + 20;
        const logoRadius = 90;
        
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, logoRadius + 8, 0, Math.PI * 2);
        ctx.fill();
        
        const logoGradient = ctx.createLinearGradient(centerX - logoRadius, centerY - logoRadius, centerX + logoRadius, centerY + logoRadius);
        logoGradient.addColorStop(0, '#1e40af');
        logoGradient.addColorStop(0.5, '#3b82f6');
        logoGradient.addColorStop(1, '#0f172a');
        ctx.fillStyle = logoGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, logoRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('P', centerX, centerY);
        
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 52px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PROJECTILE', centerX, containerY + 70);
        
        ctx.fillStyle = '#1e40af';
        ctx.font = '32px Arial';
        ctx.fillText('Scan to Visit', centerX, containerY + containerSize - 50);
        
        const drawCornerDecoration = (x, y, rotation) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.strokeStyle = '#1e40af';
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(0, 20);
            ctx.lineTo(0, 0);
            ctx.lineTo(20, 0);
            ctx.stroke();
            ctx.restore();
        };
        
        const decorMargin = 30;
        drawCornerDecoration(containerX + decorMargin, containerY + decorMargin, 0);
        drawCornerDecoration(containerX + containerSize - decorMargin, containerY + decorMargin, Math.PI / 2);
        drawCornerDecoration(containerX + containerSize - decorMargin, containerY + containerSize - decorMargin, Math.PI);
        drawCornerDecoration(containerX + decorMargin, containerY + containerSize - decorMargin, -Math.PI / 2);
        
        return canvas;
    }
    
    function downloadQRCode() {
        const professionalCanvas = createProfessionalQRCanvas();
        if (!professionalCanvas) {
            showToast('Failed to generate QR code', 'error');
            return;
        }
        
        const link = document.createElement('a');
        link.download = 'projectile-qr-code.png';
        link.href = professionalCanvas.toDataURL('image/png');
        link.click();
        
        showToast('Professional QR Code downloaded!', 'success');
    }
    
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 32px;
            right: 32px;
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease-out;
            ${type === 'success' ? 'background: #10b981; color: white;' : 'background: #ef4444; color: white;'}
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    function waitForDashboard() {
        const checkInterval = setInterval(() => {
            const sitesContainer = document.getElementById('sitesContainer');
            if (sitesContainer) {
                clearInterval(checkInterval);
                addQRButtons();
            }
        }, 100);
        
        setTimeout(() => clearInterval(checkInterval), 10000);
    }
    
    function init() {
        injectStyles();
        createQRModal();
        
        const dashboardObserver = new MutationObserver(() => {
            const dashboard = document.getElementById('deployDashboardModal');
            if (dashboard) {
                waitForDashboard();
            }
        });
        
        dashboardObserver.observe(document.body, { childList: true, subtree: true });
        
        if (document.getElementById('deployDashboardModal')) {
            waitForDashboard();
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();