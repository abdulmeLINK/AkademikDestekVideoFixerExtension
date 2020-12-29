chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
    if (changeInfo.status == 'complete' && (tab.url.includes('akademikdestek'))){
       /* chrome.tabs.executeScript(tabId, {
            file: 'content.js'
        }, function() {
            chrome.tabs.sendMessage(tabId, {
                startJob: 'ok',
            });
        }); */

        chrome.tabs.sendMessage(tabId, {message: 'test'}, function(response) {
        
        });
    }
});

chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {

        if (request.Extracted == "ok") {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {fileData: response}, function(response) {          
                    });
                });
            }
        else {
            console.log("Did not receive the response!!!")
        }
    }
);
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currTab = tabs[0];
    console.log(currTab);
    if (currTab) { 
        
    }
  });
