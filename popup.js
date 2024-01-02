//Runs on popup load
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnFindEmails').addEventListener('click', collectInfo );
  document.getElementById('btnClear').addEventListener('click', clearCache );
})//End loaded listener

function collectInfo() {
  chrome.runtime.sendMessage({directive: "collectInfo"}, function(response) {});
  window.close()
}

//Clears our local cache for testing and error clearing reasons
function clearCache() {
  console.log("Clearing the local and sync cache!");
  chrome.storage.sync.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });

  location.reload()
}
