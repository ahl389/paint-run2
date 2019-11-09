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
		let validTileObjects = flatLocs.filter(loc => loc.type === 'tile');
		let monsterObjects = this.getMonsterObjects(validTileObjects);

		
		return {
			levelNum: this.state.level,
			rows: data.length,
			cols: data[0].length,
            locationObjects: locationObjects,
			validTileObjects: validTileObjects,
			monsterObjects: monsterObjects, 
			numTiles: validTileObjects.length,
			time: validTileObjects.length * 750
		};
	}
	
    /**
     * Calculates and returns number of monsters for a given level
     * @return {number} Number of monsters in the level
     */
	getNumMonsters() {
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

	getMonsterObjects(tiles) {
		const num = this.getNumMonsters();
		
		let monsters = [];
		
		for (let i = 0; i < num; i++) {
			// generate random location to render monster
			const target = tiles[
				Math.floor(Math.random() * tiles.length/2)
				+ Math.floor(tiles.length/2)
			];
			
			// create monster object
			monsters.push({
				x: target.x,
				y: target.y,
				dir: 4,
				prevDir: 4,
				lives: 3,
				id: i
			});
		}

		return monsters;
	}

	render() {
		let level = this.processLevelData();
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
