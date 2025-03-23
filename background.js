
let storedPdfData = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "storePdfData") {
    storedPdfData = request.dataUrl;
    sendResponse({ success: true });
  }

  if (request.action === "getStoredPdfData") {
    sendResponse({ dataUrl: storedPdfData });
  }

  return true;
});
