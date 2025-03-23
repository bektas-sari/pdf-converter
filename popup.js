document.addEventListener('DOMContentLoaded', function () {
    const openPdfButton = document.getElementById('open-pdf');
    const editPdfButton = document.getElementById('edit-pdf');
    const convertPdfButton = document.getElementById('convert-pdf');
    const fillFormButton = document.getElementById('fill-form');
    const signPdfButton = document.getElementById('sign-pdf');
    const chatPdfButton = document.getElementById('chat-pdf');
    const recentFilesList = document.getElementById('recent-files-list');
  
    loadRecentFiles();
  
    openPdfButton.addEventListener('click', function () {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf';
  
      input.onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function () {
            const dataUrl = reader.result;
      
            // PDF verisini background.js'e gönder
            chrome.runtime.sendMessage({
              action: "storePdfData",
              dataUrl: dataUrl
            }, () => {
              chrome.tabs.create({
                url: chrome.runtime.getURL("viewer/pdf_viewer.html")
              });
            });
          };
          reader.readAsDataURL(file);
        }
      };
      
  
      input.click();
    });
  
    editPdfButton.addEventListener('click', () => openTabIfPdf('editor/pdf_editor.html'));
    convertPdfButton.addEventListener('click', () => openTabIfPdf('viewer/pdf_viewer.html')); // veya özel sayfa
    fillFormButton.addEventListener('click', () => openTabIfPdf('form/pdf_form.html'));
    signPdfButton.addEventListener('click', () => openTabIfPdf('signature/pdf_sign.html'));
    chatPdfButton.addEventListener('click', () => openTabIfPdf('chat/pdf_chat.html'));
  
    function openTabIfPdf(page) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;
        if (url.endsWith('.pdf') || url.startsWith('blob:')) {
          chrome.tabs.create({
            url: chrome.runtime.getURL(page) + '?url=' + encodeURIComponent(url),
          });
        } else {
          alert('Please open a PDF file first.');
        }
      });
    }
  
    function addToRecentFiles(fileInfo) {
      chrome.storage.local.get({ recentFiles: [] }, function (data) {
        let recentFiles = data.recentFiles;
        recentFiles = recentFiles.filter((file) => file.name !== fileInfo.name);
        recentFiles.unshift(fileInfo);
        if (recentFiles.length > 5) {
          recentFiles = recentFiles.slice(0, 5);
        }
        chrome.storage.local.set({ recentFiles: recentFiles }, loadRecentFiles);
      });
    }
    function isPdfTab(url) {
        return url && (
          url.endsWith(".pdf") ||
          url.startsWith("blob:") ||
          url.includes("pdf_viewer.html")
        );
      }
      
      
    function loadRecentFiles() {
      chrome.storage.local.get({ recentFiles: [] }, function (data) {
        const recentFiles = data.recentFiles;
        recentFilesList.innerHTML = '';
        if (recentFiles.length === 0) {
          recentFilesList.innerHTML = '<li>No recent PDFs</li>';
          return;
        }
        recentFiles.forEach((file) => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fas fa-file-pdf"></i> ${file.name}`;
          li.addEventListener('click', () => {
            chrome.tabs.create({
              url: chrome.runtime.getURL('viewer/pdf_viewer.html'),
            });
          });
          recentFilesList.appendChild(li);
        });
      });
    }
  });
  