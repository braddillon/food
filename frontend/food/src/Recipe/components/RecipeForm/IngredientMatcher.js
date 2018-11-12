import React, { Component } from 'react';
import IngredientMatcherItem from './IngredientMatcherItem';
import IngredientPicker from './IngredientPicker';

class IngredientMatcher extends Component {
    state = {
        openPicker: false,
        callerId: 0
    }

    // togglePicker = () => {
    //     this.setState( (prevState) => ({ openPicker: !prevState.openPicker}))
    // }

    openPicker = (tmpId) => {
        this.setState({openPicker: true, callerId: tmpId})
    }

    closePicker = () => {
        this.props.onResetPossibleIngredients();
        this.setState({ openPicker: false, callerId: 0})
    }


    render() {
        // console.log(props)
        return (
            <div>
                <IngredientPicker
                        open={this.state.openPicker}
                        closePicker={this.closePicker}
                        possibleIngredients={this.props.possibleIngredients}
                        onPickPossibleIngredients={this.props.onPickPossibleIngredients}
                        onResetPossibleIngredients={this.props.onResetPossibleIngredients}
                        onAdhocIngredientMatch={this.props.onAdhocIngredientMatch}
                        callerId={this.state.callerId}
                        // onClose={this.handleExerciseDialogClose}
                        // exercises={this.props.exercises}
                        // exerciseTypes={this.props.exerciseTypes}
                        // createActivity={this.props.createActivity}
                    />
                {Object.keys(this.props.parsedIngredients).map( (item) => {
                    return <IngredientMatcherItem key={'imi' + item} {...this.props.parsedIngredients[item]} onChangeMatch={this.props.onChangeMatch} openPicker={this.openPicker}  /> 
                }
                )}
            </div>
        );
    }
}
    
export default IngredientMatcher;