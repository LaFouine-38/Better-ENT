import { decrypt } from "../../../scripts/utils/crypt.js"
import { container } from "../settings.js"

export function addTemplate(type, pseudo, password) {
    
    let newElement =
        `<div data-type="${type}" data-pseudo="${pseudo}" class="profil-like profil-cree">
        <div class="credential-inputs-container">
            <select id="ent-${pseudo}" name="session" title="Veuillez choisir votre type de session" class="select-menu credential-input" required disabled=true>
                <option value="0" class="credential-input" disabled>Type de session</option>
                <option value="1" class="credential-input" ${type == "Eleve" ? "selected" : ""}>Eleve</option>
                <option value="2" class="credential-input" ${type == "Parent" ? "selected" : ""}>Parent</option>
            </select>
            &nbsp;
            <input class="pseudo credential-input" type="text" value="${pseudo}" required disabled=true>
            &nbsp;
            <input class="password credential-input" type="password" value="${decrypt(pseudo, password).split('').map(e => e = "*").join('')}" required disabled=true/>
        </div>
        <div class="btn-profile-container">
            <button data-pseudo="${pseudo}" class="btn-profil delete-btn" style="float: right;">Supprimer le profil</button>
            &nbsp;
            <button data-pseudo="${pseudo}" class="btn-profil edit-btn" style="float: right;">Modifier le profil</button>        
        </div>
        </div>`
    container.innerHTML += newElement
}