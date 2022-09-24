chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.sender == 'connexionUrl' && request.state == 'connexion3'){
        const evt = new Event("click")
        if (request.infos.type == 'Parent') {
            const submitBtn = document.querySelector('#bouton_responsable')
            submitBtn.dispatchEvent(evt)
        } else if (request.infos.type == 'Eleve'){
            const submitBtn = document.querySelector('#bouton_eleve')
            submitBtn.dispatchEvent(evt)
        }

        const userInput = document.querySelector('#username')
        const passwordInput = document.querySelector('#password')
        const secondSubmitBtn = document.querySelector('#bouton_valider')

        userInput.value = request.infos.pseudo
        passwordInput.value = request.infos.password
        secondSubmitBtn.click()
        chrome.runtime.sendMessage({sender: "connexion3", tabId:request.tabId, infos: request.infos})
    }
})