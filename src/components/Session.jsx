import React from 'react'
import moment from 'moment'

const Session = ({sessionLength, decreaseSessionLength, increaseSessionLength}) => {

	const sessionLengthInMinutes = moment.duration(sessionLength, 's').asMinutes()

	return (
		<div>
			<h3 id="session-label">Session</h3>
            <div className="controls">
                <button id="session-decrement" onClick={decreaseSessionLength}>-</button>
                <h4 id="session-length">{sessionLengthInMinutes}</h4>
                <button id="session-increment" onClick={increaseSessionLength}>+</button>
            </div>
		</div>
	)
}

export default Session