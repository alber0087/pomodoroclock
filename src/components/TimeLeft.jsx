import React from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

const TimeLeft = ({ 
	timerLabel, 
	handleStartStopClick, 
	startStopButton,
	timeLeft 
}) => {

	const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false })
	return (
		<>
			<h2 id="timer-label">{timerLabel}</h2>
			<h3 id="time-left">{formattedTimeLeft}</h3>
			<button onClick={handleStartStopClick}>
				{startStopButton}
			</button>
		</>
	)
}

export default TimeLeft