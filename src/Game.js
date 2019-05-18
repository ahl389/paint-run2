import React, { Component } from 'react';
import Board from './Board.js';
import Tutorial from './Tutorial.js';

const gameName    = 'Paint Run';
const gameVersion = '1.0.4';
const gameHome    = 'https://github.com/ahl389/paint-run2';

class Game extends Component {
	/**
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			name: gameName,
			version: gameVersion,
			home: gameHome,
			lives: 3,
			gameOver: true,
			buttonMessage: "Begin Game!",
			seconds: this.props.level.time,
			statusCode: 'new-game',
			statusMessage: 'Paint Run',
			tutorial: false
		};
		
		//this.monsters = this.getInitialMonsterState(this.props.tiles)
		this.endLevel = this.endLevel.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	/**
	 * @param e
	 */
	handleClick(e) {
		const statusCode = e.target.getAttribute('data-statuscode');
		this.handleUserDidSomething(statusCode);
	}

	/**
	 * @param e
	 */
	handleKeyPress(e) {
		const statusCode = this.state.statusCode;
		switch (e.key) {
			default:
				break;
			case ' ':      // Spacebar
			case 'Enter':  // Enter/Return key
			case 'n':
			case 'N':
				this.handleUserDidSomething(statusCode);
				break;
		}
	}

	/**
	 * @param statusCode
	 */
	handleUserDidSomething(statusCode) {
		if (statusCode === 'new-game') {
			this.setState({
				gameOver: false
			});
		} else if (statusCode === 'same-level') {
			this.setState({
				gameOver: false,
				touched: 1
			});
		} else if (statusCode === 'next-level') {
			let il = this.props.increaseLevel;
			il();

			this.setState({
				lives: Math.min(this.state.lives + 2, 4),
				gameOver: false,
				touched: 1
			});
		} else if (statusCode === 'restart') {
			this.setState({
				lives: 3,
				gameOver: false,
				touched: 1
			});

			let restart = this.props.restart;
			restart();
		}
	}

	/**
	 * @param gameOver
	 * @param sm
	 * @param bm
	 * @param sc
	 * @param lives
	 */
	updateGameStatus(gameOver, sm, bm, sc, lives = this.state.lives) {
		this.setState({
			gameOver: gameOver,
			statusMessage: sm,
			buttonMessage: bm,
			lives: lives,
			statusCode: sc
		});
	}

	endLevel() {
		const lives = this.state.lives - 1;
		const gameOver = true;

		let sm = '';
		let bm ='';
		let sc = '';
		if (lives > 0) {
			sm = `Out of time, you have ${lives} lives remaining!`;
			bm = 'Try again.';
			sc = 'same-level';
		} else {
			sm = `Game Over`;
			bm = 'Play again';
			sc = 'restart';
		}
		
		this.updateGameStatus(gameOver, sm, bm, sc, lives)
	}

	/**
	 * @param locs
	 * @returns {Array}
	 */
	getTileState(locs) {
		const rd = this.props.level.grid;
		let tiles = [];

		for (let y = 0; y < rd.length; y++) {
			let row = rd[y];
			let r = [];

			for (let x = 0; x < row.length; x++) {
				let type = row[x] ? 'tile' : 'space';
				let target = false;
				let touchedA = false;
				let touchedM = false;
				
				for (let loc of locs) {
					if (loc.x === x && loc.y === y) {
						if (loc.t === 'a') {
							touchedA = true;
							target = true;
						} else {
							touchedM = true;
						}
					}
				}

				r.push({	x: x,
							y: y,
							type: type,
							target: target,
							touchedA: touchedA,
							touchedM: touchedM
						});
			}

			tiles.push(r)
		}

		return tiles;
	}

	/**
	 * @param tiles
	 * @returns {Array}
	 */
	getMonsterState(tiles) {
		let monsters = [];
		const num = this.props.level.monsters;
		let flat = tiles.reduce(function(a,b) { return a.concat(b);  });

		for (let i = 0; i < num; i++) {
			const target = flat[
				Math.floor(Math.random() * this.props.level.tiles/2)
				+ Math.floor(this.props.level.tiles/2)
			];
			
			monsters.push({
				mtargetx: target.x,
				mtargety: target.y,
				dir: 4,
				prevDir: 4,
				lives: 3,
				id: i
			});
		}
		
		return monsters;
	}

	/**
	 * @returns {*}
	 */
	render() {
		let locs = [{t:'a', x:0, y:0}];
		const tileState = this.getTileState(locs);
		const monsterState = this.getMonsterState(tileState);

		const gameOver = this.state.gameOver;
		if (gameOver) {
			// turn on keyPress event listener
			document.addEventListener("keydown", this.handleKeyPress);
		} else {
			document.removeEventListener("keydown", this.handleKeyPress);
		}

		const level = this.props.level;
		const ugs = this.updateGameStatus;
		const endLevel = this.endLevel;

		return (
			<div className="game-board">
				<div className = "header-content">
					<div className="level">
						<h1>Level {level.levelNum}</h1>
						<Tutorial/>
						
					</div>
					
					<div className = "about">
						<a href={this.state.home} target="_blank" rel="noopener noreferrer">{this.state.name} v{this.state.version}</a>
					</div>
				</div>
				<div className = "clear"></div>

				{ ! gameOver 
				  ? <Board
						monsters={monsterState}
						rowData={tileState}
						lives={this.state.lives}
						tileCount={level.tiles}
						level={this.props.level}
						time={this.props.level.time}
						endLevel={endLevel.bind(this)}
						updateGameStatus={ugs.bind(this)}
						/> 
		  		  : <div className = "gameover">
						<h1>{this.state.statusMessage}</h1>
						<button
							className="button"
							onClick={this.handleClick}
							data-statuscode={this.state.statusCode}>
				        	{this.state.buttonMessage}
				     	</button>
					</div>
				}
			</div>
		);
	}	
}

export default Game;
