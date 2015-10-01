function getTotalDuration(storage) {
  
     console.log("Storage total ms"  + storage.totalDuration);
     renderStatus("Storage total ms" + storage.totalDuration);
  
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function storageChangeListener(changes, areaName) {
  if (areaName === "local") {
    console.log(changes.qwe.newValue);
    getTotalDuration(changes.qwe.newValue);
  }
}
chrome.storage.onChanged.addListener(storageChangeListener);
