import { decrypt, encrypt } from "../../../scripts/utils/crypt.js"
import { displayProfiles } from "./displayProfiles.js"

export function initEdition(editBtn) {
    editBtn.target.parentNode.querySelector('.delete-btn').classList.add('save-btn')
    editBtn.target.parentNode.querySelector('.delete-btn').classList.remove('delete-btn')
    editBtn.target.classList.add('cancel-btn')
    editBtn.target.classList.remove('edit-btn')
    editBtn.target.parentNode.querySelectorAll('.input-profil').forEach((e, index) => {
        e.disabled = false
    })
    editBtn.target.parentNode.querySelector('.save-btn').innerText = "Sauvegarder"
    editBtn.target.innerText = "Annuler"
    document.querySelectorAll('.btn-profil:not(.save-btn, .cancel-btn)').forEach(e => {
        e.disabled = true
    })
    document.querySelectorAll('div.profil-creation > .input-profil').forEach(e => {
        e.disabled = true
    })
}

export function editProfil(e) {
    const pseudo = e.target.parentNode.querySelector(".pseudo").value
    const password = e.target.parentNode.querySelector(".password").value
    const type = e.target.parentNode.querySelector('.select-menu').options[e.target.parentNode.querySelector(".select-menu").selectedIndex].text
    updateProfilInStorage(e.target.getAttribute('data-pseudo'), type, pseudo, password)

}

export function endingEdition(cancelBtn) {
    cancelBtn.target.parentNode.querySelector('.save-btn').classList.add('delete-btn')
    cancelBtn.target.parentNode.querySelector('.save-btn').classList.remove('save-btn')
    cancelBtn.target.parentNode.querySelector('.cancel-btn').classList.add('edit-btn')
    cancelBtn.target.parentNode.querySelector('.cancel-btn').classList.remove('cancel-btn')
    cancelBtn.target.parentNode.querySelectorAll('.input-profil').forEach((e) => {
        e.disabled = true
    })
    cancelBtn.target.parentNode.querySelector('.delete-btn').innerText = "Supprimer le profil"
    cancelBtn.target.parentNode.querySelector('.edit-btn').innerText = "Modifier le profil"
    document.querySelectorAll('.btn-profil:not(.save-btn, .cancel-btn)').forEach(e => {
        e.disabled = false
    })
    document.querySelectorAll('div.profil-creation > .input-profil').forEach(e => {
        e.disabled = false
    })
}

function updateProfilInStorage(keyPseudo, newType, newPseudo, newPassword) {
    chrome.storage.local.get([`extEnt-${keyPseudo}`], (data) => {
        if (typeof data[`extEnt-${keyPseudo}`] !== 'undefined') {
            const profil = data[`extEnt-${keyPseudo}`]
            let updateAccount = {
                type: profil.type,
                pseudo: profil.pseudo,
                password: decrypt(profil.pseudo, profil.password),
            }
            if (newType) {
                updateAccount.type = newType
            }
            if (newPseudo) {
                updateAccount.pseudo = newPseudo
            }
            if (newPassword) {
                let onlyStars = true
                for (let char of newPassword) {
                    console.log(char)
                    if (char !== "*" || newPassword.length !== updateAccount.password.length) {
                        onlyStars = false
                        break
                    }
                }
                if (!onlyStars) {
                    updateAccount.password = newPassword
                }
            }

            updateAccount.password = encrypt(updateAccount.pseudo, updateAccount.password)

            chrome.storage.local.remove([`extEnt-${keyPseudo}`])
            chrome.storage.local.set({[`extEnt-${updateAccount.pseudo}`]: updateAccount})
        }
        displayProfiles()
    })
}