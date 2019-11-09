import React, { Component } from 'react';
import Board from '../Board/Board';
import Time from '../Time/Time';
import Tutorial from '../Tutorial/Tutorial';

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

    /**
     * When user clicks button, play is resumed
     */
	handleClick() {
		this.resumePlay();
	}

    /**
     * When user presses space or enter, play is resumed
     */
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
    
    /**
     * Updates state of Level component to unpause the game and enable active playing
     */
    resumePlay() {
		this.setState({
			inPlay: true
		});
    }

    /**
     * Updates state of Level component to pause the game and disable active playing
     * Also sets new messaging to be displayed during the pause screen
     * @param: {Obj} messaging - an object containg text for button and headline
     */
	pausePlay(messaging) {
		this.setState({
			inPlay: false,
            messaging: messaging
		});
	}
    
    /**
     * Determines messaging based on statusCode and then calls pausePlay method with
     * new messaging. Also calls Game component methods that update the Game component
     * with new values for lives and level.
     * @param: {string} statusCode - a string containing a status code that dictates the 
     * Game and Level components' next state
     */
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
	

	getMonsterState(tiles) {
		const num = this.props.data.monsters;
		
		let monsters = [];
		let flat = tiles.reduce(function(a,b) { return a.concat(b);  });
		let potentialTargets = flat.filter(loc => loc.type == 'tile')

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
		const initialMonsters = this.getMonsterState(this.props.data.gridObjects);
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
