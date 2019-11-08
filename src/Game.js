import React, { Component } from 'react';

import './App.css';
import './Tile.css';
import './button.css';
import './Tutorial.css';
import Level from './Level.js';
import levels from './levels.js'

class Game extends Component {
	constructor(props){
		super(props);
		this.state = {
			level: 1,
			lives: 3,
			newLevel: true
		};
	}
	
    /**
     * Updates the state of the Game component to set the level to 1, effectively restarting
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
     * Updates state of the Game component to update the level of the user
     */
	updateLevel() {
		this.setState({
			level: this.state.level+1
		});
	}
    
    /**
     * Updates state of the Game component to change the number of lives remaining
     */
	updateLives(lives) {
		this.setState({
			lives: lives
		});
	}

	render() {
		let updateLevel = this.updateLevel;
		let level = this.processLevelData();
		let restart = this.restart;
        let updateLives = this.updateLives;

		return (
			<div className = "body">
				<Level 
					inPlay={false}
					data={level}
                    lives={this.state.lives}
					updateLevel={updateLevel.bind(this)}
					restart={restart.bind(this)}
                    updateLives={updateLives.bind(this)}/>
			</div>
		);
	}
}

export default Game;
