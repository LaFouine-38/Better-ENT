window.onload = () => {
    const shortcuts = document.querySelectorAll('nav.menu.js-menu > ul.services-shortcut > li.services-shortcut__item')
    shortcuts.forEach((e) => {
        e.appendChild('<div class="shortcut-background"></div>')
    })
}