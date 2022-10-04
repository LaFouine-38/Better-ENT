chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/')){
        await chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ["css/styles.css"]
        })
        await chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["scripts/emploiDuTemps.js", "scripts/handlers/requestHandler.js"]
        })
    }
    if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/sg.do?PROC=TRAVAIL_A_FAIRE&ACTION=AFFICHER_ELEVES_TAF&filtreAVenir=true')){
        await chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ["css/travailAFaire.css"]
        })
    }
    //ajouter les autres pages en suivant le modele
    /* if(tab.url.startsWith('match-pattern-sans-etoile')){
        //si css
        await chrome.scripting.insertCSS({
            target: {tabId: tabId},
            files: ["lienDuFichier(le meme que dans manifest.json)", "un autre si besoin", "un autre si besoin", "t'as capté"]
        })
        //si js
        await chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ["lienDuFichier(le meme que dans manifest.json)", "c'est vraiment utile que je réexplique ?"]
        })
    }*/
})