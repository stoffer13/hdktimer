var pendingRequests = [];

function handleStoreCallback() 
{
  console.log("Storage Succesful - " + reqs.totalDuration);
}

function handleGetCallback(result) {
        var storage = result.qwe;
        if (storage[before.url] === undefined) {
          storage[before.url] = {};
          console.log("not an object");
        }
        var reqs = storage[before.url];
        if (reqs.requests === undefined) {
          reqs.requests = [];
          reqs.totalDuration = 0;
          console.log("creating new tracker for " + before.url)
        }
        reqs.requests.push(trackDto);
        reqs.totalDuration += duration;
        
        chrome.storage.local.set({"qwe": storage}, handleStoreCallback);

      }

function onCompletedListener(details) {
    var before = pendingRequests[details.tabId];
    if (before != undefined) {
      var duration = details.timeStamp - before.timeStamp;
      var trackDto = {timeStamp: before.timeStamp, duration: duration};

      console.log(details.url + " - " + duration + " ms");

      chrome.storage.local.get("qwe", handleGetCallback);
    }
  }
chrome.webNavigation.onBeforeNavigate.addListener(
  function(details) {
    pendingRequests[details.tabId] = details;
  },
  { url: [{hostSuffix: ".hdk"}] }
);

chrome.webNavigation.onCompleted.addListener(
  onCompletedListener,
  { url: [{hostSuffix: ".hdk"}] }
);