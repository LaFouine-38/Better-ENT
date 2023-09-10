chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.sender == 'connexionUrl' && request.state == 'connexion4'){
        document.querySelector('div.msg__content > p.p-like > strong > a').click()
        chrome.runtime.sendMessage({sender: "connexion4", tabId:request.tabId, infos: request.infos})
        window.open("https://aristide-berges.ent.auvergnerhonealpes.fr/sg.do?PROC=PAGE_ACCUEIL&ACTION=VALIDER", "_self")
    }
})