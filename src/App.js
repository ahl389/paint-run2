import React, { Component } from 'react';

import './App.css';
import './Tile.css';
import './button.css';
import './Tutorial.css';
import Game from './Game.js';
import levels from './levels.js'

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			level: 1,
		}
	}
	
	restart(){
		this.setState({
			level: 1
		})
	}
	
	processLevelData(){
		console.log(this.state.level - 1)
		var data = levels[this.state.level - 1]
		return {
			...data,
			levelNum: this.state.level,
			rows: data.grid.length,
			cols: data.grid[0].length,
			tiles: data.path.length,
			time: data.path.length * 750,
			monsters: this.state.level + 1
		}
	}

	
	increaseLevel(){
		this.setState({
			level: this.state.level+1
		});
	}
	 
	render() {
		var increaseLevel = this.increaseLevel;
		var level = this.processLevelData();
		var restart = this.restart;
		
		return (
			<div className = "body">
		      <Game 
				gameOver={false}
				newLevel={true}
				level={level}
				increaseLevel={increaseLevel.bind(this)}
				restart={restart.bind(this)}/>
			</div>
		);
	}
}


export default App;

