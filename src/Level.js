import React, { Component } from 'react';
import Board from './Board.js';
import Time from './Time.js';
import Tutorial from './Tutorial.js';

const gameName    = 'Paint Run';
const gameVersion = '1.0.4';
const gameHome    = 'https://github.com/ahl389/paint-run2';

class Level extends Component {
	constructor(props) {
		super(props);
        
		this.state = {
            // name: gameName,
            // version: gameVersion,
            // home: gameHome,
            
            inPlay: false,
            messaging: {
                statusCode: 'new-game',
                buttonMessage: "Begin Game!",
    			statusMessage: 'Paint Run',
            },
			seconds: this.props.data.time
		};
		
        // Bind this to methods
		this.endLevel = this.endLevel.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	componentDidMount() {
        // Add event listener to keyboard
		document.addEventListener("keydown", this.handleKeyPress);
    }

	componentWillUnmount() {
        // Remove event listener from keyboard
		document.removeEventListener("keydown", this.handleKeyPress);
	}

	handleClick() {
		this.handleUserAction(this.state.messaging.statusCode);
	}

	handleKeyPress(e) {
		const statusCode = this.state.messaging.statusCode;
		//console.log('Game: handleKeyPress: e.key: ' + e.key + '  statusCode: ' + statusCode);
		switch (e.key) {
			default:
				break;
			case ' ':     // Spacebar
			case 'Enter': // Enter/Return key
				this.handleUserAction(statusCode);
				break;
		}
	}

	handleUserAction(statusCode) {
		if (statusCode === 'new-game') {
			this.setState({
				inPlay: true
			});
		} else if (statusCode === 'same-level') {
			this.setState({
				inPlay: true,
				touched: 1
			});
		} else if (statusCode === 'next-level') {
			let updateLevel = this.props.updateLevel;
			updateLevel();

			this.setState({
				lives: Math.min(this.state.lives + 2, 4),
				inPlay: false,
				touched: 1
			});
		} else if (statusCode === 'restart') {
			this.setState({
				lives: 3,
				inPlay: false,
				touched: 1
			});

			let restart = this.props.restart;
			restart();
		}
	}

	updateGameStatus(inPlay, sm, bm, sc, lives=this.props.lives) {
		this.setState({
			inPlay: inPlay,
            messaging: {
    			statusMessage: sm,
    			buttonMessage: bm,
    			statusCode: sc
            },
			lives: lives
		});
        
        let updateLives = this.props.updateLives;
        updateLives(lives);
	}


	endLevel() {
		const lives = this.props.lives - 1;
		const inPlay = false;

		let sm = '';
		let bm ='';
		let sc = '';
        
		if (lives === 1) {
    		sm = `Out of time, you have 1 life remaining!`;
    		bm = 'Try again.';
    		sc = 'same-level';
		} else if (lives > 1) {
			sm = `Out of time, you have ${lives} lives remaining!`;
			bm = 'Try again.';
			sc = 'same-level';
		} else {
			sm = `Game Over`;
			bm = 'Play again';
			sc = 'restart';
		}
		
		this.updateGameStatus(inPlay, sm, bm, sc, lives)
	}
	
	getTileState(locs) {
		const grid = this.props.data.grid;
		let tileState = [];

		for (let y = 0; y < grid.length; y++) {
			let row = grid[y];
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

			tileState.push(r)
		}

		return tileState;
	}

	getMonsterState(tiles) {
		const num = this.props.data.monsters;
		
		let monsters = [];
		let flat = tiles.reduce(function(a,b) { return a.concat(b);  });
		let potentialTargets = flat.filter(loc => loc.type == 'tile')

		for (let i = 0; i < num; i++) {
			const target = potentialTargets[
				Math.floor(Math.random() * this.props.data.tiles/2)
				+ Math.floor(this.props.data.tiles/2)
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
		const initialTiles = this.getTileState(this.props.data.grid);
		const initialMonsters = this.getMonsterState(initialTiles);

		const ugs = this.updateGameStatus;
		const endLevel = this.endLevel;

		return (
			<div className="game-board">
				<div className = "header-content">
					<div className="level">
						<h1>Level {this.props.data.levelNum}</h1>
						<Tutorial/>
					</div>
					
					<div className = "about">
						<a href={this.state.home} target="_blank" rel="noopener noreferrer">{this.state.name} v{this.state.version}</a>
					</div>
				</div>
				<div className="clear"></div>

				{ this.state.inPlay 
				  ? <Board
						monsters={initialMonsters}
						tiles={initialTiles}
						lives={this.props.lives}
						level={this.props.data}
						time={this.props.data.time}
						endLevel={endLevel.bind(this)}
						updateGameStatus={ugs.bind(this)}
						/> 
		  		  : <div className = "gameover">
						<h1>{this.state.messaging.statusMessage}</h1>
						<button
							className="button"
							onClick={this.handleClick}
							data-statuscode={this.state.messaging.statusCode}>
				        	{this.state.messaging.buttonMessage}
				     	</button>
					</div>
				}
			</div>
		);
	}	
}

export default Level;
