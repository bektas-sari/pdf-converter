// PDF dosyalarını otomatik olarak algılamak için
(function() {
    const url = window.location.href;
    
    // Sayfa PDF ise veya PDF içeriyorsa
    if (isPdfUrl(url) || document.contentType === 'application/pdf') {
        // Arka plan betiğine bildir
        chrome.runtime.sendMessage({
            action: 'detectPDF',
            url: url
        });
        
        // Özel PDF kontroller ekle
        injectPdfControls();
    }
    
    // Sayfadaki tüm PDF bağlantılarını işle
    findAndProcessPdfLinks();
    
    // Sayfa yüklendiğinde bildirim dinleyicisi ekle
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'showNotification') {
            showNotification(message.type, message.message);
            sendResponse({ success: true });
            return true;
        }
        else if (message.action === 'translationComplete') {
            displayTranslation(message.result);
            sendResponse({ success: true });
            return true;
        }
        else if (message.action === 'chatResponse') {
            displayChatResponse(message.response);
            sendResponse({ success: true });
            return true;
        }
    });
    
    // URL'in PDF olup olmadığını kontrol et
    function isPdfUrl(url) {
        return url.toLowerCase().endsWith('.pdf') || url.toLowerCase().includes('.pdf?');
    }
    
    // PDF kontrolleri ekleme
    function injectPdfControls() {
        // Sayfa zaten bizim görüntüleyici sayfamız mı?
        if (url.includes(chrome.runtime.getURL('pdf_viewer.html'))) {
            return; // Zaten işlendi
        }
        
        // Orijinal içeriği değiştir veya yeni görüntüleyiciye yönlendir
        
        // Yönlendirme yaklaşımı
        const pdfUrl = window.location.href;
        const viewerUrl = chrome.runtime.getURL('pdf_viewer.html') + 
                          '?url=' + encodeURIComponent(pdfUrl);
        
        // Otomatik yönlendirme yapmak yerine bir buton ekleyelim
        const container = document.createElement('div');
        container.className = 'superpdf-container';
        container.innerHTML = `
            <div class="superpdf-overlay">
                <div class="superpdf-message">
                    <img src="${chrome.runtime.getURL('assets/logo.png')}" alt="SuperPDF Logo">
                    <h2>PDF Dosyası Algılandı</h2>
                    <p>Bu PDF dosyasını SuperPDF ile açmak ister misiniz?</p>
                    <button id="open-with-superpdf">SuperPDF ile Aç</button>
                    <button id="continue-normal">Normal Görüntülemeye Devam Et</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
        
        // SuperPDF ile açma butonuna tıklama
        document.getElementById('open-with-superpdf').addEventListener('click', function() {
            window.location.href = viewerUrl;
        });
        
        // Normal görüntüleme butonu
        document.getElementById('continue-normal').addEventListener('click', function() {
            document.querySelector('.superpdf-container').style.display = 'none';
        });
    }
    
    // Sayfadaki PDF bağlantılarını bul ve işle
    function findAndProcessPdfLinks() {
        const links = document.querySelectorAll('a[href$=".pdf"], a[href*=".pdf?"]');
        
        links.forEach(link => {
            // Bağlantıya SuperPDF simgesi ekle
            const icon = document.createElement('img');
            icon.src = chrome.runtime.getURL('assets/icons/icon16.png');
            icon.className = 'superpdf-link-icon';
            icon.title = 'SuperPDF ile aç';
            
            // Simge konumlandırma
            link.style.position = 'relative';
            icon.style.marginLeft = '5px';
            icon.style.verticalAlign = 'middle';
            
            // Orjinal bağlantıyı koru, ama simgeye tıklandığında SuperPDF ile aç
            link.appendChild(icon);
            
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const pdfUrl = link.href;
                const viewerUrl = chrome.runtime.getURL('pdf_viewer.html') + 
                                 '?url=' + encodeURIComponent(pdfUrl);
                                 
                window.open(viewerUrl, '_blank');
            });
        });
    }
    
    // Bildirim gösterme
    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `superpdf-notification superpdf-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
                </span>
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // Otomatik kapatma
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 5000);
        
        // Manuel kapatma
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        });
    }
    
    // Çeviri sonuçlarını gösterme
    function displayTranslation(result) {
        // Bu fonksiyon PDF görüntüleyici sayfasında çağrılır
        // ve çeviri sonuçlarını gösterir
        if (window.pdfViewerApp && typeof window.pdfViewerApp.displayTranslation === 'function') {
            window.pdfViewerApp.displayTranslation(result);
        }
    }
    
    // Sohbet yanıtını gösterme
    function displayChatResponse(response) {
        // Bu fonksiyon PDF chat sayfasında çağrılır
        // ve AI yanıtını gösterir
        if (window.pdfChatApp && typeof window.pdfChatApp.displayResponse === 'function') {
            window.pdfChatApp.displayResponse(response);
        }
    }
})();