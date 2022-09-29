const shortcuts = document.querySelectorAll('li.services-shortcut__item')
shortcuts.forEach((e) => {
    let element = document.createElement('div')
    element.classList += "shortcut-background"
    e.appendChild(element)
})
