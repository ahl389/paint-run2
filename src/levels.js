// var levels = [{
// 	tiles: [
// 		[true,	true, 	true,	true, 	false, 	true],
// 		[false, false, 	false,	true, 	true, 	true],
// 		[false,	false, 	true,	true, 	true,	true],
// 		[true, 	false, 	true,	true, 	false,	true],
// 		[true,	true, 	true,	true, 	false,	true],
// 		[false, true, 	false,	true, 	true,	true]
// 	]
// }, {
// 	tiles: [
// 		[true,	true, 	true,	true, 	true, 	true],
// 		[false, false, 	false,	true, 	true, 	true],
// 		[false,	false, 	true,	true, 	false,	true],
// 		[true, 	false, 	false,	true, 	false,	true],
// 		[true,	true, 	true,	true, 	false,	true],
// 		[false, true, 	true,	true, 	true,	true],
// 		[true,  true, 	true,	false, 	true,	true]
// 	]
// },
// {
// 	tiles: [
// 		[true,	false, 	true,	true, 	false, 	true,	false],
// 		[true, 	false, 	false,	true, 	true, 	true,	true],
// 		[true,	false, 	true,	true, 	false,	true, 	true],
// 		[true, 	false, 	true,	true, 	false,	true, 	false],
// 		[true,	true, 	true,	false, 	false,	true,	false],
// 		[false, true, 	true,	false, 	true,	true,	true],
// 		[false, true, 	false,	true, 	true,	true,	false],
// 		[false, true, 	false,	true, 	false,	true,	false],
// 		[false, true, 	true,	true, 	true,	true,	true]
// 	]
// }];


class Location {
	constructor({ x, y }) {
			this.x = x;
			this.y = y;
			this.directions = {
					"top": [0, 1],
					"right": [1, 0],
					"bottom": [0, -1],
					"left": [-1, 0]
			};
	}

	getSideCoord(direction) {
			const [xoffset, yoffset] = this.directions[direction];
			return new Location({ x: this.x + xoffset, y: this.y + yoffset });
	}

	getSideCoords() {
			return Object.keys(this.directions).map((direction) => this.getSideCoord(direction));
	}
}

class Path {
	constructor(initial) {
			this.stack = [initial];
	}

	push(loc) {
			this.stack.unshift(loc);
	}

	peek(index) {
			return this.stack[index];
	}

	contains(loc) {
			return this.stack.some(block => block.x === loc.x && block.y === loc.y);
	}
}

class Maze {
	constructor(x, y, distanceBudget) {
			this.dimensions = { x, y };
			this.path = new Path(this.getStartLocation(this.dimensions));
			this.budget = distanceBudget;
			this.index = 0;
	}

	getStartLocation(map) {
			return new Location({
					x: Math.floor(Math.random() * this.dimensions.x),
					y: Math.floor(Math.random() * this.dimensions.y),
			});
	}

	canMoveTo(loc) {
			return (
					!this.path.contains(loc) && 
					loc.x < this.dimensions.x && loc.x >= 0 && 
					loc.y < this.dimensions.y && loc.y >= 0
			);
	}

	getPossibleDirections() {
			return this.path.peek(this.index).getSideCoords().filter(dir => this.canMoveTo(dir));
	}

	getRandomDirection(directions) {
			return directions[Math.floor(Math.random() * directions.length)]
	}

	move(directions) {
			this.path.push(this.getRandomDirection(directions));
			this.index = 0;
			--this.budget;
	}

	acceptablePosition(directions) {
			return directions.length >= 2
	}

	createGrid() {
			return new Grid(this.path, this.dimensions).draw();
	}

	walk() {
			if(this.budget < 1 || this.index === this.path.stack.length) {
					return this.createGrid();
			}
			const directions = this.getPossibleDirections();
			if(this.acceptablePosition(directions)) {
					this.move(directions);
			} else {
					++this.index;
			}
			return this.walk();
	}
}

class Grid {
	constructor(path, dimensions) {
			this.grid = this.makeBlankGrid(dimensions);
			this.path = path;
	}

	makeBlankGrid({x, y}) {
			const arr = [];
			for(let i = 0; i < x; ++i) {
					arr.push(new Array(y).fill(false));
			}
			return arr;
	}

	draw() {
			this.path.stack.forEach(point => {
					this.grid[point.x][point.y] = true;
			});
			return this.grid;
	}
}

const levels = [
	{ tiles: new Maze(6, 6, 25).walk() },
	{ tiles: new Maze(7, 6, 30).walk() },
	{ tiles: new Maze(9, 7, 40).walk() },
];

export default levels
