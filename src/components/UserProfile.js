import React, { Component } from 'react';

class UserProfile extends Component {
    render() {
        return (
            <div>
                <p>{this.props.user.name}</p>
                <p>{this.props.user.email}</p>
                <p></p>
            </div>
        );
    }
}

export default UserProfile;

