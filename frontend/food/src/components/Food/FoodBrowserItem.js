import React from 'react';
import classes from './FoodBrowserItem.module.css';
import { Link } from 'react-router-dom';

const FoodBrowserItem = props => {
    return (
        <label className={classes.container} key={props.id}>
            <input type="checkbox" key={props.name} value={props.value} checked={props.value} onClick={(event) => props.checked(props.id, event.target.checked)}/>
            <span className={classes.checkmark} />
            <Link to={'/food/' + props.id} key={'foodLink' + props.id}>
                {props.name}
                { props.staple ? <i className={"fa fa-diamond " + classes.stapleIcon}></i>: "" }
                { props.ignore ? <i className={"fa fa-times-circle " + classes.ignoreIcon}></i>: "" }
                
                <br />
            </Link>
        </label>
    );
};

export default FoodBrowserItem;
