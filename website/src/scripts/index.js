import { manageBurgerButtonEvent, openNavMenu } from './navMenu'

gsap.fromTo("button", { y: window.screen.height }, {
    y: 0,
    duration: 0.8
})

window.onload = () => {
    document.getElementById("nav-icon3").addEventListener('click', ev => manageBurgerButtonEvent())
    document.querySelector("main button").addEventListener('click', ev => openNavMenu())
}