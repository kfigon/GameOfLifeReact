import React from 'react';
import { GameArea } from './gameOfLife'

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
    return [...Array(this.state.gameState.getSize()).keys()]
      .map(i => <Cell handler={() => this.clickOnCell(i)} isAlive={this.state.gameState.isAlive(i)} key={i} />);
  }

  cycleLife = () => {
    let g = this.state.gameState;
    g.processLifeCycle();
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

const Cell = (props) => {
  return (
    <div onClick={props.handler}
      style={
        {
          backgroundColor: props.isAlive ? 'black' : 'white',
          border: '1px solid',
          borderColor: "black",
          padding: 30
        }
      }></div>
  );
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