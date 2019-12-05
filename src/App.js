import React from 'react';
import { GameArea } from './gameOfLife'

const Cell = (props) => {
  const getStyle = (props) => {
    const color = props.isAlive ? 'black' : 'white';

    return {
      backgroundColor: color,
      border: '1px solid',
      borderColor: "black",
      padding: 30
    };
  }

  return (
    <div key={props.id} onClick={props.handler} style={getStyle(props)}></div>
  );
}

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      gameState: new GameArea(8)
    };
  }

  clickOnCell = (id) => {
    let g = this.state.gameState;
    if (g.isAlive(id)) {
      g.kill(id);
    } else {
      g.revive(id);
    }

    this.setState(g);
  }

  createCells = () => {
    let t = [];
    let g = this.state.gameState;
    for (let i = 0; i < g.size; i++) {
      t.push(<Cell handler={() => this.clickOnCell(i)}
        isAlive={g.isAlive(i)}
        id={i}></Cell>)
    }
    return t;
  }

  cycleLife = () => {
    let g = this.state.gameState;
    for (let i = 0; i < g.getSize(); i++) {
      g.processCell(i);
    }

    this.setState(g);
  };

  startAutoCycle = () => {
    setInterval(() => this.cycleLife(), 2000);
  }
  render() {
    return (
      <div>
        <button onClick={this.cycleLife}>Cycle!</button>
        <button onClick={this.startAutoCycle}>Start</button>
        <div style={getGridStyle(this.state.gameState.columnSize)}>
          {this.createCells()}
        </div>
      </div>
    )
  }
}

const getGridStyle = (size) => {
  return {
    display: 'grid',
    gridTemplateColumns: 'repeat('+size+', 1fr)',
    gridTemplateRows: 'repeat('+size+', 1fr)',
    gridColumnGap: 3,
    gridRowGap: 3
  };
}