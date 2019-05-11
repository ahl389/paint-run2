import React, { Component } from 'react';
import Board from './Board.js';
import Time from './Time.js';
import Tutorial from './Tutorial.js';

const gameName    = 'Paint Run';
const gameVersion = '1.0.3';
const gameHome    = 'https://github.com/ahl389/paint-run2';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: gameName,
			version: gameVersion,
			home: gameHome,
			lives: 3,
			gameOver: true,
			touched: 1,
			buttonMessage: "Begin Game!",
			seconds: this.props.level.time,
			statusCode: 'new-game',
			statusMessage: 'Paint Run',
			tutorial: false
		};

		this.endLevel = this.endLevel.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleClick(e) {
		const statusCode = e.target.getAttribute('data-statuscode');
		console.log('Game: handleClick: ' + statusCode);
		this.handleUserDidSomething(statusCode);
	}

	handleKeyPress(e) {
		const statusCode = this.state.statusCode;
		console.log('Game: handleKeyPress: e.key: ' + e.key + '  statusCode: ' + statusCode);
		switch (e.key) {
			default:
				break;
			case ' ': // Spacebar
			case 'Enter':
				this.handleUserDidSomething(statusCode);
				break;
		}
	}

	handleUserDidSomething(statusCode) {
		console.log('Game: handleUserDidSomething: ' + statusCode);
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

	updateGameStatus(gameOver, sm, bm, sc, lives=this.state.lives) {
		this.setState({
			gameOver: gameOver,
			statusMessage: sm,
			buttonMessage: bm,
			lives: lives,
			statusCode: sc
		});
	}

	updateTouchCount() {
		this.setState({
			touched: parseInt(this.state.touched) + 1
		});
	
		this.checkForWin();
	}

	lowerTouchCount() {
		this.setState({
			touched: parseInt(this.state.touched) - 1
		});
	}

	checkForWin() {
		if (this.state.touched === this.props.level.tiles) {
			this.updateGameStatus(true, "Level Won", "Next Level", 'next-level')
		} 
	}

	endLevel() {
		console.log('Game: endLevel');
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

		//console.log('getTileState: ' + JSON.stringify(tiles));
		return tiles;
	}

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

	render() {
		let locs = [{t:'a', x:0, y:0}];
		const tileState = this.getTileState(locs);
		const monsterState = this.getMonsterState(tileState);

		for (let monster of monsterState) {
			locs.push({t:'m', x:monster.mtargetx, y:monster.mtargety})
		}

		const gameOver = this.state.gameOver;
		if (gameOver) {
			// turn on keyPress event listener
			document.addEventListener("keydown", this.handleKeyPress);
		} else {
			document.removeEventListener("keydown", this.handleKeyPress);
		}

		const level = this.props.level;

		const ut = this.updateTouchCount;
		const ltc = this.lowerTouchCount;
		const endLevel = this.endLevel;

		return (
			<div className="game-board">
				<div className = "header-content">
					<div className="level">
						<h1>Level {level.levelNum}</h1>
						<Tutorial/>
						
					</div>
					<div className = "details-tab">
						<div className="lives">{this.state.lives}<br></br><span>lives</span></div>
						<div className="status">{this.state.touched}/{level.tiles}<br></br><span>tiles</span></div>
						{ ! gameOver ? <Time time={this.props.level.time} endLevel={endLevel.bind(this)}/> : '' }
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
						updateTouchCount={ut.bind(this)}
						lowerTouchCount={ltc.bind(this)}
						level={this.props.level}
						/> 
		  		  : <div className = "gameover">
						<h1>{this.state.statusMessage}</h1>
						<button
							className="button"
							onClick={this.handleClick}
							data-statuscode={this.state.statusCode}
						>
				        	{this.state.buttonMessage}
				     	</button>
					</div>
				}
			</div>
		);
	}	
}

export default Game;
