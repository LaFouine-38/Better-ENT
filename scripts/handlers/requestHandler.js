chrome.runtime.onMessage.addListener(
    //handler function
    function(request, sender, sendResponse) {
        //emploi du temps
        if (request.action == "emploiDuTemps"){
            if (/*request.changeInfo.status = "complete" && */request.tab.url.startsWith("https://fleming-isere.ent.auvergnerhonealpes.fr/sg.do?PROC=CDT_AFFICHAGE&VUE=E")){
                emploiDuTempsUpdater()
            }
        }
    }
);