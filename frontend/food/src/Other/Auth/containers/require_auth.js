import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setLoginRedirect } from '../actions/authentication';

export default function(ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentDidMount() {
            if (!this.props.authenticated) {
                console.log(this.props);
                this.props.setLoginRedirect(this.props.location.pathname)
                this.props.history.replace({ pathname: '/signin/' });
            }
        }

        componentDidUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.replace({ pathname: '/signin/' });
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.auth.authenticated,
            account: state.account
        };
    }

    return connect(mapStateToProps, { setLoginRedirect })(Authentication);
}
