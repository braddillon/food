import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StoreManagerFoodType from './StoreManagerFoodType';

const useStyles = makeStyles({
    root: {
        border: '1px solid lightgrey',
        borderRadius: '2px',
        marginTop: '15px',
        marginBottom: '2px',
        padding: '8px',
        background: '	#F5F5F5',
    },
    button: {
        margin: '0px 0px 0px 10px',
        padding: '0px'
    },
    sectionDragSpace: {
        background: 'white',
        border: '2px grey',
        minHeight: '30px',
        width: '90%'
    },
    sectionTitle: {
        fontWeight: 'bold',
        display: 'inline'
    },
    iconGroup: {
        display: 'inline',
        marginLeft: '25px',
        float: 'right'
    },
    headerGroup: {
        minHeight: '25px',
        marginBottom: '5px'
    }
});

const StoreManagerSection = (props) => {
    
    let food = props.food_in_sections
    if (!food)
        food= []
    const classes = useStyles(props);
    return (
        <Draggable draggableId={"drag" + props.id.toString()} index={props.order} type="section">
            {(provided) => (
                <div className={classes.root} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                    <div className={classes.headerGroup}>
                    <div className={classes.sectionTitle}>{props.sectionName.toUpperCase().substring(0, 25)}</div>
                    <div className={classes.iconGroup}>
                    { props.sectionName !== 'Uncategorized' && <>
                    <IconButton className={classes.button} aria-label="edit" onClick={props.onSectionEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton className={classes.button} aria-label="edit" onClick={props.onSectionDelete}>
                        <DeleteIcon />
                    </IconButton>
                    </>
                    }
                    </div>
                    </div>
                    <Droppable droppableId={"dropSection" + props.id.toString()} type="food">
                        {(provided) => (
                            <div className={classes.sectionDragSpace}
                                ref={provided.innerRef}
                                {...provided.droppableProps} 
                            >
                                {food.map(key => (
                                    <StoreManagerFoodType id={"tagged" + key} key={key} name={props.foodTypes[key].name} order={parseInt(key)} />
                                    ))}
                                {provided.placeholder}
                                </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

export default StoreManagerSection;