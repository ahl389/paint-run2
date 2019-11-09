import React, { Component } from 'react';

import './App.scss';
import Level from './components/Level/Level.js';
import levels from './levels.js'

class Game extends Component {
	constructor(props){
		super(props);
		this.state = {
			level: 1,
			lives: 3
		};
	}
	
    /**
     * Updates the state of the Game component to set the level to 1, effectively restarting
     * the game.
     */
	restart() {
		this.setState({
			level: 1,
            lives: 3
		});
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
    
    /**
     * Calls appropriate update state functions when a level is won
     */
    levelWon() {
        this.updateLevel();
        this.updateLives(Math.min(this.state.lives + 2, 4))
    }
    
    /**
     * Calls appropriate update state functions when a level is lost
     */
    levelLost() {
        const newLives = this.state.lives - 1;
        newLives > 0 ? this.updateLives(newLives) : this.restart();
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
        let locationObjects = this.getLocationObjects(data);
        let flatLocs = locationObjects.reduce(function(a,b) { return a.concat(b);  });
        let validTiles = flatLocs.filter(loc => loc.type === 'tile');

		
		return {
			levelNum: this.state.level,
			//grid: data,
			rows: data.length,
			cols: data[0].length,
            gridObjects: locationObjects,
            validTileObjects: validTiles, 
			numTiles: validTiles.length,
			time: validTiles.length * 750,
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
    
	getLocationObjects(data) {
		let locationObjects = [];

		for (let y = 0; y < data.length; y++) {
			let row = data[y];
			let r = [];

			for (let x = 0; x < row.length; x++) {
				let type = row[x] ? 'tile' : 'space';
				let target = (x == 0 && y == 0) ? true: false;
				let touchedA = (x == 0 && y == 0) ? true: false;
				let touchedM = false;

				r.push({	x: x,
							y: y,
							type: type,
							target: target,
							touchedA: touchedA,
							touchedM: touchedM
						});
			}

			locationObjects.push(r)
		}

		return locationObjects;
	}

	getMonsterState(tiles) {
		const num = this.props.data.monsters;
		
		let monsters = [];
		let flat = tiles.reduce(function(a,b) { return a.concat(b);  });
		let potentialTargets = flat.filter(loc => loc.type === 'tile')

		for (let i = 0; i < num; i++) {
			const target = potentialTargets[
				Math.floor(Math.random() * this.props.data.numTiles/2)
				+ Math.floor(this.props.data.numTiles/2)
			];
			
			monsters.push({
				x: target.x,
				y: target.y,
				dir: 4,
				prevDir: 4,
				lives: 3,
				id: i
			});
		}
		
        console.log(monsters)
		return monsters;
	}

	render() {
		let updateLevel = this.updateLevel;
		let level = this.processLevelData();
		let restart = this.restart;
        let updateLives = this.updateLives;
        let levelWon = this.levelWon;
        let levelLost = this.levelLost;

		return (
			<div className = "body">
				<Level 
					data={level}
                    lives={this.state.lives}
					levelWon={levelWon.bind(this)}
                    levelLost={levelLost.bind(this)}/>
			</div>
		);
	}
}

export default Game;
