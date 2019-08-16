import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoreItem from './StoreItem.js';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';


  const styles = theme => ({
      root: {
        display: 'flex',
        flexDirection: 'column',
      },
    sectionName: {
        fontWeight: "bold",
        fontSize: "175%",
        marginTop: "1em",
    },
});


class StoreSection extends Component {

    render() {
        const { classes } = this.props;

        const myObject = this.props.groceries;
        const section = this.props.id;
        const storeId = this.props.storeId;
        let renderText = '';

        var filteredObject = Object.keys(myObject).reduce(function(r, e) {
            if (myObject[e].grocerySections[storeId] === section)
                r[e] = myObject[e];
            return r;
        }, {});
        let sortedObjects = _.sortBy(filteredObject, ['name']);

        if (!_.isEmpty(filteredObject)) {
            renderText = (
                <div className={classes.root}>
                    <div className={classes.sectionName}>
                        {this.props.name}
                    </div>
                    {_.map(sortedObjects, g => (
                        <StoreItem grocery={g} key={g.id} locked={this.props.locked} />
                    ))}
                </div>
            );
        }

        return renderText;
    }
}

const mapStateToProps = (state) => ({
    groceries: state.groceries
});

const StoreSectionContainer = connect(mapStateToProps, null)(StoreSection);
export default withStyles(styles)(StoreSectionContainer);
