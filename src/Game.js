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
	
	componentDidMount() {
		console.log('Game: componentDidMount: addEventListener: keydown');
		document.addEventListener("keydown", this.handleKeyPress);
    }

	componentWillUnmount() {
		console.log('Game: componentWillUnmount: removeEventListener: keydown');
		document.removeEventListener("keydown", this.handleKeyPress);
		console.log('unmounted!')
	}

	handleClick(e) {
		const statusCode = this.state.statusCode;
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


	endLevel() {
		console.log('Game: endLevel');
		const lives = this.state.lives - 1;
		const gameOver = true;

		let sm = '';
		let bm ='';
		let sc = '';
		if (lives === 0) {
            		sm = `Out of time, you have 1 life remaining!`;
            		bm = 'Try again.';
            		sc = 'same-level';
		} else if (lives > 0) {
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
		const grid = this.props.level.grid;
		let tileState = [];

		for (let y = 0; y < grid.length; y++) {
			let row = grid[y];
			let r = [];

			for (let x = 0; x < row.length; x++) {
				let type = row[x] ? 'tile' : 'space';
				let target = (x == 0 && y == 0) ? true: false;
				let touchedA = (x == 0 && y == 0) ? true: false;
				let touchedM = false;
				
				
				
				// for (let loc of locs) {
// 					if (loc.x === x && loc.y === y) {
// 						if (loc.t === 'a') {
// 							touchedA = true;
// 							target = true;
// 						} else {
// 							touchedM = true;
// 						}
// 					}
// 				}

				r.push({	x: x,
							y: y,
							type: type,
							target: target,
							touchedA: touchedA,
							touchedM: touchedM
						});
			}

			tileState.push(r)
		}

		return tileState;
	}

	getMonsterState(tiles) {
		const num = this.props.level.monsters;
		
		let monsters = [];
		let flat = tiles.reduce(function(a,b) { return a.concat(b);  });
		let potentialTargets = flat.filter(loc => loc.type == 'tile')

		for (let i = 0; i < num; i++) {
			const target = potentialTargets[
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
		const initialTiles = this.getTileState(this.props.level.grid);
		const initialMonsters = this.getMonsterState(initialTiles);

		const ugs = this.updateGameStatus;
		const endLevel = this.endLevel;

		return (
			<div className="game-board">
				<div className = "header-content">
					<div className="level">
						<h1>Level {this.props.level.levelNum}</h1>
						<Tutorial/>
					</div>
					
					<div className = "about">
						<a href={this.state.home} target="_blank" rel="noopener noreferrer">{this.state.name} v{this.state.version}</a>
					</div>
				</div>
				<div className = "clear"></div>

				{ ! this.state.gameOver 
				  ? <Board
						monsters={initialMonsters}
						tiles={initialTiles}
						lives={this.state.lives}
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
