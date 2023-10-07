let navMenuState = false

export const openNavMenu = () => {
    const navMenu = `
    <div id="navMenu">
        <div class="selected">
            <h1>ACCUEIL</h1>
        </div>
        <div>
            <h1>LE PROJET</h1>
        </div>
        <div>
            <h1>QUI SOMMES NOUS</h1>
        </div>
        <div>
            <h1>TÉLÉCHERGER</h1>
        </div>
    </div>
    `
    if(navMenuState == true) return
    navMenuState = true
    document.getElementById("nav-icon3").classList.toggle('open')
    gsap.to("main", { y: window.screen.height, duration: 0.5 }).then(() => {
        document.querySelectorAll("h1,button").forEach(e => e.classList.add("none"))
        document.querySelector("main").innerHTML += navMenu
        gsap.set("main", { y: 0 })
        gsap.fromTo("#navMenu", { y: -window.screen.height }, {
            y: 0,
            duration: 0.5
        })
    })
    document.querySelector("body").classList.add("blue")
}

const closeNavMenu = () => {
    const button = document.getElementById("nav-icon3")
    button.classList.remove("open")
    navMenuState = false
    gsap.to("#navMenu", { y: -window.screen.height, duration: 0.5 }).then(() => {
        document.getElementById('navMenu').remove()
        document.querySelectorAll("h1,button").forEach(e => e.classList.remove("none"))
        gsap.fromTo("main", { y: window.screen.height }, {
            y: 0,
            duration: 0.5
        })
    })
    document.querySelector("body").classList.remove("blue")
}
export const manageBurgerButtonEvent = () => {
    const button = document.getElementById("nav-icon3")
    if(button.classList.contains("open")) {
        closeNavMenu()
        document.querySelector("main button").addEventListener('click', ev => openNavMenu())
    } else {
        openNavMenu()
    }
}