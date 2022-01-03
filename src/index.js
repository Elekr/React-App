import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


//Entire page Div
class Page extends React.Component {
  renderTitle() {
    return <Title />;
  }

  renderTable() {
    return <Table />;
  }

  render() { //Renders the components created
    return (
        <div>
          <div>
            {this.renderTitle()}
          </div>
          <div>
            {this.renderTable()}
          </div>
        </div>
      );
  }
}

////Table
//This is a function component instead of a react component
class Table extends React.Component 
{
    render() {
        return (
            <div>What's good im a table</div>
        );
      }
}


//This is a function component instead of a react component (use for render only)
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

////Title
//This is a function component instead of a react component
function Title(props) {
  return <h1>Title</h1>;
}

//Parent of square so it can lift up the state
class Board extends React.Component {
    //prop can be passed from the parent to the child of the class
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  renderSquare(i) {
    return (
      <Square
      //state is something that can change
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  render() {
    const status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
//render the game into the root div
ReactDOM.render(<Page />, document.getElementById("root"));
