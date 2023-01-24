chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {

    //                  IMPORTANT : Pour importer des scripts js, importez les dans le manifest

    if (tab.status == "loading") {

        //                  CSS                 //

        /* Common */
        if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/')) {
            chrome.scripting.insertCSS({
                target: { tabId: tabId },
                files: ["css/themes/dark/CommonPages.css"]
            })
        }

        /* Pages */
            /* Accueil */
            if (tab.url.startsWith('https://fleming-isere.ent.auvergnerhonealpes.fr/sg.do?PROC=PAGE_ACCUEIL')) {
                chrome.scripting.insertCSS({
                    target: { tabId: tabId },
                    files: ["css/themes/dark/pages/accueil.css"]
                })
            }

            /* Messagerie */
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

            // Load le css de Pronote
            if (tab.url.startsWith('https://0382098z.index-education.net/pronote/eleve.html')) {
                chrome.storage.local.get(['extEntConfig'], (data) => {
                    if(data.extEntConfig.effectOnPronote) {
                        chrome.scripting.insertCSS({
                            target: {tabId: tabId},
                            files: ["css/themes/dark/pronote.css"]
                        })
                    }
                })

            }

        //ajouter les autres pages en suivant le modele
        //mettre tab.url == "lien" au lieu de startsWith("") si il faut un lien exact
        /* if(tab.url.startsWith('match-pattern-sans-etoile')){
            chrome.scripting.insertCSS({
                target: {tabId: tabId},
                files: ["lienRelatifDuFichier", "un autre si besoin", "un autre si besoin", "t'as capté"]
            })
        }*/
    }
})