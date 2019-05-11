import React, { Component } from 'react'; 
import Tile from './Tile.js';

class Row extends Component {
	// renderTile(key, tile, target, monsterTarget, mtx, mty, mc) {
	renderTile(key, tile, target, monsterTarget, rm, mc) {
		return(
			<Tile 
				key={key} 
				tile={tile}
				target={target}
				monster={monsterTarget} 
				rm={rm}
				// mtx={mtx}
// 				mty={mty}
				mc={mc} 
				opacity={this.props.opacity}
				/>
		)
	}
	
	render(){
		let id = 0;
		let row = [];
		for (let tile of this.props.tiles) {
			let y = this.props.rid;
			if (typeof y !== 'number') {
				y = parseInt(y);
			}
			let x = id;
			let key = x + "-" + y;
			let monsters = this.props.monsters;
			let monsterTarget = false;
			let mc = 0;
			let rm = [];
			
			for (let monster of monsters) {
				if (typeof monster.mtargetx !== 'number') {
					monster.mtargetx = parseInt(monster.mtargetx);
				}
				if (typeof monster.mtargety !== 'number') {
					monster.mtargety = parseInt(monster.mtargety);
				}
				if (y === monster.mtargety && x === monster.mtargetx) {
					monsterTarget = true;
					mc++;
					rm.push(monster)
				}
			}
			
			// let locClass = tile.type;
			row.push(this.renderTile(key, tile, tile.target, monsterTarget, rm, mc));
			id++;
		}

		return (
			<div className = "row">
				{row}
				<div className = "clear"></div>
			</div>
		);
	}
}

export default Row;
