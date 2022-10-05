import { container } from "../settings.js"

export function addTemplate(type, pseudo, password) {
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