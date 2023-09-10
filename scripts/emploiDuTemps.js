function emploiDuTempsUpdater() {
    const intervals = ["8h00-9h00", "9h00-10h00", "10h00-11h00", "11h00-12h00", "Cantine", "13h30-14h30", "14h30-15h30", "15h30-16h30", "16h30-17h30", "17h30-18h00"]
    const timeStamps = document.querySelectorAll('div.scheduler__slots > div.scheduler__slot.js-scheduler__slot.flex-align--both-column > span.scheduler__time')
    timeStamps.forEach((timestamp, index) => {
        timestamp.innerHTML = intervals[index]
    })

    const cours = document.querySelectorAll(".scheduler__card.scheduler__card--session.js-scheduler__cdt-event")
    cours.forEach(_cours => {
        const color = _cours.attributes[1].nodeValue.split("; ")[1].split(": ")[1]
        const newColor = darkenHexColor(color, 0.4)
        _cours.style.backgroundColor = newColor
    })
}

function darkenHexColor(hexColor, factor) {
    factor = typeof factor === 'number' ? factor : 0.2
    hexColor = hexColor.replace(/^#/, '')
    const r = parseInt(hexColor.substring(0, 2), 16)
    const g = parseInt(hexColor.substring(2, 4), 16)
    const b = parseInt(hexColor.substring(4, 6), 16)
    const newR = Math.max(0, r - r * factor)
    const newG = Math.max(0, g - g * factor)
    const newB = Math.max(0, b - b * factor)

    const newHexColor =
        '#' +
        Math.round(newR).toString(16).padStart(2, '0') +
        Math.round(newG).toString(16).padStart(2, '0') +
        Math.round(newB).toString(16).padStart(2, '0')

    return newHexColor
}