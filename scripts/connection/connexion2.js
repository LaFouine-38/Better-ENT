chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.sender == 'connexionUrl' && request.state == 'connexion2'){ 
        if (request.infos.type == 'Parent' || request.infos.type == 'Eleve'){
            document.querySelector('#idp-EDU').click()
        }
        document.querySelector('#button-submit').click()

        chrome.runtime.sendMessage({sender: "connexion2", tabId:request.tabId, infos: request.infos})    
    }
})