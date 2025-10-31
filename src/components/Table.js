import React, { Component } from 'react';

class Table extends Component {
    render() {
        const user = [
            {
            id: 1,
            nome: "Pedro Luiz",
            email: "pl@luiz.com"
        },
                    {
            id: 2,
            nome: "anastacia vicencia",
            email: "ana@gmail.com"
        },
        {
            id: 3,
            nome: "Tico tico",
            email: "tt@gmail.com"
        }
        ]
        return (
            <div>
                {user.map(use => (
                    <div>
                        <p>id: {use.id}, name: {use.nome} email: {use.email}</p>
                    </div>
                    
                ))}
                
            </div>
        );
    }
}

export default Table;

