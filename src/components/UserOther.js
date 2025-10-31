import React, { Component } from 'react';

class UserOther extends Component {
    render() {
        const {email, id} = this.props;
        return (
            <div>
                <span>{email}, {id}</span>                
            </div>
        );
    }
}

export default UserOther;
