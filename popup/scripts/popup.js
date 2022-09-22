const container = document.querySelector("#users")
window.onload = displayProfiles()
function displayProfiles() {
    chrome.storage.local.get(null, (data) => {
        Object.keys(data).forEach(elementKey => {
            if (elementKey.startsWith('extEnt-')) {
                addTemplate(/*data[elementKey].type, */data[elementKey].pseudo/*, data[elementKey].password*/)
            }
        })
    })

}

function addTemplate(/*type, */pseudo/*, password*/) {
    let newElement =
    `<div class="user" data-pseudo=${pseudo}>
        <span style="bottom: 100%;">&nbsp;${pseudo}</span>
        <button class="btn-profil connect-btn">Se connecter</button>
    </div>`
    container.innerHTML += newElement
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        chrome.storage.local.get([`extEnt-${pseudo}`], (data) => {
            chrome.runtime.sendMessage({ sender: "popup", action: "connexionInit", infos: {
                type: data[`extEnt-${pseudo}`].type, pseudo: data[`extEnt-${pseudo}`].pseudo, password: data[`extEnt-${pseudo}`].password
            }});
        })
    }
});