import React, { Component } from 'react';

class UserNome extends Component {
    render() {
        const nome = this.props;
        return (
            <div>
                <span>{nome}</span>
                
            </div>
        );
    }
}

export default UserNome;

