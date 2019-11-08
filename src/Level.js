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
                buttonMessage: "Begin Game!",
    			statusMessage: 'Paint Run',
            }
		};
		
        // Bind this to methods
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
		this.resumePlay();
	}

	handleKeyPress(e) {
		switch (e.key) {
			case ' ':     // Spacebar
			case 'Enter': // Enter/Return key
				this.resumePlay();
				break;
			default:
				break;
		}
	}
    
    resumePlay() {
		this.setState({
			inPlay: true
		});
    }

	pausePlay(messaging) {
		this.setState({
			inPlay: false,
            messaging: messaging
		});
	}
    
    updateGame(statusCode) {
        if (statusCode == 'level-won') {
            this.pausePlay({ buttonMessage: "Next Level", statusMessage: "Level Won" })
            this.props.levelWon();
        } else {
            const lives = this.props.lives - 1;
            
            this.pausePlay({ 
                buttonMessage: "Try Again", 
                statusMessage: `Out of time, you have ${lives} ${lives === 1 ? 'life' : 'lives'} remaining!`
            });
            
            this.props.levelLost();
        }
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
		const updateGame = this.updateGame;

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
						updateGame={updateGame.bind(this)}
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
