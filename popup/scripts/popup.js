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
        `<div class="user" data-pseudo="${pseudo}">
            <span style="bottom: 100%;">&nbsp;${pseudo}</span>
            <input type="button" value="Se connecter" class="btn-profil connect-btn">
        </div>`
    container.innerHTML += newElement
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('connect-btn')) {
        const pseudo = e.target.parentNode.getAttribute('data-pseudo')
        chrome.storage.local.get([`extEnt-${pseudo}`], (data) => {
            chrome.runtime.sendMessage({
                sender: "popup", action: "connexionInit", infos: {
                    type: data[`extEnt-${pseudo}`].type, pseudo: data[`extEnt-${pseudo}`].pseudo, password: data[`extEnt-${pseudo}`].password
                }
            });
        })
    }
});


// let basicTools = document.getElementById("basicTools").children

// for (let i = 0; i < basicTools.length; i++) {
//     const element = basicTools.item(i)
//     element.
// }