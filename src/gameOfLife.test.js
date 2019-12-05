const GameArea = require('./gameOfLife.js').GameArea;
const mapTo2d = require('./gameOfLife.js').mapTo2d;
const mapTo1d = require('./gameOfLife.js').mapTo1d;

test('create game -> empty area', ()=>{
    const size = 10;
    
    let g = new GameArea(size);
    for(let i=0; i<g.size; i++) {
        expect(g.isAlive(i)).toBe(false);
    }
});

test('getters', ()=>{
    let g = new GameArea(4);
    expect(g.size).toBe(16);
    expect(g.columnSize).toBe(4);
});

test('mapto2d', ()=>{
    expect(mapTo2d(0,4)).toStrictEqual({x:0,y:0});
    expect(mapTo2d(1,4)).toStrictEqual({x:1,y:0});
    expect(mapTo2d(2,4)).toStrictEqual({x:2,y:0});
    expect(mapTo2d(3,4)).toStrictEqual({x:3,y:0});
    expect(mapTo2d(4,4)).toStrictEqual({x:0,y:1});
    expect(mapTo2d(5,4)).toStrictEqual({x:1,y:1});
    expect(mapTo2d(6,4)).toStrictEqual({x:2,y:1});
    expect(mapTo2d(9,4)).toStrictEqual({x:1,y:2});
    expect(mapTo2d(15,4)).toStrictEqual({x:3,y:3});
});

test('mapto1d', ()=>{
    expect(mapTo1d({x:0,y:0},4)).toStrictEqual(0);
    expect(mapTo1d({x:1,y:0},4)).toStrictEqual(1);
    expect(mapTo1d({x:2,y:0},4)).toStrictEqual(2);
    expect(mapTo1d({x:3,y:0},4)).toStrictEqual(3);
    expect(mapTo1d({x:0,y:1},4)).toStrictEqual(4);
    expect(mapTo1d({x:3,y:2},4)).toStrictEqual(11);
    expect(mapTo1d({x:1,y:3},4)).toStrictEqual(13);
    expect(mapTo1d({x:3,y:3},4)).toStrictEqual(15);
});

// 0  1  2  3
// 4  5  6  7
// 8  9  10 11
// 12 13 14 15
const getGetNeighboursTestData = () =>{
    return [
        {in: 0, exp:[1,4,5]},
        {in: 1 , exp:[0,2,4,5,6]},
        {in: 2 , exp:[1,3,5,6,7]},
        {in: 3 , exp:[2,6,7]},
        {in: 4, exp: [0,1,5,8,9]},
        {in: 5 , exp:[0,1,2,4,6,8,9,10]},
        {in: 6 , exp:[1,2,3,5,7,9,10,11]},
        {in: 7 , exp:[2,3,6,10,11]},
        {in: 12, exp: [8,9,13]},
        {in: 13 , exp:[8,9,10,12,14]},
        {in: 14 , exp:[9,10,11,13,15]},
        {in: 15 , exp:[10,11,14]}
    ]; 
};

for(const testCase of getGetNeighboursTestData()) {
    test('get neighbours - ' + testCase.in, ()=> {
        let g = new GameArea(4);
        expect(g.getNeighbourIds(testCase.in)).toStrictEqual(testCase.exp);    
    });    
}