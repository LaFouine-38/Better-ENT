function emploiDuTempsUpdater() {
    const intervals = ["8h00-9h00", "9h00-10h00", "10h00-11h00", "11h00-12h00", "Cantine", "13h30-14h30", "14h30-15h30", "15h30-16h30", "16h30-17h30", "17h30-18h00"]
    const timeStamps = document.querySelectorAll('div.scheduler__slots > div.scheduler__slot.js-scheduler__slot.flex-align--both-column > span.scheduler__time')
    timeStamps.forEach((timestamp, index) => {
        timestamp.innerHTML = intervals[index]
    })
}
