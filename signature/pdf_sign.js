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
  const canvas = document.getElementById("sign-canvas");
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
    enableSignature(canvas);
  });
}

function enableSignature(canvas) {
  const ctx = canvas.getContext("2d");
  let isDrawing = false;

  canvas.addEventListener("mousedown", () => {
    isDrawing = true;
    ctx.beginPath();
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "blue";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  });

  document.getElementById("save-sign-btn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "signed-pdf.png";
    link.click();
  });
}
