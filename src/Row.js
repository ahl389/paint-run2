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
		var id = 0;
		var row = [];
		for (let tile of this.props.tiles) {
			var y = this.props.rid;
			var x = id;
			var key = x + "-" + y;
			var monsters = this.props.monsters;
			var monsterTarget = false;
			var mc = 0;
			var rm = [];
			
			for (let monster of monsters) {
				
				if (y == monster.mtargety && x == monster.mtargetx) {
					monsterTarget = true;
					mc++;
					rm.push(monster)
				}
				
			}
			
			// var locClass = tile.type;
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
