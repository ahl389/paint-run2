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
			newLevel: true
		};
	}
	
    /**
     * Updates the state of the App component to set the level to 1, effectively restarting
     * the game.
     */
	restart() {
		this.setState({
			level: 1
		});
	}
	
    /**
     * Reads level data from JSON level file and creates object containing robust level information
     * @return {Obj} Object holding information regarding the current level
     */
	processLevelData() {
		let currentLevelIndex = this.state.level - 1;
		if (currentLevelIndex >= levels.length) {
			// @TODO - no more levels, tell user they won!
			this.restart();
			currentLevelIndex = 0;
		}

		let data = levels[currentLevelIndex].tiles;
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
	
    /**
     * Calculates and returns number of monsters for a given level
     * @return {number} Number of monsters in the level
     */
	getMonsterNum() {
		if (this.state.level > 4) {
			return Math.floor(this.state.level/5 + 5)
		} else if (this.state.level > 3) {
			return this.state.level - 1;
		} else {
			return this.state.level;
		}
	}

    /**
     * Updates state of the App component to increase the level of the user
     */
	increaseLevel() {
		this.setState({
			level: this.state.level+1
		});
	}

	render() {
		let increaseLevel = this.increaseLevel;
		let level = this.processLevelData();
		let restart = this.restart;

		return (
			<div className = "body">
				<Game 
					gameOver={false}
					level={level}
					increaseLevel={increaseLevel.bind(this)}
					restart={restart.bind(this)}/>
			</div>
		);
	}
}

export default App;
