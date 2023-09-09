function handleUpdated(tabId, changeInfo, tabInfo) {
        if (changeInfo.url) {
            console.log("Tab: " + tabId + " URL changed to " + changeInfo.url);
        }
    }
  
chrome.tabs.onUpdated.addListener(handleUpdated);