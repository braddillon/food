import axios from "axios";
import objectToFormData from "object-to-formdata"

import { push } from 'connected-react-router';


import { resetRecipeForm } from './recipeFormActions'

import { ROOT_URL } from "../../actions/actions";
import {
  RECIPE_PARSE_INGREDIENTS,
  RECIPE_RESET_INGREDIENTS,
  RECIPE_CHANGE_INGREDIENT_MATCH,
  RECIPE_PICK_POSSIBLE_INGREDIENTS,
  RECIPE_RESET_POSSIBLE_INGREDIENTS,
  RECIPE_ADHOC_INGREDIENT_MATCH,
  RECIPE_GET_SECTIONS,
  RECIPE_CHANGE_INGREDIENT_SECTION,
  RECIPE_CHANGE_DIRECTION_SECTION,
  RECIPE_PARSE_DIRECTIONS,
  RECIPE_RESET_DIRECTIONS,
  RECIPE_GET_LIST,
  RECIPE_GET_TAGS,
  RECIPE_DETAIL,
  RECIPE_RESET,
} from "./types";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const parseIngredients = ingredientText => {
  return function(dispatch) {
    axios
      .post(
        `${ROOT_URL}/parseIngredients`,
        {
          ingText: ingredientText
        },
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        dispatch({
          type: RECIPE_PARSE_INGREDIENTS,
          payload: response.data
        });
      });
  };
};

export const resetIngredients = ingredientText => {
  return function(dispatch) {
    dispatch({ type: RECIPE_RESET_INGREDIENTS, payload: {} });
  };
};

export const parseDirections = (directionText, sections) => {
  return function(dispatch) {
        // Get null recipe section
        const sectionId = Object.keys(sections).find( key => sections[key].name === 'Main')

        // Eat start of line numbering
        directionText = directionText.replace(/\d+(\s*|\n)[-\\.)]+\s+/g, '')

        // Eat phantom newlines
        directionText = directionText.replace(/\n\n/g, '\n')

        let dirs = directionText.split("\n")
        dirs = dirs.filter( item => item !== "")

        let pay = dirs.map( (item, index) => {
          return {id: index+1, direction: item, section: parseInt(sectionId, 10)}
        }).reduce((obj, item) => { 
            obj[item.id] = item;
            return obj;
        }, {});

        dispatch({
          type: RECIPE_PARSE_DIRECTIONS,
          payload: pay
        });
  };
};

export const resetDirections = directionText => {
  return function(dispatch) {
    dispatch({ type: RECIPE_RESET_DIRECTIONS, payload: [] });
  };
};

export const changeIngredientMatch = (tmpID, selectionId) => {
  return function(dispatch) {
    dispatch({
      type: RECIPE_CHANGE_INGREDIENT_MATCH,
      payload: { tmpId: tmpID, selectionId: selectionId }
    });
  };
};

export const changeIngredientSection = (tmpID, sectionId) => {
  return function(dispatch) {
    dispatch({
      type: RECIPE_CHANGE_INGREDIENT_SECTION,
      payload: { tmpId: tmpID, sectionId: sectionId }
    });
  };
};

export const changeDirectionSection = (tmpID, sectionId) => {
  return function(dispatch) {
    dispatch({
      type: RECIPE_CHANGE_DIRECTION_SECTION,
      payload: { tmpId: tmpID, sectionId: sectionId }
    });
  };
};


export const setAdhocIngredientMatch = (tmpID, selectionId, name) => {
  return function(dispatch) {
    console.log("setAdhocIngredient")
    console.log(tmpID)
    console.log(selectionId)
    dispatch({
      type: RECIPE_ADHOC_INGREDIENT_MATCH,
      payload: { tmpId: tmpID, selectionId: selectionId, name: name }
    });
  };
}

