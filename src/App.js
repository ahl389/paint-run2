import React, { Component } from 'react';

import './App.css';
import './Tile.css';
import './button.css';
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
		var data = levels[this.state.level - 1].tiles
		var tiles = data.reduce(function(a,b) { return a.concat(b);  })
  	 				.filter(function(elem) { return elem })
					.length;
		
		var level = {
			levelNum: this.state.level,
			grid: data,
			rows: data.length,
			cols: data[0].length,
			tiles: tiles,
			time: tiles * 750,
			monsters: this.state.level + 1
		}
	
		return level;
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

