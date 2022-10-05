import { addTemplate } from "./addTemplate.js"

export function createAccount(type, pseudo, password) {
    const errorField = document.querySelector('#errorField')
    console.log(pseudo, type, password)
    if ((!type || type == "Type de session") || !pseudo || !password) {
        return errorField.innerText = "Certains champs ne sont pas remplis. Tous les champs sont obligatoires."
    }
    if (pseudo[1] !== ".") {
        return errorField.innerText = "Pseudo incorrect, veulliez respecter le format suivant p.nom"
    }

    let finished = false
    let encrypted = password.split('')
    for(let i = 0; i < pseudo.length; i+=pseudo.length){
        if (finished){
            break
        }
        for (let e = 0; e < pseudo.length; e++){
            if (!password[i+e]){
                let finished = true
                break
            }
            let textCharCode = password[i+e].charCodeAt(0)
            encrypted[i+e] = String.fromCharCode(pseudo[e].charCodeAt(0)+textCharCode)
        }
    }

    const newAccount = {
        type: type,
        pseudo: pseudo,
        password: encrypted.join('')
    }

    chrome.storage.local.get([`extEnt-${pseudo}`], (data) => {
        if (typeof data[`extEnt-${pseudo}`] !== 'undefined') {
            return errorField.innerText = "Un compte avec ce pseudo existe déjà !"
        } else {
            chrome.storage.local.set({ ["extEnt-" + pseudo]: newAccount }, (e) => {
                chrome.storage.local.get(`extEnt-${pseudo}`, (data) => {
                    let profil = data[`extEnt-${pseudo}`]
                    addTemplate(profil.type, profil.pseudo, profil.password)
                    document.querySelector("#pseudo").value = ""
                    document.querySelector("#password").value = ""
                })
            })
        }
    })
}