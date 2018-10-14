import React, { PureComponent } from 'react';

// import { connect } from 'react-redux';

// import { clearMatchGroceryList, addGroceryItem } from '../../actions/actions';

class GroceryAddItem extends PureComponent {
 

    // onClick(e) {
    //     e.preventDefault();
    //     if (!(this.props.item.id in this.props.groceries))
    //         this.props.addGroceryItem(this.props.item);
    //     // if(typeof this.props !== "undefined" && this.props.clearPrevSearch) {
    //     //   this.props.clearPrevSearch();
    //     //   this.props.clearMatchGroceryList()
    //     // }
    // }

    onClick2 = (event) => {
        event.preventDefault();
        this.props.addGroceryItem(this.props.item);
        //props.checked(props.id, event.target.checked)
    }

    render() {
        const { item } = this.props;
        //console.log(this.props);
        return (
            <li
                className={'list-group-item ' + (item.active ? 'active' : '')}
                key={item.id}
                onClick={this.onClick2}
            >
                {item.name}
            </li>
        );
    }
}

// const mapStateToProps = (state) => ({
//     groceries: state.groceries
// });

// const mapDispatchToProps = {
//     addGroceryItem
// };

// const GroceryAddItemContainer = connect(mapStateToProps, mapDispatchToProps)(
//     GroceryAddItem
// );

export default GroceryAddItem;
