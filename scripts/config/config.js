chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status == 'complete'){
        chrome.storage.local.get([`extEntConfig`], (data) => {
            if (typeof data['extEntConfig'] == 'undefined'){
                chrome.storage.local.set({extEntConfig: {theme: "dark", systemVersion: chrome.runtime.getManifest().version}})
            }
            else if (data['extEntConfig'].systemVersion !== chrome.runtime.getManifest().version){
                chrome.tabs.create({
                    url: 'popup/update.html',
                    selected: true
                })
                prevConfig = data['extEntConfig']
                chrome.storage.local.remove([`extEntConfig`])
                chrome.storage.local.set({extEntConfig: {theme: prevConfig.theme, systemVersion: chrome.runtime.getManifest().version}})
            }
        })
    }
})