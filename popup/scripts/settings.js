const add = document.querySelector("#add")
const container = document.querySelector("#allProfiles")
window.onload = displayProfiles()
function displayProfiles() {
    if (container.hasChildNodes()) {
        container.childNodes.forEach(e =>
            e.remove())
    }
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
    //voir pour reset le formulaire


})

//btns handler
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentNode.remove()
        chrome.storage.local.remove(`extEnt-${e.target.getAttribute('data-pseudo')}`, (e) => {
        })
    }
    if (e.target.classList.contains('edit-btn') && !(e.target.classList.contains('cancel-btn'))) {
        initEdition(e)
    } else if (e.target.classList.contains('cancel-btn') && !(e.target.classList.contains('edit-btn'))) {
        endingEdition(e)
    }
    if (e.target.classList.contains('save-btn')) {
        editProfil(e)
        endingEdition(e)
    }
});

function addTemplate(type, pseudo, password) {
    let newElement =
        `<div data-type="${type}" data-pseudo="${pseudo}" data-password="${password}" class="profil profil-cree">
        &nbsp;
        <select id="ent-${pseudo}" name="session" title="Veuillez choisir votre type de session" class="select-menu input-profil" required disabled=true>
            <option value="0" class="input-profil" disabled>Type de session</option>
            <option value="1" class="input-profil" ${type == "Eleve" ? "selected" : ""}>Eleve</option>
            <option value="2" class="input-profil" ${type == "Parent" ? "selected" : ""}>Parent</option>
        </select>
        &nbsp;
        <input class="pseudo input-profil" type="text" value="${pseudo}" required disabled=true />
        &nbsp;
        <input class="password input-profil" type="password" value="${password}" required disabled=true/>
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

    const newAccount = {
        type: type,
        pseudo: pseudo,
        password: password
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
            const updateAccount = {
                type: profil.type,
                pseudo: profil.pseudo,
                password: profil.password,
            }
            if (newType) {
                updateAccount.type = newType
            }
            if (newPassword) {
                updateAccount.password = newPassword
            }
            if (newPseudo) {
                updateAccount.pseudo = newPseudo
            }
            chrome.storage.local.remove([`extEnt-${keyPseudo}`])
            chrome.storage.local.set({ [`extEnt-${updateAccount.pseudo}`]: updateAccount })
        }
    })
}