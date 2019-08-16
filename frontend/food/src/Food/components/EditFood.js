import React, { Component } from "react";

import { connect } from "react-redux";
import FoodForm from "./FoodForm.js";
import { HTTP } from "../../Other/HTTP";

import {
  groceryList_populate,
  getGroceryStores
} from "../../Grocery/actions/actions";
import { getGroceryStores2 } from "../../Grocery/actions/store";
import { updateFoodItem, getFoodTypes } from "../actions/actions";

class EditFood extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getGroceryStores();
    this.props.getGroceryStores2();
    this.props.getFoodTypes();

    HTTP.get(
      `foodDetailWithGrocerySection/${this.props.match.params._id}/`
    ).then(response => {
      this.setState({ object: response.data });
    });
  }

  handleSubmit(data) {
    if (data.button === "submit") {
      data["id"] = this.props.match.params._id;
      this.props.updateFoodItem(data);
    }
    this.props.history.goBack();
  }

  render() {
    // console.log("EditFood");
    // console.log(this.props);
    // console.log(this.props.groceryBuildOptions)
    let id = this.props.match.params._id;
    let f = this.state.object;
    let init = {};
    if (f !== undefined && f.food !== undefined) {
      let stores = this.props.groceryBuildOptions.groceryStores;
      init = {
        foodName: f.food,
        staple: f.staple,
        foodTypeId: String(f.foodtype),
        sectionFortinos: "27",
        sectionLongos: "19"
      };
      if (f.sections !== undefined) {
        Object.keys(f.sections).forEach(function(key) {
          init["section" + stores[key].name] = String(f.sections[key]);
        });
      }
      return (
        <div>
          <h1>EDIT FOOD -- {id}</h1>
          <FoodForm
            id={id}
            initialValues={init}
            object={this.state.object}
            buildOptions={this.props.groceryBuildOptions}
            stores={this.props.groceryBuildOptions.groceryStores}
            foodTypes={this.props.foodOptions.foodTypes}
            onSubmit={this.handleSubmit.bind(this)}
          />
        </div>
      );
    } else {
      return <div>Ooops.... Food not found</div>;
    }
  }
}

const mapStateToProps = state => ({
  groceries: state.groceries,
  groceryBuildOptions: state.groceryBuildOptions,
  stores: state.stores,
  foodOptions: state.foodOptions
});

const mapDispatchToProps = {
  groceryList_populate,
  getGroceryStores,
  getGroceryStores2,
  getFoodTypes,
  updateFoodItem
};

const EditFoodContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFood);

export default EditFoodContainer;
