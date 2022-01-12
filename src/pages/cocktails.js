import React from 'react';
const baseURL = "http://18.170.52.254:8080/cocktails";

class Page extends React.Component {
    render()
    {
      return (
        <div>
          <div>
            {Title()}
          </div>
          <div>
          <DisplayCocktails/>
          </div>
          <div>
          <h1 class = "smalltitle">Add Drink</h1>
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

  function deleteCocktail(id)
  {
    console.log("hi");
  }
  
  ////Table
  class DisplayCocktails extends React.Component {
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
          <div className = "display">          
          <ul>
          {items.map(item => (
            <li key={item.id}>
              Drink: {item.name} Number of Instructions: {item.cocktail_Instructions} <button className = "delete" onclick = "deleteCocktail">Delete</button>
            </li>
          ))}
        </ul>
        </div>
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
  
          <input className = "smallbutton" type="submit" value="Add Drink" />
        </form>
      );
    }
  }
const Cocktails = () => {
  return (
      <div className = "center"><Page/></div>
    
  );
};
  
export default Cocktails;