class Field {
    constructor(id){
        this.id=id;
        this.alive = false;
    }
    kill() { this.alive = false; }
    revive() { this.alive = true; }
    isAlive() { return this.alive; }
}

class GameArea {
    constructor(sizeOfColumn) {
        this.columnSize = sizeOfColumn;
        this.size = sizeOfColumn*sizeOfColumn;
        this.area = [];
        for(let i=0; i<this.size; i++){
            this.area.push(new Field(i));
        }
    }
    getSize() { return this.size; }
    kill(id) { this.area[id].kill(); }
    revive(id) { this.area[id].revive(); }

    getField(id) { return this.area[id]; }
    isAlive(id) { return this.area[id].isAlive(); }
    getNeighbourIds(id) {
        const wsp = mapTo2d(id, this.columnSize);

        let out = [
            {x:wsp.x-1, y:wsp.y-1}, {x:wsp.x, y:wsp.y-1}, {x:wsp.x+1, y:wsp.y-1},
            {x:wsp.x-1, y:wsp.y}, {x:wsp.x+1, y:wsp.y},
            {x:wsp.x-1, y:wsp.y+1}, {x:wsp.x, y:wsp.y+1}, {x:wsp.x+1, y:wsp.y+1}
        ];

        const bond = (x) => x>=0 && x<this.columnSize;
        out = out.filter((coord) => {
            return bond(coord.x) && bond(coord.y);
        });

        return out.map((coord) => mapTo1d(coord, this.columnSize));
    }

// dead with 3 alive nei -> revive
// live with 2 or 3 alive -> alive
// live with other -> dead
    processCell(id) {
        const nei = this.getNeighbourIds(id);
        const aliveNei = nei.filter(i => this.isAlive(i));

        console.log('processing ' + id + '. ' + aliveNei);
        if (this.isAlive(id)) {
            if (aliveNei.length !== 2 && aliveNei.length !== 3) {
                console.log('cell ' + id + ' killed!');
                this.kill(id);
            }
        } else if (aliveNei.length === 3) {
            console.log('cell ' + id + ' revived');
            this.revive(id);
        }
    }
}

function mapTo2d(id, rowColumnSize) {
    const rowId = Math.floor(id/rowColumnSize);
    const colId = id % rowColumnSize;

    return {x: colId, y:rowId};
};

function mapTo1d(wsp, rowColumnSize) {
    return wsp.y*rowColumnSize + wsp.x;
};


module.exports = {
    GameArea:GameArea,
    mapTo2d: mapTo2d,
    mapTo1d: mapTo1d
}