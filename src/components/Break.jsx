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
			<div id="break-label">Break</div>
			<div id="break-length">{breakLengthInMinutes}</div>
			<button id="break-decrement" onClick={decreaseBreakLength}>-</button>
			<button id="break-increment" onClick={increaseBreakLength}>+</button>
		</div>
	)
}

export default Break