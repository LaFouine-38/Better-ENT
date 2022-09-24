chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.sender == 'popup' && request.action == 'connexionInit') {
        chrome.tabs.create({
            url: 'https://fleming-isere.ent.auvergnerhonealpes.fr',
            selected: true
        })
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            var tabId = activeTab.id;
            if (activeTab.pendingUrl.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr')) {
                requestStorage.pseudo = request.infos.pseudo
                requestStorage.password = request.infos.password
                requestStorage.type = request.infos.type
                requestStorage.tabId = tabId
                requestStorage.sender = 'connexion1'
            }
        });
    } else if (request.sender == 'connexion1') {
        requestStorage.sender = 'connexion2'
        chrome.tabs.update(requestStorage.tabId, { selected: true });

    } else if (request.sender == 'connexion2') {
        requestStorage.sender = 'connexion3'
        chrome.tabs.update(requestStorage.tabId, { selected: true });

    } else if (request.sender == 'connexion3') {
        requestStorage.sender = 'connexion4'
        chrome.tabs.update(requestStorage.tabId, { selected: true });

    }
})

let requestStorage = {
    pseudo: null,
    password: null,
    type: null,
    tabId: null,
    sender: null
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    //FUTURE MAJ ? executescript pour pas avoir de problemes d'url avec co3
    console.log(requestStorage)
    if (tabId == requestStorage.tabId && tab.status == "complete") {
        if (requestStorage.sender == 'connexion1') {
            chrome.tabs.sendMessage(tabId, { sender: "connexionUrl", tabId: requestStorage.tabId, state: "connexion1", infos: requestStorage })

        } else if (requestStorage.sender == 'connexion2') {
            chrome.tabs.sendMessage(tabId, { sender: "connexionUrl", tabId: requestStorage.tabId, state: "connexion2", infos: requestStorage })

        } else if (requestStorage.sender == 'connexion3') {
            chrome.tabs.sendMessage(tabId, { sender: "connexionUrl", tabId: requestStorage.tabId, state: "connexion3", infos: requestStorage })

        } else if (requestStorage.sender == 'connexion4') {
            chrome.tabs.sendMessage(tabId, { sender: "connexionUrl", tabId: requestStorage.tabId, state: "connexion4", infos: requestStorage })

        }
    }
})