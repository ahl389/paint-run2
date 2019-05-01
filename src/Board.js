import React, { Component } from 'react'; 
import Row from './Row.js';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			targetx: 0,
			targety: 0,
			monsters: this.props.monsters,
			tiles: this.props.rowData
		}
		
		this.monsters = this.props.monsters;
		//this.tileState = this.props.rowData;
		
		this.move = this.move.bind(this);
		this.monsterRun = this.monsterRun.bind(this)
		this.updateMonster = this.updateMonster.bind(this)
		//this.countdown = this.countdown.bind(this)
		//this.timeLeft = this.props.level.time
	}

	paint(targetx, targety){
		var tiles = this.state.tiles;

		for (let row of tiles) {
			for (let tile of row) {
				if (tile.x == targetx && tile.y == targety) {
					tile.target = true;

					if (!tile.touchedA) {
						tile.touchedA = true;
						tile.touchedM = false;
						var utc = this.props.updateTouchCount;
						utc();
					}
				} else {
					tile.target = false;
				}
			}
		}

		return tiles;
	}
	
	unpaint(targetx, targety){
		var tiles = this.state.tiles;
		
		for (let row of tiles) {
			for (let tile of row) {
				if (tile.x == targetx && tile.y == targety) {
					tile.touchedM = true;
					
					if (tile.touchedA) {
						tile.touchedA = false;
						var ltc = this.props.lowerTouchCount;
						ltc();
					} 
				} 
			}
		}

		return tiles;
	}
	
	calculateTargetLoc(dir, currentx, currenty) {
		var targetx;
		var targety;

	    if (dir == 1 || dir == "ArrowRight") { // moving right
 			targetx = parseInt(currentx) + 1;
 			targety = parseInt(currenty);
        } else if (dir == 2 || dir == "ArrowDown") { // moving down
 			targetx = parseInt(currentx);
 			targety = parseInt(currenty)+1;
 		} else if (dir == 3 || dir == "ArrowLeft") { // moving left
 			targetx = parseInt(currentx) - 1;
 			targety = parseInt(currenty);
 		} else if (dir == 4 || dir == "ArrowUp") { // moving up
 			targetx = parseInt(currentx);
 			targety = parseInt(currenty) - 1;
 		}
		
		return({targetx: targetx, targety: targety})
	}
	
	createOpts(dir) {
		var right = dir == 4 ? 1 : dir + 1
		var opts = [dir, dir, dir, dir, dir, dir, right, right, right, Math.ceil(Math.random() * 4)];
		return opts;
	}
	
	monsterRun(){
		var monsters = document.querySelectorAll('.monster');
		var updated = [];
		
		for (let monster of monsters) {
			
			var dir = parseInt(monster.getAttribute('data-prevdir'));
			var prevDir = dir;
			var id = monster.getAttribute('data-id')
			// var dirOpts = this.createOpts(dir);
// 			var rand = Math.floor(Math.random() * 9);
// 			dir = dirOpts[rand]
			var currentx = monster.getAttribute('data-x');
			var currenty = monster.getAttribute('data-y');

			var targetLoc = this.calculateTargetLoc(dir, currentx, currenty);
			var target = document.querySelector(`.tile[data-loc="${targetLoc.targetx}-${targetLoc.targety}"]`);
			var targetx = targetLoc.targetx;
			var targety = targetLoc.targety;
			
			if (target != null) {
				//this.unpaint(targetx, targety);
				this.updateBoardStateM(targetx, targety);
			} else {
				dir = Math.ceil(Math.random() * 4); // proposed tile isn't valid, pick a random new direction
				//dir = dir == 4 ? 1 : dir + 1
				// dir = parseInt(dir) + 1 // turn right
				targetx = currentx;
				targety = currenty;
			}
			
			
			var rm = this.monsters.find(mon => mon.id == id);
			rm.mtargetx = targetx;
			rm.mtargety = targety;
			rm.prevDir = prevDir;
			rm.dir = dir;

			updated.push(rm);

		}

		this.setState({
			monsters: updated
		});
	}
	
	updateMonster(id){
		var allMons = this.monsters;

		for (let monster of allMons) {
			if (monster.id == id) {
				monster.lives = monster.lives - 1
			}
		}

		this.monsters = allMons.filter(mon => mon.lives > 0)
	}
	
	move(e) {
		var avatar = document.querySelector('.avatar');
		var currentx = avatar.getAttribute('data-x');
		var currenty = avatar.getAttribute('data-y');

		var targetLoc = this.calculateTargetLoc(e.key, currentx, currenty);
		var target = document.querySelector(`.tile[data-loc="${targetLoc.targetx}-${targetLoc.targety}"]`);

		if (target != null) {
			var hasMonster = target.querySelector('.monster');
			if (hasMonster != null) { // you smooshed the monster!
				var id = hasMonster.getAttribute('data-id');
				this.updateMonster(id)
			}
			
			this.updateBoardState(targetLoc.targetx, targetLoc.targety);
		}
	}
	
	updateBoardState(targetx, targety){
		// avatar moved, updating board
		var x = parseInt(targetx);
		var y = parseInt(targety);
		
		this.setState({
			targetx: x,
			targety: y,
			tiles: this.paint(x, y)
		});
	}
	
	updateBoardStateM(targetx, targety){
		// monster moved, updating board
		var x = parseInt(targetx);
		var y = parseInt(targety);
		
		this.setState({
			tiles: this.unpaint(x, y)
		});
	}

	componentDidMount(){
		document.addEventListener("keydown", this.move, false);
		this.monsterRunID = setInterval(this.monsterRun, 1000);
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.move, false);
		clearInterval(this.monsterRunID);
	}
	
	renderRows(){
		var rows = [];
		var id = 0;
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
				<div className = "board">
					{ this.renderRows() }
				</div>
		);
	}
}

export default Board;
