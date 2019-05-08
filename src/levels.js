// Paint Run - Level Maps
// 1 = tile
// 0 = empty

/*
    This is an implementation of a randomized depth-first search algorithm
    See: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Depth-First_Search

    I've added the concept of a "budget" and a "minPathsAvailable" to accomodate this particular
    problem.
*/
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
        this.minPathsAvailable = 2;
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
        return directions.length >= this.minPathsAvailable;
    }

    drawGrid() {
        return new Grid(this.path, this.dimensions).draw();
    }

    walk() {
        if (this.budget <= 1) {
            return this;
        }
        if (this.index === this.path.stack.length && this.minPathsAvailable > 0) {
            --this.minPathsAvailable;
            this.index = 0;
        }
        const directions = this.getPossibleDirections();
        if (this.acceptablePosition(directions)) {
            this.move(directions);
        } else {
            ++this.index;
        }
        return this.walk();
    }
}

class Grid {
    constructor(path, dimensions) {
        this.tile = 1;
        this.blank = 0;
        this.grid = this.makeBlankGrid(dimensions);
        this.path = path;
    }

    makeBlankGrid({ x, y }) {
        return new Array(y).fill(undefined).map(() => new Array(x).fill(this.blank));
    }

    draw() {
        this.path.stack.forEach(point => {
            this.grid[point.y][point.x] = this.tile;
        });
        return this.grid;
    }
}

const mazes = [
    { maze: new Maze(4, 4, 12).walk() },
    { maze: new Maze(5, 5, 16).walk() },
    { maze: new Maze(6, 6, 25).walk() },
    { maze: new Maze(6, 7, 30).walk() },
    { maze: new Maze(7, 9, 40).walk() },
    { maze: new Maze(8, 8, 40).walk() },
    { maze: new Maze(10, 4, 28).walk() },
];

const levels = mazes.map(item => {
    return {
        ...item,
        grid: item.maze.drawGrid(),
        path: item.maze.path.stack
    };
})

export default levels;
