import React, { Component } from 'react';
import { connect } from 'react-redux';

//import { getGroceryStores } from '../../actions/actions';
import StoreItem from './StoreItem.js';
import _ from 'lodash';

import classes from './StoreSection.module.css';

class StoreSection extends Component {


    componentDidMount() {
        //this.props.getGroceryStores();
        // this.props.getFoodTypeDefaultSection();
    }

    //{_.map(foodTypes, (o, i) => <option key={i} value={i}>{o.name}</option>)}

    // buildList() {
    //     var result = ""
    //     console.log(this.props)
    //     if ("groceryStores" in this.props.groceryBuildOptions)
    //         return (
    //          _.map(this.props.groceryBuildOptions.groceryStores[5].sections, (section) => (
    //              <ul>
    //              <b>{section.sectionName}</b>

    //              <li key="1">brad1</li>
    //              <li key="2">brad2</li>
    //              <li key="3">brad3</li>
    //              </ul>
    //         ))
    //         )
    //     else
    //         return ("empty")
    // }

    render() {
        const myObject = this.props.groceries;
        const section = this.props.id;
        const storeId = this.props.storeId;
        let renderText = '';
        // console.log(this.props.groceries);

        var filteredObject = Object.keys(myObject).reduce(function(r, e) {
            if (myObject[e].grocerySections[storeId] === section)
                r[e] = myObject[e];
            return r;
        }, {});
        let sortedObjects = _.sortBy(filteredObject, ['name']);

        if (!_.isEmpty(filteredObject)) {
            renderText = (
                <div>
                    <div className={classes.storeListSectionName}>
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

// const mapDispatchToProps = {
//   getGroceryStores,
// };

const StoreSectionContainer = connect(mapStateToProps, null)(StoreSection);
export default StoreSectionContainer;
