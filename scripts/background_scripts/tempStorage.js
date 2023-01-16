if (/*cond prof co (a redefinir)*/true){
    //delete tous les profils profs (mdp)
    setInterval(() => {
            //delete tous les profils profs (mdp)
        chrome.storage.local.get(null, (data) =>{
            let dataObj = Object.entries(data)
            for (const [key, value] of dataObj){
                if (value.type && value.type.toLowerCase() == "eleve"){
                    const account = data[key]
                }
            }
        })
        //redéfinit le mdp du compte actuel (add une propriété state: 'on'/'off' aux comptes type prof)
    }, 5000)
}

//faire la page pour mettre son mot de passe (cmte prof)
//msg passing popup -> page (pseudo-popup -> page -> crypt le mdp + changer dans le localstorage) 