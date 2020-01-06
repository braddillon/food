import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles({
    root: {
        border: '1px solid lightgrey',
        borderRadius: '2px',
        marginBottom: '2px',
        padding: '8px',
        background: 'white',
    },
    button: {
        padding: '0px 5px 0px 25px'
    }
});

const StoreManagerFoodType = (props) => {
    const classes = useStyles(props);
    return (
        <Draggable draggableId={"fooddrag" + props.id.toString()} index={props.order} type="food">
            {(provided) => (
                <div className={classes.root} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {props.name}
                </div>
            )}
        </Draggable>
    );
};

export default StoreManagerFoodType;