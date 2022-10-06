import { decrypt } from "../../../scripts/utils/hash.js"
import { container } from "../settings.js"

export function addTemplate(type, pseudo, password) {
    
    let newElement =
        `<div data-type="${type}" data-pseudo="${pseudo}" class="profil profil-cree">
        &nbsp;
        <select id="ent-${pseudo}" name="session" title="Veuillez choisir votre type de session" class="select-menu input-profil" required disabled=true>
            <option value="0" class="input-profil" disabled>Type de session</option>
            <option value="1" class="input-profil" ${type == "Eleve" ? "selected" : ""}>Eleve</option>
            <option value="2" class="input-profil" ${type == "Parent" ? "selected" : ""}>Parent</option>
        </select>
        &nbsp;
        <input class="pseudo input-profil" type="text" value="${pseudo}" required disabled=true>
        &nbsp;
        <input class="password input-profil" type="password" value="${decrypt(pseudo, password).split('').map(e => e = "*").join('')}" required disabled=true/>
        <button data-pseudo="${pseudo}" class="btn-profil delete-btn" style="float: right;">Supprimer le profil</button>
        <button data-pseudo="${pseudo}" class="btn-profil edit-btn" style="float: right;">Modifier le profil</button>        
    </div>`
    container.innerHTML += newElement
}