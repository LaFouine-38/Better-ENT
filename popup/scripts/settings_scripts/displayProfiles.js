import { addTemplate } from './addTemplate.js';
export function displayProfiles() {
    document.querySelectorAll('.profil-cree').forEach(e => e.remove())
        
    chrome.storage.local.get(null, (data) => {
        Object.keys(data).forEach(elementKey => {
            if (elementKey.startsWith('extEnt-')) {
                addTemplate(data[elementKey].type, data[elementKey].pseudo, data[elementKey].password)
            }
        })
    })
}