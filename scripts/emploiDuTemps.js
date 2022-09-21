function emploiDuTempsUpdater() {
    const intervals = ["8h25-9h20", "9h20-10h15", "Récré", "10h30-11h25", "12h20", "Cantine", "13h30-14h25", "14h25-15h20", "Récré", "15h35-16h30", "16h30-17h25"]
    const timeStamps = document.querySelectorAll('div.scheduler__slots > div.scheduler__slot.js-scheduler__slot.flex-align--both-column > span.scheduler__time')
    timeStamps.forEach((timestamp, index) => {
        timestamp.innerHTML = intervals[index]
    })
}
