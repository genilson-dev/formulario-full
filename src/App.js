import React from 'react';
import './App.css';
// import Form from './components/state_event/Form';

// class App extends React.Component {
  //   constructor(props){
  //     super();
  //     this.state = {
  //       numero: 1
  //     }
  //     this.proxNumber = this.proxNumber.bind(this)
  //     this.antNumber = this.antNumber.bind(this)

  //   }
  // proxNumber = () => {
  //   this.setState((ant, _props) => {
  //     return { numero: ant.numero + 10 };
  //   });
  // }
  // antNumber = () => {
  //   this.setState((ant, _props) => {
  //     return { numero: ant.numero - 1 };
  //   });
  // }
  // render() {
  //   return (
  //     <div className="App">
  //       {/* <button onClick={this.proxNumber}>Prox Number (+)</button>
  //       <p>Número atual: {this.state.numero}</p>
  //       <button onClick={this.antNumber}>ante Number (-)</button> */}
  //       <Form />
  //       <h1>helo mundo</h1>



  //     </div>
  //   );
  // }


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      estadoFavorito: "",
      idade: "",
      vaicomparecer: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, type, value, checked } = e.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value
    });
  }

  render() {
    return (
      <div>
        <h1>Estado e React</h1>
        <form>
          <label>Diga qual o seu estado favorito:</label>
          <textarea
            name="estadoFavorito"
            value={this.state.estadoFavorito}
            onChange={this.handleChange}
          />

          <label>Idade:</label>
          <input
            type="number"
            name="idade"
            value={this.state.idade}
            onChange={this.handleChange}
          />

          <label>Vai comparecer?</label>
          <input
            type="checkbox"
            name="vaicomparecer"
            checked={this.state.vaicomparecer}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default App;

