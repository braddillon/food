import React from "react";
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import FoodForm from "./FoodForm.js";
import { HTTP } from "../../Other/HTTP";

// import {
//   groceryList_populate,
// } from "../../Grocery/actions/actions";
import { getGroceryStores } from "../../Grocery/actions/actions";
import { updateFoodItem, getFoodTypes } from "../actions/actions";
import _ from 'lodash';


const EditFood = (props) => {
  const [food, setFood] = React.useState({});
  const dispatch = useDispatch()
  const stores = useSelector(state => state.stores)
  const foodTypes = useSelector(state => state.foodTypes)
  const groceryBuildOptions = useSelector(state => state.groceryBuildOptions)

  useEffect(() => {
    dispatch(getGroceryStores());
    dispatch(getFoodTypes());

    HTTP.get(
      `foodDetailWithGrocerySection/${props.match.params._id}/`
    ).then(response => {
      setFood(response.data)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(data) {
    if (data.button === "submit") {
      data["id"] = props.match.params._id;
      dispatch(updateFoodItem(data, props, "main"));
    }
    else
      props.history.goBack();
  }

    let id = props.match.params._id;
    let init = {};

    if ((stores === undefined) || (_.isEmpty(stores)))
      return <div>Loading Stores</div>
    else if ((food === undefined) || (food.food === undefined))
      return <div>Loading Food</div>
    else {
      init = {
        foodName: food.food,
        staple: food.staple,
        foodTypeId: String(food.foodtype),
        sectionFortinos: "27",
        sectionLongos: "19"
      };
      if (food.sections !== undefined) {
        Object.keys(food.sections).forEach(function(key) {
          init["section" + stores[key].name] = String(food.sections[key]);
        });
      }
      return (
        <div>
          <h1>Edit Food</h1>
          <FoodForm
            id={id}
            object={food}
            buildOptions={groceryBuildOptions}
            stores={stores}
            foodTypes={foodTypes}
            onSubmit={handleSubmit}
          />
        </div>
      );
    }
  }


// class EditFood extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     //this.props.getGroceryStores();
//     this.props.getGroceryStores();
//     this.props.getFoodTypes();

//     HTTP.get(
//       `foodDetailWithGrocerySection/${this.props.match.params._id}/`
//     ).then(response => {
//       this.setState({ object: response.data });
//     });
//   }

  

//   render() {
//     let id = this.props.match.params._id;
//     let f = this.state.object;
//     let init = {};
//     if (f !== undefined && f.food !== undefined) {
//       let stores = this.props.stores;
//       init = {
//         foodName: f.food,
//         staple: f.staple,
//         foodTypeId: String(f.foodtype),
//         sectionFortinos: "27",
//         sectionLongos: "19"
//       };
//       if (f.sections !== undefined) {
//         console.log(f);
//         Object.keys(f.sections).forEach(function(key) {
//           init["section" + stores[key].name] = String(f.sections[key]);
//         });
//       }
//       return (
//         <div>
//           <h1>EDIT FOOD -- {id}</h1>
//           <FoodForm
//             id={id}
//             initialValues={init}
//             object={this.state.object}
//             buildOptions={this.props.groceryBuildOptions}
//             stores={this.props.stores}
//             foodTypes={this.props.foodTypes}
//             onSubmit={this.handleSubmit.bind(this)}
//           />
//         </div>
//       );
//     } else {
//       return <div>Ooops.... Food not found</div>;
//     }
//   }
// }

// const mapStateToProps = state => ({
//   groceries: state.groceries,
//   groceryBuildOptions: state.groceryBuildOptions,
//   stores: state.stores,
//   foodTypes: state.foodTypes
// });

// const mapDispatchToProps = {
//   groceryList_populate,
//   getGroceryStores,
//   getFoodTypes,
//   updateFoodItem
// };

// const EditFoodContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EditFood);

export default EditFood;
