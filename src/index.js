import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./index.css";

const baseURL = "http://18.170.32.252:8080/cocktails/all";

//Entire page Div
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://13.40.33.55:8080/cocktails/all")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    console.log("hello!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.cocktail_Instructions_number_of_instructions}
            </li>
          ))}
        </ul>
      );
    }
  }
}


////Table
class Table extends React.Component {
  constructor(props) {
     super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
     this.state = { //state is by default an object
        
     }
  }
 render() { //Renders the components created
  return (
    <div>
          <h1 id='title'>React Dynamic Table</h1>
       </div>
  )
}
}

export default Table

////Title
//This is a function component instead of a react component
function Title(props) {
  return <h1 className="title">Title</h1>;
}


//This is a function component instead of a react component (use for render only)
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
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
ReactDOM.render(<MyComponent/>, document.getElementById("root"));
