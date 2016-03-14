chrome.browserAction.onClicked.addListener(function(tab) {
  
  chrome.tabs.executeScript({
    code: 'alert("Paste the barcode into any barcode block.")'
  });
});
