chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //TODO - faire une page update.html qui envoie la request ici et qui affiche un truc en mode
    //extension mise à jour fermeture dans 5,4,3,2,1...
    console.log("request getted" + request.sender)
    if (request.sender == 'config'){
        function updateOnBg(){
            //code a executer si update
            return
        }
        updateOnBg()

    }
})