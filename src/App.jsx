import { useEffect, useState } from 'react'
import Break from './components/Break'
import Session from './components/Session'
import './style.css'

function App() {

	const [breakLength, setBreakLength] = useState(300)
	const [sessionLength, setSessionLength] = useState(60 * 25)
	
	const decreaseBreakLength = () => {
		const newBreakLength = breakLength - 60
		if (newBreakLength < 0) {
			setBreakLength(0)
		} else {
			setBreakLength(newBreakLength)
		}
	}

	const increaseBreakLength = () => {
		setBreakLength(breakLength + 60)
	}

	const decreaseSessionLength = () => {
		const newSessionLength = sessionLength - 60
		if (newSessionLength < 0) {
			setSessionLength(0)
		} else {
			setSessionLength(newSessionLength)
		}
	}

	const increaseSessionLength = () => {
		setSessionLength(sessionLength + 60)
	}


	const [timeLeft, setTimeLeft] = useState(1500)
	const [timingType, setTimingType] = useState("SESSION")

	const [play, setPlay] = useState(false)

	const timeout = setTimeout(() => {
		if (timeLeft && play) {
			setTimeLeft(timeLeft - 1)
		}
	}, 1000)

	const handleReset = () => {
		clearTimeout(timeout)
		setPlay(false)
		setTimeLeft(1500)
		setBreakLength(5)
		setSessionLength(25)
		setTimingType("SESSION")
		const audio = document.getElementById("beep")
		audio.pause()
		audio.currentTime = 0
	}

	const handlePlay = () => {
		clearTimeout(timeout)
		setPlay(!play)
	}

	const resetTimer = () => {
		const audio = document.getElementById("beep")
		if (!timeLeft && timingType === "SESSION") {
			setTimeLeft(breakLength * 60)
			setTimingType("BREAK")
			audio.play()
		}
		if (!timeLeft && timingType === "BREAK") {
			setTimeLeft(sessionLength * 60)
			setTimingType("SESSION")
			audio.pause()
			audio.currentTime = 0
		}
	}

	const clock = () => {
		if (play) {
			timeout
			resetTimer()
		} else {
			clearTimeout(timeout)
		}
	}

	useEffect(() => {
		clock()
	}, [play, timeLeft, timeout])

	const timeFormatter = () => {
		const minutes = Math.floor(timeLeft / 60)
		const seconds = timeLeft - minutes * 60
		const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
		const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
		return `${formattedMinutes}:${formattedSeconds}`
	}

	const title = timingType === "SESSION" ? "Session" : "Break"

	return (
		<div>
			<div className="wrapper">
			
				<h2>Pomodoro Clock</h2>

				<div className="break-session-length">
					<Break 
						breakLength={breakLength}
						decreaseBreakLength={decreaseBreakLength}
						increaseBreakLength={increaseBreakLength}
					/>
					<Session 
						sessionLength={sessionLength}
						decreaseSessionLength={decreaseSessionLength}
						increaseSessionLength={increaseSessionLength}
					/>
				</div>

				<div className="timer-wrapper">
					<div className="timer">
						<h2 id="timer-label">{title}</h2>
						<h3 id="time-left">{timeFormatter()}</h3>
					</div>
					<button onClick={handlePlay} id="start_stop">Start/Stop</button>
					<button onClick={handleReset} id="reset">Reset</button>
				</div>

			</div>

			<audio
				id="beep" 
				preload="auto"
				src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
			/>

		</div>
	)
}

export default App
