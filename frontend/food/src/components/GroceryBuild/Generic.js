import React, { Component } from 'react';

// import { connect } from 'react-redux';
import AddList from './AddList.js';

// import { groceryPopulateAddList } from '../../actions/actions';

class GroceryBuildGeneric extends Component {
    render() {
        return (
            <div>
                GROCERY BUILD {this.props.type}
                <AddList groceryAddList={this.props.groceryAddList} addGroceryItem={this.props.addGroceryItem} />
            </div>
        );
    }
}

export default GroceryBuildGeneric;

// const mapStateToProps = (state) => ({
//     groceryBuildOptions: state.groceryBuildOptions
// });

// const mapDispatchToProps = {
//     groceryPopulateAddList
// };

// const GroceryBuildGenericContainer = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(GroceryBuildGeneric);

// export default GroceryBuildGenericContainer;
