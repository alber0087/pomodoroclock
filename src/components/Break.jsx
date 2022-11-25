import React from 'react'
import moment from 'moment'

const Break = ({breakLength, decreaseBreakLength, increaseBreakLength}) => {

	const breakLengthInMinutes = moment.duration(breakLength, 's').minutes()

	return (
		<div>
			<h3 id="break-label">Break</h3>
			<div className="controls">
				<button id="break-decrement" onClick={decreaseBreakLength}>-</button>
				<h4 id="break-length">{breakLengthInMinutes}</h4>
				<button id="break-increment" onClick={increaseBreakLength}>+</button>
			</div>
		</div>
	)
}

export default Break