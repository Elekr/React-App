import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./index.css";

const baseURL = "http://13.40.33.55:8080/cocktails";

//Entire page Div
class Page extends React.Component {
  render()
  {
    return (
      <div>
        <div>
          {Title()}
        </div>
        <div>
        <Table/>
        </div>
        <div>
        <h1>Add Drink</h1>
        <Form/>
        </div>
      </div>
    );
  }
}

////Title
function Title(props) {
  return <h1 className="title">Cocktail Database</h1>;
}

////Table
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(baseURL + "/all")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        //TODO: UPDATE THIS
        <ul>
          {items.map(item => (
            <li key={item.name}>
              Cocktail: {item.name} Number of Instructions: {item.cocktail_Instructions_number_of_instructions}
            </li>
          ))}
        </ul>
      );
    }
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drink: '1', 
      instr: '2'
    };
    this.handleDrinkChange = this.handleDrinkChange.bind(this);
    this.handleInstructionChange = this.handleInstructionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDrinkChange(event) {
    this.setState({
      drink: event.target.value
    });
  }

  handleInstructionChange(event) {
    this.setState({
      instr: event.target.value
    });
  }

  handleSubmit(event) {
    alert('Cocktail added: ' + this.state.drink +" + "+ this.state.instr);
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
  };
  fetch(baseURL + "/add/cocktail?name=" + this.state.drink + "&Cocktail_Instructions_number_of_instructions=" + this.state.instr , requestOptions);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
<input
          inputType = {"text"}
            value={this.state.drink}
            onChange={this.handleDrinkChange} />

<input
          inputType = {"text"}
            value={this.state.instr}
            onChange={this.handleInstructionChange} />

        <input type="submit" value="Add Drink" />
      </form>
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
ReactDOM.render(<Page/>, document.getElementById("root"));
