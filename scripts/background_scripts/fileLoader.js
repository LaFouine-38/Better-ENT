chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

    //                  IMPORTANT

    if (tab.status == "loading") {

        //                  CSS                 //

        if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/')) {
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ["css/themes/dark/CommonPages.css"]
            })
        }
        if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/sg.do?PROC=PAGE_ACCUEIL')) {
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ["css/themes/dark/pages/accueil.css"]
            })
        }
        if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/sg.do?PROC=MESSAGERIE')) {
            chrome.scripting.insertCSS({
                target: {tabId: tabId},
                files: ["css/themes/dark/pages/messages.css"]
            })
        }
        if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/sg.do?PROC=CLASSEUR_PEDA&ACTION=AFFICHER_ELEVES_ACCUEIL')) {
            chrome.scripting.insertCSS({
                target: {tabId: tabId},
                files: ["css/themes/dark/pages/diary/prochainement.css"]
            })
        }
        if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/sg.do?PROC=TRAVAIL_A_FAIRE&ACTION=AFFICHER_ELEVES_TAF')) {
            chrome.scripting.insertCSS({
                target: {tabId: tabId},
                files: ["css/themes/dark/pages/diary/travailAfaire.css"]
            })
        }
        if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/sg.do?PROC=CDT_SEANCE&ACTION=VIEW_SEANCE')) {
            chrome.scripting.insertCSS({
                target: {tabId: tabId},
                files: ["css/themes/dark/pages/diary/commonDiary.css"]
            })
        }

        //ajouter les autres pages en suivant le modele
        //mettre tab.url == "lien" au lieu de startsWith("") si il faut un lien exact
        /* if(tab.url.startsWith('match-pattern-sans-etoile')){
            chrome.scripting.insertCSS({
                target: {tabId: tabId},
                files: ["lienDuFichier(le meme que dans manifest.json)", "un autre si besoin", "un autre si besoin", "t'as capté"]
            })
        }*/
    }
})