const add = document.querySelector("#add")
const container = document.querySelector("#allProfiles")
window.onload = updateProfiles()
function updateProfiles() {
    chrome.storage.local.get(null, (data) => {
        Object.keys(data).forEach(elementKey => {
            if (elementKey.startsWith('extEnt-')) {
                addTemplate(data[elementKey].accountType, data[elementKey].pseudo, data[elementKey].password)
            }
        })
    })

}

add.addEventListener('click', (e) => {
    const pseudo = document.querySelector("#pseudo").value
    const password = document.querySelector("#password").value
    const type = document.querySelector("#typeSelect").options[document.querySelector("#typeSelect").selectedIndex].text
    createAccount(type, pseudo, password)
    document.querySelector("#pseudo").value = ""
    document.querySelector("#password").value = ""
    //voir pour reset le formulaire


})

//btns handler
document.addEventListener('click',function(e){
    if (e.target.classList.contains('delete-btn')){
        e.target.parentNode.remove()
        chrome.storage.local.remove(`extEnt-${e.target.getAttribute('data-pseudo')}`, (e) => {           
        }) 
    }
    //faire le modif btn
});

function addTemplate(type, pseudo, password) {
    let newElement =
    `<div data-type="${type}" data-pseudo="${pseudo}" data-password="${password}" class="profil profil-cree">
        &nbsp;
        <select id="ent-${pseudo}" name="session" title="Veuillez choisir votre type de session" class="input-profil" required disabled=true>
            <option value="0" class="input-profil" disabled>Type de session</option>
            <option value="1" class="input-profil" ${type == "Eleve" ? "selected" : ""}>Eleve</option>
            <option value="2" class="input-profil" ${type == "Parent" ? "selected" : ""}>Parent</option>
        </select>
        &nbsp;
        <input class="input-profil" type="text" value="${pseudo}" required disabled=true />
        &nbsp;
        <input class="input-profil" type="password" value="${password}" required disabled=true/>
        <button data-pseudo="${pseudo}" class="btn-profil delete-btn" style="float: right;">Supprimer le profil</button>
        <button data-pseudo="${pseudo}" class="btn-profil edit-btn" style="float: right;">Modifier le profil</button>        
    </div>`
    container.innerHTML += newElement
    
    //getvalue(pseudo/mdp/type) document.querySelector('selecteur').getAttribute('data-pseudo')
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
        accountType: type,
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
                    addTemplate(profil.accountType, profil.pseudo, profil.password)
                })                
            })
            
        }
    })
}
