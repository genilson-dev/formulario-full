import React, { Component } from 'react';
import Form from 'react-form'
class Formu extends Component {
    constructor(){
        super();
        this.state = {
            estadoFavorito: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            estadoFavorito: e.target.value
        })
    }
    render() {
        return (
            <div>
                <h1>Estado e React</h1>
                <Form>
                    <label >Diga qual o seu estado favorito:</label>
                    <textarea name='estadoFavorito' value={this.state.estadoFavorito} onChange={this.handleChange} />
                    <input 
                    type='number'
                    name='idade'
                    />
                    <input 
                    type='checkbox'
                    name='vaicomparecer'
                    />
                </Form>
                
            </div>
        );
    }
}

export default Formu;
