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
		};
	}
	
	restart(){
		console.log('App: restart');
		this.setState({
			level: 1
		});
	}
	
	processLevelData() {
		console.log('App: processLevelData');
		let data = levels[this.state.level - 1].tiles;
		let tiles = data.reduce(function(a,b) { return a.concat(b);  })
  	 				.filter(function(elem) { return elem })
					.length;

		return {
			levelNum: this.state.level,
			grid: data,
			rows: data.length,
			cols: data[0].length,
			tiles: tiles,
			time: tiles * 750,
			monsters: this.getMonsterNum()
		};
	}
	
	getMonsterNum() {
		console.log('App: getMonsterNum');
		if (this.state.level > 4) {
			return Math.floor(this.state.level/5 + 5)
		} else if (this.state.level > 3) {
			return this.state.level - 1;
		} else {
			return this.state.level;
		}
	}

	increaseLevel() {
		console.log('App: increaseLevel');
		this.setState({
			level: this.state.level+1
		});
	}

	render() {
		let increaseLevel = this.increaseLevel;
		let level = this.processLevelData();
		let restart = this.restart;
		console.log('App: render: gameOver:false newLevel:false level:' + level);

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
