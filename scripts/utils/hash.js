export function encrypt(key, text){
    let finished = false
    let encrypted = text.split('')
    for(let i = 0; i < text.length; i+=key.length){
        if (finished){
            break
        }
        for (let e = 0; e < key.length; e++){
            if (!text[i+e]){
                let finished = true
                break
            }
            let textCharCode = text[i+e].charCodeAt(0)
            encrypted[i+e] = String.fromCharCode(key[e].charCodeAt(0)+textCharCode)
        }
    }
    return encrypted.join('')
}

export function decrypt(key, encryptedText){
    let finished = false
    let decrypted = encryptedText.split('')
    for(let i = 0; i < encryptedText.length; i+=key.length){
        if (finished){
            break
        }
        for (let e = 0; e < key.length; e++){
            if (!encryptedText[i+e]){
                let finished = true
                break
            }
            let textCharCode = encryptedText[i+e].charCodeAt(0)
            decrypted[i+e] = String.fromCharCode(textCharCode-key[e].charCodeAt(0))
        }
    }
    return decrypted.join('')
}

