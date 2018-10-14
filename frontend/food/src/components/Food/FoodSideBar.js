import React, { PureComponent } from 'react';
import _ from 'lodash';

class FoodSideBar extends PureComponent {
    state = {
        search: '',
        staple: false,
        ignore: false,
        recMod: false,
        foodTypes: []
    }

    handleChangeFoodType = (e, key) => {
        let checked = e.target.checked
        if(checked === true) {
            this.setState((previousState, currentProps) => {
                return {foodTypes: [...previousState.foodTypes, key]}
            });
        } else {
            this.setState((previousState, currentProps) => {
                return {foodTypes: previousState.foodTypes.filter(id => id !== key)}
            });
        }
    }

    render() {
        return (
            <div align="left">
                <div className="sidebar-header">
                    <h3>Filters</h3>
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={(event) => this.setState({search: event.target.value})}
                    />
                </div>

                <div className="sidebar-categories">
                    <b>Food Types</b>
                </div>

                {_.map(this.props.foodTypes, foodType => (
                    <div
                        className="checkbox sidebar-checkbox-line"
                        key={foodType.id}
                    >
                        <label>
                            <input
                                type="checkbox"
                                key={foodType.name}
                                onChange={(e) => this.handleChangeFoodType(e, foodType.id)}
                                value=""
                            />
                            {foodType.name}
                        </label>
                    </div>
                ))}

                <div className="sidebar-categories">
                    <b>Other Tags</b>
                </div>

                <div className="checkbox sidebar-checkbox-line">
                    <label>
                        <input type="checkbox" value="" onChange={(e) => this.setState({ staple: e.target.checked })}/>Staple
                    </label>
                </div>
                <div className="checkbox sidebar-checkbox-line">
                    <label>
                        <input type="checkbox" value="" onChange={(e) => this.setState({ ignore: e.target.checked })}/>Ignore
                    </label>
                </div>

                <div className="checkbox sidebar-checkbox-line">
                    <label>
                        <input type="checkbox" value="" onChange={(e) => this.setState({ recMod: e.target.checked })}/>Recently Modified
                    </label>
                </div>

                <br />
                <div align="left">
                    <button
                        align="right"
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            this.props.foodListPopulate(this.state.search, this.state.foodTypes, this.state.staple, this.state.ignore, this.state.recMod);
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
        );
    }
}

export default FoodSideBar;
