import React, { Component } from 'react'; 

class Avatar extends Component {
	render() {
		return (
			<div className = "avatar" data-x={this.props.x} data-y={this.props.y}></div>
		)
	}	
}

export default Avatar;
