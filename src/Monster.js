import React, { Component } from 'react'; 

class Monster extends Component {
	render(){
		const mon = this.props.mon;
		const classes = `monster prevDir${mon.prevDir} dir${mon.dir}`;
		return (
			<div className = {classes} data-x={this.props.x} data-y={this.props.y} data-prevdir={mon.dir} data-id={this.props.mon.id}></div>
		)
	}
}

export default Monster;