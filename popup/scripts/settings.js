import { displayProfiles } from './settings_scripts/displayProfiles.js';
import { createAccount } from './settings_scripts/createAccount.js';
import { initEdition, endingEdition, editProfil } from './settings_scripts/profilesEditing.js';

const add = document.querySelector("#create-btn")
export const container = document.querySelector("#allProfiles")

add.addEventListener('click', (e) => {
    const pseudo = document.querySelector("#create-pseudo").value
    const password = document.querySelector("#create-password").value
    const type = document.querySelector("#create-typeSelect").options[document.querySelector("#create-typeSelect").selectedIndex].text
    createAccount(type, pseudo, password)

})

//btns handler
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentNode.remove()
            chrome.storage.local.remove(`extEnt-${e.target.getAttribute('data-pseudo')}`, (e) => {
        })
    }
    if (e.target.classList.contains('edit-btn') && !(e.target.classList.contains('cancel-btn'))) {
        initEdition(e)
    } else if (e.target.classList.contains('cancel-btn') && !(e.target.classList.contains('edit-btn'))) {
        endingEdition(e)
        displayProfiles()
    }
    if (e.target.classList.contains('save-btn')) {
        editProfil(e)
        endingEdition(e)
    }
    if (e.target.classList.contains('password') && e.target.disabled !== true){
        e.target.value = ""
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('password') && e.target.value == "" && e.target.disabled !== true){
        chrome.storage.local.get([`extEnt-${e.target.parentNode.getAttribute('data-pseudo')}`], (data) => {
            if (typeof data[`extEnt-${e.target.parentNode.getAttribute('data-pseudo')}`] !== 'undefined') {
                const profil = data[`extEnt-${e.target.parentNode.getAttribute('data-pseudo')}`]
                e.target.value = profil.password.split('').map(e => e = "*").join('')
            }
        })
    }
})

document.getElementById("selectPronote").onchange = (event) => {
    let index = event.target.value;
    let configData;
    chrome.storage.local.get(['extEntConfig'], (data) => {
        data.extEntConfig.effectOnPronote = index == "Oui"
        chrome.storage.local.set(data)
    })
}

window.onload = () => {
    displayProfiles()

    let non = document.querySelector("option.selectPronoteThemeNon")
    let oui = document.querySelector("option.selectPronoteThemeOui")

    chrome.storage.local.get(['extEntConfig'], (data) => {
        if(data.extEntConfig.effectOnPronote) {
            oui.selected = true
        } else {
            non.selected = true
        }
    })  
}