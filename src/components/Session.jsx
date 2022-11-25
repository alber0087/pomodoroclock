import React, { useState } from 'react'
import moment from 'moment'

const Session = () => {
	const [sessionLength, setSessionLength] = useState(60 * 25)

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

	const sessionLengthInMinutes = moment.duration(sessionLength, 's').minutes()

	return (
		<div>
			<h3 id="session-label">Session</h3>
            <div className="controls">
                <button id="session-decrement" onClick={decreaseSessionLength}>-</button>
                <div id="session-length">{sessionLengthInMinutes}</div>
                <button id="session-increment" onClick={increaseSessionLength}>+</button>
            </div>
		</div>
	)
}

export default Session