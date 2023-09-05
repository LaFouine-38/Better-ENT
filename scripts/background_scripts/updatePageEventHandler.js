chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.startsWith("https://aristide-berges.ent.auvergnerhonealpes.fr/sg.do?PROC=CDT_AFFICHAGE&VUE=E")){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {sender: "onUpdated", action: "emploiDuTemps",tabId: tabId, changeInfo: changeInfo, tab: tab});
        });
    }
}); 