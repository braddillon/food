import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signoutUser } from '../actions/authentication';

class Signout extends Component {
    componentDidMount() {
        this.props.signoutUser();
    }

    render() {
        return <div />;
    }
}

export default connect(null, { signoutUser })(Signout);
