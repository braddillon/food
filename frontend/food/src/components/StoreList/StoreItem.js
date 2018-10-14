import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setStoreListChecked } from '../../actions/actions';

import classes from './StoreItem.module.css';

class StoreItem extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: this.props.grocery.checked };

        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    }

    onChangeCheckbox(e) {
        this.setState({ checked: e.target.checked });
        this.props.setStoreListChecked({
            ...this.props.grocery,
            checked: e.target.checked
        });
    }

    render() {
        let g = this.props.grocery;
        let link = (<Link to={'/food/' + g.id}>{g.name}</Link>)
        if (this.props.locked) {
            link = g.name;
        }

        return (
            <label
                className={classes.container}
                key={'label' + g.id}
                htmlFor={'chkGroceryItem' + g.id}
            >
                {link}

                <input
                    type="checkbox"
                    id={'chkGroceryItem' + g.id}
                    key={'check' + g.id}
                    checked={this.state.checked}
                    onChange={this.onChangeCheckbox}
                    disabled={this.props.locked}
                />
                <span className={classes.checkmark} />
            </label>
        );
    }
}

const mapDispatchToProps = {
    setStoreListChecked
};

const StoreItemContainer = connect(
    null,
    mapDispatchToProps
)(StoreItem);
export default StoreItemContainer;