export const pickPossibleIngredients = g => {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/food?term=${g}`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      })
      .then(response => {
        dispatch({
          type: RECIPE_PICK_POSSIBLE_INGREDIENTS,
          payload: response.data
        });
      });
  };
};

export const resetPossibleIngredients = g => {
  return function(dispatch) {
    dispatch({ type: RECIPE_RESET_POSSIBLE_INGREDIENTS, payload: [] });
  };
};

export const getRecipeSections = () => {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/recipeSection`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      })
      .then(response => {
        let tmp = response.data.reduce(
          (obj, item) =>
              Object.assign(obj, {
                  [item.id]: {
                      id: item.id,
                      name: item.name,
                  }
              }),
          {}
        );

        dispatch({
          type: RECIPE_GET_SECTIONS,
          payload: tmp
        });
      });
  };
};

// export const createNewRecipe = (name, tags, source, ingredients, directions, onResetForm) => {
//   return function(dispatch) {
//     axios
//       .post(
//         `${ROOT_URL}/recipeCreate`,
//         {
//           name: name,
//           tags: tags,
//           source: source,
//           ingredients: ingredients,
//           directions: directions,
//         },
//         {
//           headers: {
//             Authorization: "JWT " + localStorage.getItem("token")
//           }
//         }
//       )
//       .then(response => {
//         if (response.data.status === "success")
//           console.log("SUCCESS!!!!");
//         else {
//           console.log("FAIL");
//         }

//         dispatch({type: RECIPE_RESET_INGREDIENTS})
//         dispatch({type: RECIPE_RESET_DIRECTIONS})
//         onResetForm();
//         console.log(response.data);
//       });
//   };
// }

export const getRecipeList = () => {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/recipeList`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      })
      .then(response => {
        dispatch({
          type: RECIPE_GET_LIST,
          payload: response.data
        });
      });
  };
};

export const getRecipeTags = () => {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/recipeTags`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      })
      .then(response => {
        dispatch({
          type: RECIPE_GET_TAGS,
          payload: response.data
        });
      });
  };
};


export const getRecipe = g => {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/recipe/${g}`, {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      })
      .then(response => {
        dispatch({
          type: RECIPE_DETAIL,
          payload: response.data
        });
      });
  };
};

export const recipeReset = () => {
  return function(dispatch) {
    dispatch({ type: RECIPE_RESET });
  };
};

export const uploadRecipeImage = (file) => {
  return function(dispatch) {
    // axios
    //   .post(
    //     `${ROOT_URL}/api/upload/`,
    //     {
    //       ingText: ingredientText
    //     },
    //     {
    //       headers: {
    //         Authorization: "JWT " + localStorage.getItem("token")
    //       }
    //     }
    //   )
    //   .then(response => {
    //     dispatch({
    //       type: RECIPE_PARSE_INGREDIENTS,
    //       payload: response.data
    //     });
    //   });
    // let fileName = 'C:/Users/r3dh2t/Desktop/testImg2.jpg'
    const formData = new FormData();
    formData.append('file',file)
    formData.append('remark','blah blah blah')
    axios.post( `${ROOT_URL}/upload/`,
      formData,
      {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "JWT " + localStorage.getItem("token")
        }
      }
    ).then(function(){
      console.log('SUCCESS!!');
    })
    .catch(function(){
      console.log('FAILURE!!');
    });

  };
};

export const createNewRecipe = (name, tags, source, ingredients, directions, imgFile, image, recipeId) => {
  return function(dispatch) {
    //test
    const formData = new FormData();
    
    formData.append('name',name)
    formData.append('tags',tags)
    formData.append('source',source)
    formData.append('recipeId', recipeId)
    formData.append('image', image)

    // convert blob to file
    //let fileOfBlob = new File([imgFile], imgFile.name);
    if ("name" in imgFile) {
      let fileOfBlob = new File([imgFile], imgFile.name);
      formData.append("file", fileOfBlob);
      //formData.append('file',imgFile)
    }

    let formData2 = objectToFormData(ingredients, {indices: false}, formData, 'ingredients')
    let formData3 = objectToFormData(directions, {indices: false}, formData2, 'directions')

    axios
      .post(
        `${ROOT_URL}/recipeCreate`,
        formData3,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "JWT " + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        if (response.data.status === "success") {
          dispatch({type: RECIPE_RESET_INGREDIENTS})
          dispatch({type: RECIPE_RESET_DIRECTIONS})
          dispatch(resetRecipeForm());
          dispatch(push('/recipeGallery'));
      }});
  };
}