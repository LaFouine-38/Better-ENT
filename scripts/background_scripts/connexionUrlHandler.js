chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.sender == 'popup' && request.action == 'connexionInit') {
        chrome.tabs.create({
            url: 'https://aristide-berges.ent.auvergnerhonealpes.fr',
            selected: true
        })
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            var tabId = activeTab.id;
            if (activeTab.pendingUrl.startsWith('https://aristide-berges.ent.auvergnerhonealpes.fr')) {
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
    if (tab.url.startsWith('https://educonnect.education.gouv.fr/idp/profile/SAML2/POST/SSO?execution=') && tab.status == "loading"){
        await chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ["css/login.css"]
        })
    }
    if (tabId == requestStorage.tabId && tab.status == "complete") {
        if (tab.url.startsWith('https://educonnect.education.gouv.fr/idp/profile/SAML2/POST/SSO?execution=')){
            await chrome.scripting.executeScript({
                target: {tabId: tabId},
                files: [/*"scripts/utils/hash.js" ,*/"scripts/connection/connexion3.js"]
            })
        }
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

    //temp
    if (tab.url.startsWith('https://aristide-berges.ent.auvergnerhonealpes.fr/') && tab.status == "complete"){
        await chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["scripts/navMenu.js"]
        })
    }
})