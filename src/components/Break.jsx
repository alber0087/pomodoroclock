import React, { useState } from 'react'
import moment from 'moment'

const Break = () => {
	const [breakLength, setBreakLength] = useState(300)

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

	const breakLengthInMinutes = moment.duration(breakLength, 's').minutes()

	return (
		<div>
			<h3 id="break-label">Break</h3>
			<div className="controls">
				<button id="break-decrement" onClick={decreaseBreakLength}>-</button>
				<div id="break-length">{breakLengthInMinutes}</div>
				<button id="break-increment" onClick={increaseBreakLength}>+</button>
			</div>
		</div>
	)
}

export default Break