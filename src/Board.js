import React, { Component } from 'react'; 
import Row from './Row.js';
import Time from './Time.js';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			targetx: 0,
			targety: 0,
			touched: 1,
			monsterState: this.props.monsters,
			tileState: this.props.tiles,
			monsters: this.props.monsters,
			tiles: this.props.rowData
		};
		
		this.monsters = this.props.monsters;
		this.move = this.move.bind(this);
		this.monsterRun = this.monsterRun.bind(this);
		this.updateMonster = this.updateMonster.bind(this);
		this.updateTouchCount = this.updateTouchCount.bind(this);
	}

	componentDidMount() {
		console.log('Board: componentDidMount: addEventListener: keydown');
		document.addEventListener("keydown", this.move, false);
		this.monsterRunID = setInterval(this.monsterRun, 1000);

	}

	componentWillUnmount() {
		console.log('Board: componentWillUnmount: removeEventListener: keydown');
		document.removeEventListener("keydown", this.move, false);
		clearInterval(this.monsterRunID);
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

		return tiles;
	}

	updateTouchCount(count) {
		this.setState({
			touched: parseInt(this.state.touched) + count
		});
	
		this.checkForWin();
	}
	
	checkForWin() {
		let ugs = this.props.updateGameStatus;
		if (this.state.touched === this.props.tileCount) {
			ugs(true, "Level Won", "Next Level", 'next-level')
		} 
	}
	
	paint(targetx, targety) {
		const tiles = this.state.tiles;

		for (let row of tiles) {
			for (let tile of row) {
				if (tile.x == targetx && tile.y == targety) {
					tile.target = true;

					if (!tile.touchedA) {
						//if (!monster) {
							tile.touchedA = true;
							tile.touchedM = false;
							this.updateTouchCount(1);
							//}
					} 
				} else {
					tile.target = false;
				}
			}
		}

		return tiles;
	}
	
	unpaint(targetx, targety) {
		const tiles = this.state.tiles;
		
		for (let row of tiles) {
			for (let tile of row) {
				if (tile.x === targetx && tile.y === targety) {
					tile.touchedM = true;
					
					if (tile.touchedA) {
						tile.touchedA = false;
						this.updateTouchCount(-1);
					} 
				} 
			}
		}

		return tiles;
	}
	
	calculateTargetLoc(dir, currentx, currenty) {
		let targetx;
		let targety;
		if (typeof dir !== 'string') {
			dir = dir.toString(); // always use string comparisons
		}
		if (dir === '1' || dir === "ArrowRight" || dir === 'd' || dir === 'D') {
			// moving right
			targetx = parseInt(currentx) + 1;
			targety = parseInt(currenty);
		  } else if (dir === '2' || dir === "ArrowDown" || dir === 's' || dir === 'S') {
			// moving down
			targetx = parseInt(currentx);
			targety = parseInt(currenty) + 1;
		  } else if (dir === '3' || dir === "ArrowLeft" || dir === 'a' || dir === 'A') {
			// moving left
			targetx = parseInt(currentx) - 1;
			targety = parseInt(currenty);
		  } else if (dir === '4' || dir === "ArrowUp" || dir === 'w' || dir === 'W') {
			// moving up
			targetx = parseInt(currentx);
			targety = parseInt(currenty) - 1;
		  }
			  
		return({targetx: targetx, targety: targety})
	}
	
	monsterRun() {
		let monsters = document.querySelectorAll('.monster');
		let updated = [];
		
		for (let monster of monsters) {

			let dir = parseInt(monster.getAttribute('data-prevdir'));
			let prevDir = dir;
			let id = monster.getAttribute('data-id');
			let currentx = monster.getAttribute('data-x');
			let currenty = monster.getAttribute('data-y');

			let targetLoc = this.calculateTargetLoc(dir, currentx, currenty);
			let target = document.querySelector(`.tile[data-loc="${targetLoc.targetx}-${targetLoc.targety}"]`);
			let targetx = targetLoc.targetx;
			let targety = targetLoc.targety;
			
			if (target != null) { // if target exists
				if (updated.some(mon => mon.mtargetx === targetx && mon.mtargety === targety)) { // if no other monster is aleady heading to this target
					dir = Math.ceil(Math.random() * 4); // proposed tile isn't valid, pick a random new direction
					targetx = currentx;
					targety = currenty;
				} 
			} else {
				dir = Math.ceil(Math.random() * 4); // proposed tile isn't valid, pick a random new direction
				targetx = currentx;
				targety = currenty;
			}
			
			let rm = this.monsters.find(mon => mon.id == id);
			rm.mtargetx = targetx;
			rm.mtargety = targety;
			rm.prevDir = prevDir;
			rm.dir = dir;

			updated.push(rm);
			this.updateBoardStateM(targetx, targety);

		}

		this.setState({
			monsters: updated
		});
	}
	
	updateMonster(id) {
		const allMons = this.monsters;
		let stillAlive = true;
		
		const monster = allMons.find(mon => mon.id == id);
		monster.lives = monster.lives - 1;
		
		if (monster.lives === 0) {
			stillAlive = false;
		} 

		this.monsters = allMons.filter(mon => mon.lives > 0);
		console.log('Board: updateMonster: id:' + id + ' lives:' + monster.lives + ' stillAlive:' + stillAlive);
		return stillAlive;
	}
	
	move(e) {
		let monster = false;
		let avatar = document.querySelector('.avatar');
		let currentx = avatar.getAttribute('data-x');
		let currenty = avatar.getAttribute('data-y');
		console.log('Board: move: e.key: ' + e.key + ' x:' + currentx + ' y:' + currenty);

		let targetLoc = this.calculateTargetLoc(e.key, currentx, currenty);
		let target = document.querySelector(`.tile[data-loc="${targetLoc.targetx}-${targetLoc.targety}"]`);

		if (target != null) {
			let hasMonster = target.querySelector('.monster');
			if (hasMonster != null) { // you smooshed the monster!
				let id = hasMonster.getAttribute('data-id');
				console.log('Board: move: you smooshed the monster! id:' + id + ' x:' + currentx + ' y:' + currenty);
				monster = this.updateMonster(id)
			}
			
			this.updateBoardState(targetLoc.targetx, targetLoc.targety, monster);
		}
	}
	
	updateBoardState(targetx, targety, monster) {
		// avatar moved, updating board
		const x = parseInt(targetx);
		const y = parseInt(targety);
		
		this.setState({
			targetx: x,
			targety: y,
			tiles: this.paint(x, y)
		});
	}
	
	updateBoardStateM(targetx, targety) {
		// monster moved, updating board
		const x = parseInt(targetx);
		const y = parseInt(targety);
		
		this.setState({
			tiles: this.unpaint(x, y)
		});
	}

	
	renderRows() {
		let rows = [];
		let id = 0;
		for (let row of this.state.tiles) {
			rows.push(<Row 	
						key={id} 
						rid={id} 
						targetx={this.state.targetx} 
						targety={this.state.targety} 
						monsters={this.monsters} 
						tiles={row}
						/>
			);
			
			id++;
		}

		return rows;
	}
	
	render() {
		return (
			<div>
			<div className = "details-tab">
				<div className="lives">{this.props.lives}<br></br><span>lives</span></div>
				<div className="status">{this.state.touched}/{this.props.tileCount}<br></br><span>tiles</span></div>
			<Time time={this.props.time} endLevel={this.props.endLevel}/>
			</div>
			<div className = "board">
				{ this.renderRows() }
			</div>
				</div>
		);
	}
}

export default Board;
