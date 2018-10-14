import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.replace({ pathname: '/signin/' });
            }
        }

        componentWillUpdate(nextProps) {
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

    return connect(mapStateToProps)(Authentication);
}
