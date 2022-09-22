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
        <button id="activer" class="btn-profil" style="float: right;">Se connecter</button>
    </div>`
    container.innerHTML += newElement
}