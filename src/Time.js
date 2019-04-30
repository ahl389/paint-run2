import React, { Component } from 'react'; 

class Time extends Component {
	constructor(props) {
		super(props);
		this.state = {
			endTime: new Date().getTime() + parseInt(this.props.time),
			remaining: Math.ceil(parseInt(this.props.time)/1000)
		}
		
		this.countdown = this.countdown.bind(this)
	}
	
	componentDidMount(){	
		this.timer = setInterval(this.countdown, 1000)
	}

	componentWillUnmount(){
		clearInterval(this.timer);
	}
	
	countdown() {
		var now = new Date().getTime();
		var remaining = Math.ceil( (parseInt(this.state.endTime) - now)/1000 );
		var endLevel = this.props.endLevel;
		
		this.setState({
			remaining: remaining
		});
		
		if (remaining < 0) {
			endLevel();
		}
	}
	
	render(){
		var classes = 'countdown-timer flasher';
		var color = '#4d807f';
		
		if (this.state.remaining <= 3) {
			color = 'red'
		}
		
		return(
			<div className="time"><span className={classes} style={{color: color}}>{this.state.remaining}</span><br></br>seconds</div>
		);
	}
}

export default Time;