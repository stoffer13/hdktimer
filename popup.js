function getTotalDuration(storage) {
     console.log("Storage total ms: "  + storage.totalDuration);
     renderStatus(".hdk waiting secs: " + (storage.totalDuration / 1000).toFixed(2));
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

chrome.storage.local.get("qwe", function (result) {
  var storage = result.qwe;
  getTotalDuration(storage);
});