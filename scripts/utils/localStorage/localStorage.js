function checkIfAccountExists(pseudo){
    chrome.storage.local.get(`extEnt-${pseudo}`, (data) =>{
        if (data !== {} || data !== undefined || data !== null){
            return false
        } else {
            return true
        }
    })
}

// function creationArgsChecker(type, pseudo, password){
//     if (!type || !pseudo || !password){
//         return chrome.runtime.sendMessage({sender: "createAccountArgs", action: "missingArgumentsHandling"})
//     }
// }

function getLocalStorage(){// tout recup et mettre un foreach e if e.startswith extent-
    //if (!checkIfAccountExists(pseudo)){
        chrome.storage.local.get(/*`extEnt-${pseudo}`*/ null, (data) =>{
            return data
        })
    //}
}

function editAccount(pseudo, {accountType, password}){

}
/* faire func getpseudo/msg/type (peut etre utiliser getlocalstorage().pseudo)

faire un systeme de gestion des entrées d'infos (verif que tt est mis => setlocalstorage)

peut etre renommer get/set localstorage en createaccount et getaccount

tester getlocalstorage (pas eu le tps)

creer une fonction deleteaccount (avec ckeck exists)

peut etre creer une fonction (de test) remove all (get null => {data.foreach(e remove [check la doc])})
*/