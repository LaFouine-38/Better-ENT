import { encrypt } from "../../../scripts/utils/hash.js"
import { addTemplate } from "./addTemplate.js"

export function createAccount(type, pseudo, password) {
    const errorField = document.querySelector('#errorField')
    if ((!type || type == "Type de session") || !pseudo || !password) {
        return errorField.innerText = "Certains champs ne sont pas remplis. Tous les champs sont obligatoires."
    }
    if (pseudo[1] !== ".") {
        return errorField.innerText = "Pseudo incorrect, veuillez respecter le format suivant p.nom"
    }

    let encrypted = encrypt(pseudo, password)

    const newAccount = {
        type: type,
        pseudo: pseudo,
        password: encrypted
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