import React, { Component } from 'react'; 

class Tutorial extends Component {
	render(){
		return(
			<div className="tutorial">
				<h3>Objective</h3>
				<p>Turn all the tiles blue before the timer runs out.</p>
				<h3>Movement</h3>
				<p>Move with your arrow keys - every tile you touch will turn blue.</p>
				<h3>Watch Out</h3>
				<p>Opposing forces are turning tiles gold. Undo their work by moving over them. If you touch your rivals three times, they disappear.</p>
			</div>
		);
	}
}

export default Tutorial;