import { useState, useEffect, useRef } from 'react'
import Break from './components/Break'
import Session from './components/Session'
import TimeLeft from './components/TimeLeft'
import './style.css'

function App() {
	const audioElement = useRef(null)
	const [currentSessionType, setCurrentSessionType] = useState('Session') // 'Session' or 'Break'
	const [intervalId, setIntervalId] = useState(null)
	const [breakLength, setBreakLength] = useState(300)
	const [sessionLength, setSessionLength] = useState(60 * 25)
	const [timeLeft, setTimeLeft] = useState(sessionLength)

	// change timeLeft whenever sessionLength changes
	useEffect(() => {
		setTimeLeft(sessionLength)
	}, [sessionLength])
	
	const decreaseBreakLength = () => {
		const newBreakLength = breakLength - 60
		if (newBreakLength > 0) {
			setBreakLength(newBreakLength)
		}
	}

	const increaseBreakLength = () => {
		const newBreakLength = breakLength + 60
		if (newBreakLength <= 60 * 60) {
			setBreakLength(newBreakLength)
		}
	}

	const decreaseSessionLength = () => {
		const newSessionLength = sessionLength - 60
		if (newSessionLength > 0) {
			setSessionLength(newSessionLength)
		}
	}

	const increaseSessionLength = () => {
		const newSessionLength = sessionLength + 60
		if (newSessionLength <= 60 * 60) {
			setSessionLength(newSessionLength)
		}
	}

	const isStarted = intervalId !== null
	const handleStartStopClick = () => {
		if (isStarted) {
		// if we are in started mode:
		// we want to stop the timer
		//clearInterval	
			clearInterval(intervalId)
			setIntervalId(null)
		} else {
		// if we are in stopped mode:
		// decrement timeLeft by one every second (1000ms)
		// to do this we'll use setInterval
			const newIntervalId = setInterval(() => {
				setTimeLeft(prevTimeLeft => {
					const newTimeLeft = prevTimeLeft - 1
					if (newTimeLeft >= 0) {
						return newTimeLeft
					}
					// time left is less than 0
					audioElement.current.play()
					// if session:
					if (currentSessionType === 'Session') {
					// switch to break
						setCurrentSessionType('Break')
					// setTimeLeft to breakSessionLength
						return breakLength
					}
					// if break:
					else if (currentSessionType === 'Break') {
					// switch to session
						setCurrentSessionType('Session')
					// setTimeLeft to sessionLength
						return sessionLength
					}
				})
			}, 100)
			setIntervalId(newIntervalId)
		}
	}

	const handleReset = () => {
		// reset audio
		audioElement.current.load()
		// clear the timeout interval
		clearInterval(intervalId)
		// set the intervalId null
		setIntervalId(null)
		// set the sessionType to 'Session'
		setCurrentSessionType('Session')
		// reset the session length to 25 min
		setSessionLength(25 * 60)
		// reset the break length to 5 min
		setBreakLength(5 * 60)
		// reset the timer to 25 min (initial session length)
		setTimeLeft(60 * 25)
	}

	return (
		<div>
			<div className="wrapper">
			
				<h1>Pomodoro Clock</h1>

				<div className="break-session-length">
					<Session 
						sessionLength={sessionLength}
						decreaseSessionLength={decreaseSessionLength}
						increaseSessionLength={increaseSessionLength}
					/>
					<Break 
						breakLength={breakLength}
						decreaseBreakLength={decreaseBreakLength}
						increaseBreakLength={increaseBreakLength}
					/>
				</div>

				<div className="timer-wrapper">
					<div className="timer">
						<TimeLeft
							timerLabel={currentSessionType}
							handleStartStopClick={handleStartStopClick}
							startStopButton={isStarted ? 'Stop' : 'Start'}
							timeLeft={timeLeft}
						/>
					</div>
					<button id="reset" className="reset" onClick={handleReset}>Reset</button>
				</div>

			</div>

			<audio
				id="beep" 
				ref={audioElement}
				src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
			/>

		</div>
	)
}

export default App
