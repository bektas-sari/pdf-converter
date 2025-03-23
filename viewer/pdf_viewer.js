window.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "getStoredPdfData" }, (res) => {
    if (!res || !res.dataUrl) {
      document.getElementById("loading").textContent = "Failed to load PDF.";
      return;
    }

    loadPdf(res.dataUrl);
  });
});

function loadPdf(dataUrl) {
  const canvas = document.getElementById("pdf-canvas");
  const ctx = canvas.getContext("2d");

  // Doğru worker yolu
  pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("lib/pdfjs/pdf.worker.min.js");


  pdfjsLib.getDocument(dataUrl).promise.then((pdf) => {
    return pdf.getPage(1);
  }).then((page) => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    return page.render({ canvasContext: ctx, viewport: viewport }).promise;
  }).then(() => {
    document.getElementById("loading").style.display = "none";
  }).catch((err) => {
    console.error("PDF render error:", err);
    document.getElementById("loading").textContent = "Error rendering PDF.";
  });
}
