//VARIABLES SECTION



const startButton = document.querySelector('.start')
const pauseButton = document.querySelector('.pause')
const stopButton = document.querySelector('.stop')
const resetButton = document.querySelector('.reset')
const archiveButton = document.querySelector('.history')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time') // stopwatch sector
const archiveList = document.querySelector('.time-list')
const modalShadow = document.querySelector('.modal-shadow')
const infoIcon = document.querySelector('.info')
const closeModalBtn = document.querySelector('.close')

let countTime
let minutes = 0
let seconds = 0
let timesArr = []




//FUNCTIONS SECTION


const start = () => {
	clearInterval(countTime)

	countTime = setInterval(() => {
		console.log(seconds)

		if (seconds < 9) {
			seconds++
			stopwatch.textContent = `${minutes}:0${seconds}`
		} else if (seconds >= 9 && seconds < 59) {
			seconds++
			stopwatch.textContent = `${minutes}:${seconds}`
		} else {
			minutes++
			seconds = 0
			stopwatch.textContent = `${minutes}:00`
		}
	}, 10)
}

const pause = () => {
	clearInterval(countTime)
}

const stop = () => {
	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`
	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible'
		timesArr.push(stopwatch.textContent)
	}

	clearStuff()
}

//Function, when the “stop” button is pressed, should reset the stopwatch, display the last time (“Last time: X:XX”) under the stopwatch digits, and add that time to the archive list


const reset = () => {
	time.style.visibility = 'hidden'
	timesArr = []
	clearStuff()
}

const clearStuff = () => {
	clearInterval(countTime)
	stopwatch.textContent = '0:00'
	archiveList.textContent = ''
	minutes = 0
	seconds = 0
}
const archive = params => {
	archiveList.textContent = ''

	let num = 1
	timesArr.forEach(time => {
		const newTime = document.createElement('li')
		newTime.innerHTML = `Pomiar nr ${num} : <span>${time}</span>`
		archiveList.appendChild(newTime)
		num++
	})
}
const modal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block'
	} else {
		modalShadow.style.display = 'none'
	}
   modalShadow.classList.toggle('modal-animation')
}

//LISTENERS SECTION

startButton.addEventListener('click', start)
pauseButton.addEventListener('click', pause)
stopButton.addEventListener('click', stop)
resetButton.addEventListener('click', reset)
archiveButton.addEventListener('click', archive)
infoIcon.addEventListener('click', modal)
closeModalBtn.addEventListener('click', modal)
window.addEventListener('click',e => e.target === modalShadow ? modal() : false)