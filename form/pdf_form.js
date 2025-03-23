window.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "getStoredPdfData" }, (res) => {
    if (!res || !res.dataUrl) {
      alert("PDF yüklenemedi.");
      return;
    }

    loadPdf(res.dataUrl);
  });
});

function loadPdf(dataUrl) {
  const canvas = document.getElementById("form-canvas");
  const ctx = canvas.getContext("2d");

  pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("lib/pdfjs/pdf.worker.min.js");

  pdfjsLib.getDocument(dataUrl).promise.then((pdf) => {
    return pdf.getPage(1);
  }).then((page) => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    return page.render({ canvasContext: ctx, viewport: viewport }).promise;
  }).then(() => {
    document.getElementById("insert-btn").addEventListener("click", () => {
      const name = document.getElementById("name-field").value;
      const date = document.getElementById("date-field").value;

      ctx.font = "16px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(`Ad: ${name}`, 50, 50);
      ctx.fillText(`Tarih: ${date}`, 50, 80);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "filled-form.png";
      link.click();
    });
  });
}
