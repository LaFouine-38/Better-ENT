const add = document.querySelector("#add")
const container = document.querySelector("#allProfiles")
window.onload = displayProfiles()
function displayProfiles() {
    document.querySelectorAll('.profil-cree').forEach(e => e.remove())
        
    chrome.storage.local.get(null, (data) => {
        Object.keys(data).forEach(elementKey => {
            if (elementKey.startsWith('extEnt-')) {
                addTemplate(data[elementKey].type, data[elementKey].pseudo, data[elementKey].password)
            }
        })
    })

}


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


function addTemplate(type, pseudo, password) {
    let finished = false
    let decrypted = password.split('')
    for(let i = 0; i < password.length; i+=pseudo.length){
        if (finished){
            break
        }
        for (let e = 0; e < pseudo.length; e++){
            if (!password[i+e]){
                let finished = true
                break
            }
            let textCharCode = password[i+e].charCodeAt(0)
            decrypted[i+e] = String.fromCharCode(textCharCode-pseudo[e].charCodeAt(0))
        }
    }
    let newElement =
        `<div data-type="${type}" data-pseudo="${pseudo}" data-password="${password}" class="profil profil-cree">
        &nbsp;
        <select id="ent-${pseudo}" name="session" title="Veuillez choisir votre type de session" class="select-menu input-profil" required disabled=true>
            <option value="0" class="input-profil" disabled>Type de session</option>
            <option value="1" class="input-profil" ${type == "Eleve" ? "selected" : ""}>Eleve</option>
            <option value="2" class="input-profil" ${type == "Parent" ? "selected" : ""}>Parent</option>
        </select>
        &nbsp;
        <input class="pseudo input-profil" type="text" value="${pseudo}" required disabled=true>
        &nbsp;
        <input class="password input-profil" type="password" value="${decrypted.map(e => e = "*").join('')}" required disabled=true/>
        <button data-pseudo="${pseudo}" class="btn-profil delete-btn" style="float: right;">Supprimer le profil</button>
        <button data-pseudo="${pseudo}" class="btn-profil edit-btn" style="float: right;">Modifier le profil</button>        
    </div>`
    container.innerHTML += newElement
}

function createAccount(type, pseudo, password) {
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

function initEdition(editBtn) {
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

function editProfil(e) {
    const pseudo = e.target.parentNode.querySelector(".pseudo").value
    const password = e.target.parentNode.querySelector(".password").value
    const type = e.target.parentNode.querySelector('.select-menu').options[e.target.parentNode.querySelector(".select-menu").selectedIndex].text
    updateProfilInStorage(e.target.getAttribute('data-pseudo'), type, pseudo, password)

}

function endingEdition(cancelBtn) {
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
            let finished = false
            let decrypted = profil.password.split('')
            for(let i = 0; i < profil.password.length; i+=profil.pseudo.length){
                if (finished){
                    break
                }
                for (let e = 0; e < profil.pseudo.length; e++){
                    if (!profil.password[i+e]){
                        let finished = true
                        break
                    }
                    let textCharCode = profil.password[i+e].charCodeAt(0)
                    decrypted[i+e] = String.fromCharCode(textCharCode-profil.pseudo[e].charCodeAt(0))
                }
            }
            let updateAccount = {
                type: profil.type,
                pseudo: profil.pseudo,
                password: decrypted.join(''),
            }
            if (newType) {
                updateAccount.type = newType
            }
            if (newPseudo) {
                updateAccount.pseudo = newPseudo
            }
            if (newPassword) {
                let onlyStars = true
                for (char of newPassword){
                    console.log(char)
                    if (char !== "*" || newPassword.length !== updateAccount.password.length){
                        onlyStars = false
                        break
                    }
                }
                if (!onlyStars){
                    updateAccount.password = newPassword   
                }
            }
            finished = false
            let encrypted = updateAccount.password.split('')
            for(let i = 0; i < updateAccount.password.length; i+=updateAccount.pseudo.length){
                if (finished){
                    break
                }
                for (let e = 0; e < updateAccount.pseudo.length; e++){
                    if (!updateAccount.password[i+e]){
                        let finished = true
                        break
                    }
                    let textCharCode = updateAccount.password[i+e].charCodeAt(0)
                    encrypted[i+e] = String.fromCharCode(updateAccount.pseudo[e].charCodeAt(0)+textCharCode)
                }
            }
            updateAccount.password = encrypted.join('')

            chrome.storage.local.remove([`extEnt-${keyPseudo}`])
            chrome.storage.local.set({ [`extEnt-${updateAccount.pseudo}`]: updateAccount })
        }
        displayProfiles()
    })
}