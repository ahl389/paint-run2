import React, { Component } from 'react'; 

class Button extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	render() {
		return (
			<div className = "button">
				{this.props.message}
			</div>
		)
	}
	
	handleClick(){
		var restart = this.props.restart;
		restart();
	}
	
	componentDidMount(){
		document.addEventListener("click", this.handleClick, false);
	}	
}

export default Button;