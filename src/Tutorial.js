import React, { Component } from 'react'; 

class Tutorial extends Component {
	constructor(props){
		super(props);
		this.state = {
			show: false
		};
		
		this.showTutorial = this.showTutorial.bind(this);
	}
	
	showTutorial(){
		this.setState({
			show: !this.state.show
		});
	}
	
	render(){
		return(
			<div className="tcontainer">
				<div className="tbutton" onClick={this.showTutorial}>See tutorial</div>
				{ !this.state.show 
				  ?	''
				  : <div className="tutorial">
						<h3>Objective</h3>
						<p>Turn all the tiles blue before the timer runs out.</p>
						<h3>Movement</h3>
						<p>You're the blue dot, on the blue tile in the top left corner. Move with your arrow keys - every tile you touch will turn blue.</p>
						<h3>Watch Out</h3>
						<p>Opposing forces are turning tiles gold. Undo their work by moving over them. If you touch your rivals three times, they disappear.</p>
					</div> 
				}
			</div>

		);
	}
}

export default Tutorial;