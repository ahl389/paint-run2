import React, { Component } from 'react'; 

class Monster extends Component {
	render(){
		var classes = `monster dir${this.props.prevDir}`;
		return (
			<div className = {classes} data-x={this.props.x} data-y={this.props.y} data-prevdir={this.props.prevDir} data-id={this.props.mon.id}>M</div>
		)
	}
}

export default Monster;