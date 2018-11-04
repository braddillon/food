import React, { Component } from 'react';
import IngredientMatcherItem from './IngredientMatcherItem';
import IngredientPicker from './IngredientPicker';

class IngredientMatcher extends Component {
    state = {
        openPicker: false,
        toggleCallerId: 0
    }

    togglePicker = () => {
        this.setState( (prevState) => ({ openPicker: !prevState.openPicker}))
    }

    closePicker = () => {
        console.log("closePicker");
        this.setState({ openPicker: false})
    }


    render() {
        console.log("IngredientMatcher");
        console.log(this.state.openPicker);
        // console.log(props)
        return (
            <div>
                <IngredientPicker
                        open={this.state.openPicker}
                        closePicker={this.closePicker}
                        // onClose={this.handleExerciseDialogClose}
                        // exercises={this.props.exercises}
                        // exerciseTypes={this.props.exerciseTypes}
                        // createActivity={this.props.createActivity}
                    />
                {Object.keys(this.props.parsedIngredients).map( (item) => {
                    return <IngredientMatcherItem key={'imi' + item} {...this.props.parsedIngredients[item]} onChangeMatch={this.props.onChangeMatch} togglePicker={this.togglePicker}  /> 
                }
                )}
            </div>
        );
    }
}
    
export default IngredientMatcher;