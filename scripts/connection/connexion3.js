chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
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
        let finished = false
        let decrypted = request.infos.password.split('')
        for(let i = 0; i < request.infos.password.length; i+=request.infos.pseudo.length){
            if (finished){
                break
            }
            for (let e = 0; e < request.infos.pseudo.length; e++){
                if (!request.infos.password[i+e]){
                    let finished = true
                    break
                }
                let textCharCode = request.infos.password[i+e].charCodeAt(0)
                decrypted[i+e] = String.fromCharCode(textCharCode-request.infos.pseudo[e].charCodeAt(0))
            }
        }
        passwordInput.value = decrypted.join('')
        secondSubmitBtn.click()
        chrome.runtime.sendMessage({sender: "connexion3", tabId:request.tabId, infos: request.infos})
    }
})