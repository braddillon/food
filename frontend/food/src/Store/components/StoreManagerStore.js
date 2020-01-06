import React from 'react';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import { Droppable } from 'react-beautiful-dnd';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash';

import { addStoreSection, editStoreSection, removeStoreSection } from '../actions/actions';
import { updateFoodTypeSectionDefaults } from '../../Food/actions/actions';

import StoreManagerSection from './StoreManagerSection';
import StoreManagerFoodType from './StoreManagerFoodType';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        border: '0px solid lightgrey',
        margin: '4px 4px 20px 4px',
        borderRadius: '2px'
    },
    title: {
        margin: '2px',
        display: 'inline',
        height: '80px',
        fontSize: '25px'
    },
    storeName: {
        margin: '20px 15px 50px 0px',
        display: 'inline',
        fontSize: '35px'
    },
    storeNameSection: {
        margin: '40px 0px 10px 0px'
    },
    section: {
        marginLeft: '15px',
    },
    foodTypesBox: {
        border: '1px solid lightgrey',
        borderRadius: '2px',
        padding: '8px',
        marginTop: '15px',
        background: '	#F5F5F5',
        minHeight: '30px',
        width: '82%'
    },
    icon: {
        fontSize: '30px',
        marginBottom: '10px'
    },
    iconGroup: {
        display: 'inline',
        marginLeft: '25px',
        float: 'right'
    }

}));


const StoreManagerStore = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [dialogSectionName, setDialogSectionName] = React.useState('');
    const [dialogSectionId, setDialogSectionId] = React.useState(0);

    function handleSectionDialogClickOpen(dlgSectionId) {
        setDialogSectionId(dlgSectionId);
        setOpen(true);
    }

    function handleSectionDialogClose() {
        setDialogSectionName('')
        setDialogSectionId(0)
        setOpen(false);
    }

    function handleSectionDialogSubmit() {

        if (dialogSectionId !== 0) {
            dispatch(editStoreSection(dialogSectionId, dialogSectionName, props.sections[dialogSectionId].order, props.id));
        }
        else {
            dispatch(addStoreSection(dialogSectionName, props.id));
        }
        setDialogSectionName('')
        setDialogSectionId(0)
        setOpen(false);
    }

    function handleEditSection(dlgSectionId) {
        setDialogSectionId(dlgSectionId);
        setDialogSectionName(props.sections[dlgSectionId].sectionName);
        setOpen(true);
    }

    function handleRemoveSection(storeId, sectionId) {
        console.log("remove")
        console.log(props)
        console.log(sectionId)
        if (_.has(props.foodTypeSections, sectionId)) {
            console.log("hit if statement")
            // Shift section food items back to undeclared
            let updatedDefaultSections = props.foodTypeSections[sectionId].reduce((obj, key) => {
                const { [storeId]: value, ...tempDefaultSection } = props.foodTypes[key].defaultSection
                obj[key] = tempDefaultSection
                return obj
            }, {});
            let newState = { ...props.foodTypes }
            Object.keys(updatedDefaultSections).forEach( key => {
                newState[key] = {...props.foodTypes[key], defaultSection: updatedDefaultSections[key]}
            })
            console.log(newState)
            dispatch(updateFoodTypeSectionDefaults(newState, storeId));
        }
        dispatch(removeStoreSection(storeId, sectionId));
    }

    return (
        <div className={classes.root} onClick={props.onSetActive}>

            <div className={classes.storeNameSection}>
                <Typography variant="h3" className={classes.storeName}>{props.name}</Typography>

                <IconButton aria-label='edit' color="primary" className={classes.icon} onClick={props.onStoreEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label='delete' color="primary" className={classes.icon} onClick={props.onStoreDelete}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <h1 className={classes.title}>Section</h1>
                    <div className={classes.iconGroup} >
                        <IconButton aria-label='add section' color="primary" className={classes.icon} onClick={() => handleSectionDialogClickOpen(0)}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <Divider variant="middle" />

                    <Droppable droppableId={props.id.toString()} type="section">
                        {(provided) => (
                            <div className={classes.section}
                                ref={provided.innerRef}
                                {...provided.droppableProps}

                            >
                                <Dialog open={open} onClose={handleSectionDialogClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">
                                        {dialogSectionId === 0 ? "Add Section" : "Edit Section"}
                                    </DialogTitle>
                                    <DialogContent>

                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="sectionname"
                                            label="Section Name"
                                            value={dialogSectionName}
                                            onChange={e => setDialogSectionName(e.target.value)}
                                            onKeyPress={(ev) => {
                                                if (ev.key === 'Enter') {
                                                    handleSectionDialogSubmit();
                                                    ev.preventDefault();
                                                }
                                            }}
                                            type="text"
                                            fullWidth
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleSectionDialogSubmit} color="primary">
                                            {dialogSectionId === 0 ? "Add" : "Save"}
                                        </Button>
                                        <Button onClick={handleSectionDialogClose} color="primary">
                                            Cancel
                        </Button>
                                    </DialogActions>
                                </Dialog>

                                {props.active && Object.keys(props.sections)
                                    .sort((a, b) => {
                                        return props.sections[a].order - props.sections[b].order;
                                    }).map((sectionId, index) => (
                                        <StoreManagerSection key={sectionId} {...props.sections[sectionId]} foodTypes={props.foodTypes} food_in_sections={props.foodTypeSections[sectionId]} index={index} onSectionEdit={() => handleEditSection(sectionId)} onSectionDelete={() => handleRemoveSection(props.id, sectionId)} />
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <h1 className={classes.title}>Food Types</h1>
                    <Divider variant="middle" />
                    <Droppable droppableId={"foodTypeDroppable"} type="food">
                        {(provided) => (
                            <div className={classes.foodTypesBox}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div>
                                    {props.foodTypeSectionsUnassigned.map(key => (
                                        <StoreManagerFoodType id={"untagged" + key} key={key} name={props.foodTypes[key].name} order={parseInt(key)} />
                                    ))}

                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </Grid>
            </Grid>
        </div>
    );
};

export default StoreManagerStore;