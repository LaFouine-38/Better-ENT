const timer = ms => new Promise(res => setTimeout(res, ms));
window.onload = async function loaded(){
    const parag = document.querySelector('#parag')
    const txt = parag.innerText;

    chrome.runtime.sendMessage({ sender: 'updatePage', action: 'executeUpdateScript' })
    for (let i = 5; i > 0; i--) {
        parag.innerText = `${txt} ${i}s...`
        await timer(1000)
    }
    parag.innerText = `Fermeture...`
    await timer(1000)
    chrome.runtime.sendMessage({ sender: 'updatePage', action: 'close' })
}