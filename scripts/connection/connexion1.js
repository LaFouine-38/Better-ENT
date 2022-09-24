chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.sender == 'connexionUrl' && request.state == 'connexion1') {
        document.querySelector('div.fo-connect > div.fo-connect__content > a.fo-connect__link').click()
        chrome.runtime.sendMessage({ sender: "connexion1", tabId: request.tabId, infos: request.infos })
    }
})