import { displayProfiles } from './settings_scripts/displayProfiles.js';
import { createAccount } from './settings_scripts/createAccount.js';
import { initEdition, endingEdition, editProfil } from './settings_scripts/profilesEditing.js';

const add = document.querySelector("#add")
export const container = document.querySelector("#allProfiles")
window.onload = displayProfiles()

add.addEventListener('click', (e) => {
    const pseudo = document.querySelector("#pseudo").value
    const password = document.querySelector("#password").value
    const type = document.querySelector("#typeSelect").options[document.querySelector("#typeSelect").selectedIndex].text
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