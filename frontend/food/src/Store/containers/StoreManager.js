import React from 'react';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import StoreManagerStore from '../components/StoreManagerStore';
import { DragDropContext } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash'

import { getGroceryStores } from '../../Grocery/actions/actions';
import { getFoodTypes, updateFoodTypeSectionDefaults } from '../../Food/actions/actions';
import { updateStoreSectionOrder, editStore, addStore, removeStore } from '../actions/actions';
import { selectFoodTypeSections, selectFoodTypeSectionsUnassigned } from '../../Food/reducers/foodReducer';
//import { selectFirstStore } from '../../Store/reducers/reducers';

import {
    STORE_UPDATE_SECTION_ORDER
} from '../actions/types';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    }
}));

const StoreManager = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const storeList = useSelector(state => state.stores)
    const foodTypes = useSelector(state => state.foodTypes)

    const [open, setOpen] = React.useState(false);
    const [activeStore, setActiveStore] = React.useState('');
    const [addedStore, setAddedStore] = React.useState('');
    const [deletedStore, setDeletedStore] = React.useState('');
    const foodTypeSections = useSelector(state => selectFoodTypeSections(state, activeStore))
    const foodTypeSectionsUnassigned = useSelector(state => selectFoodTypeSectionsUnassigned(state, activeStore))
    const [dialogStoreName, setDialogStoreName] = React.useState('');
    const [dialogStoreId, setDialogStoreId] = React.useState(0);

    function handleStoreDialogClickOpen(dlgStoreId) {
        setDialogStoreId(dlgStoreId);
        setOpen(true);
    }

    function handleStoreDialogClose() {
        setDialogStoreName('')
        setDialogStoreId(0)
        setOpen(false);
    }

    function handleStoreDialogSubmit() {
        if (dialogStoreId !== 0) {
            dispatch(editStore(dialogStoreId, dialogStoreName));
        }
        else {
            setAddedStore(dialogStoreName);
            dispatch(addStore(dialogStoreName));
        }
        setDialogStoreName('')
        setDialogStoreId(0)
        setOpen(false);
    }

    function handleEditStore(dlgStoreId) {
        setDialogStoreId(dlgStoreId);
        setDialogStoreName(storeList[dlgStoreId].name);
        setOpen(true);
    }

    function handleRemoveStore(dlgStoreId) {
        setDeletedStore(dlgStoreId)
        console.log("REMOVE STORE" + dlgStoreId)
        console.log("REMOVE STORE" + Object.keys(storeList)[0])
        setActiveStore(Object.keys(storeList)[0])
        dispatch(removeStore(dlgStoreId));
    }

    // function saveDefaults() {
    //     console.log("SAVE DEFAULTS for " + activeStore);
    //     console.log(foodTypes)
    //     let test = Object.keys(foodTypes).reduce((obj, key) => {
    //             if (_.has(foodTypes[key].defaultSection, activeStore)) {
    //                 obj[key] = foodTypes[key].defaultSection[activeStore].section;
    //             }
    //             return obj;
    //     }, {});
    //     console.log(test)
    // }

    useEffect(() => {
        dispatch(getGroceryStores());
        dispatch(getFoodTypes());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (activeStore === '') {
            if (!_.isEmpty(storeList)) {
                setActiveStore(Object.keys(storeList)[0])
            }
        }
        if (deletedStore !== '') {
            setActiveStore(Object.keys(storeList)[0])
            setDeletedStore('')
        }
        else if (addedStore !== '') {
            let newStore = Object.keys(storeList).filter(key => storeList[key].name === addedStore)
            if (newStore.length === 1)
                setActiveStore(newStore[0])
            setAddedStore('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeList])


    // const onDragStart = () => {
    //     console.log("on drag start")
    //     setActiveDrag(true)
    // }

    const onDragEnd = result => {
        console.log(result)
        const { destination, source } = result;
        if (!destination) {
            return;
        }

        // No change
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        //let storeToChange = { ...storeList[source.droppableId] }
        let storeToChange = { ...storeList[activeStore] }

        // Move from foodtype to section, or section to section
        if (destination.droppableId.substring(0, 11) === 'dropSection') {
            let foodId = parseInt(result.draggableId.replace('fooddraguntagged', '').replace('fooddragtagged', ''))
            let newSection = { store: parseInt(activeStore), section: parseInt(destination.droppableId.replace('dropSection', '')) }
            let newState = {
                ...foodTypes,
                [foodId]: {
                    ...foodTypes[foodId],
                    defaultSection: {
                        ...foodTypes[foodId].defaultSection,
                        [activeStore]: newSection
                    }
                }
            }
            console.log(newState)
            dispatch(updateFoodTypeSectionDefaults(newState, activeStore));
            return;
        }
        // Move from section to foodtype
        else if (source.droppableId.substring(0, 11) === 'dropSection' && destination.droppableId === 'foodTypeDroppable') {
            let foodId = parseInt(result.draggableId.replace('fooddragtagged', ''))

            const { [activeStore]: value, ...newDefaultSections } = foodTypes[foodId].defaultSection
            let newState = {
                ...foodTypes,
                [foodId]: {
                    ...foodTypes[foodId],
                    defaultSection: newDefaultSections
                }
            }
            dispatch(updateFoodTypeSectionDefaults(newState, activeStore));
            return;
        }
        // Move sections around
        else {
            let newSections = Object.keys(storeToChange.sections).reduce(function (result, key) {
                let tmp2 = {}
                tmp2.sectionName = storeToChange.sections[key].sectionName
                tmp2.id = storeToChange.sections[key].id

                if (storeToChange.sections[key].order === source.index)
                    tmp2.order = destination.index
                else if ((destination.index > source.index) &&
                    (storeToChange.sections[key].order > source.index) &&
                    (storeToChange.sections[key].order <= destination.index))
                    tmp2.order = storeToChange.sections[key].order - 1
                else if ((destination.index < source.index) &&
                    (storeToChange.sections[key].order < source.index) &&
                    (storeToChange.sections[key].order >= destination.index))
                    tmp2.order = storeToChange.sections[key].order + 1
                else
                    tmp2.order = storeToChange.sections[key].order
                result[key] = tmp2
                return result
            }, {})
            storeToChange.sections = newSections
            const newStoreList = { ...storeList, [storeToChange.id]: storeToChange }
            dispatch({ type: STORE_UPDATE_SECTION_ORDER, payload: newStoreList[storeToChange.id] });
            dispatch(updateStoreSectionOrder(newStoreList[storeToChange.id]))
        }
        console.log("end dragEnd")
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div><Select
                value={activeStore}
                onChange={e => setActiveStore(e.target.value)}
                inputProps={{
                    name: 'store',
                    id: 'store',
                }}
            >
                {Object.keys(storeList).map(key => (
                    <MenuItem key={key} value={storeList[key].id}>{storeList[key].name}</MenuItem>
                ))}
            </Select>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => handleStoreDialogClickOpen(0)}>
                    Add Store
                </Button>
                <Dialog open={open} onClose={handleStoreDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        {dialogStoreId === 0 ? "Add Store" : "Edit Store"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="storename"
                            label="Store Name"
                            value={dialogStoreName}
                            onChange={e => setDialogStoreName(e.target.value)}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    // Do code here
                                    handleStoreDialogSubmit();
                                    ev.preventDefault();
                                }
                            }}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleStoreDialogSubmit} color="primary">
                            Add
                        </Button>
                        <Button onClick={handleStoreDialogClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* {Object.keys(storeList).map(storeId => (
                    console.log(storeId)
                    // <StoreManagerStore active={activeStore === storeId ? true : false} key={storeId} {...storeList[storeId]} onStoreEdit={() => handleEditStore(storeId)} onStoreDelete={() => handleRemoveStore(storeId)} onSetActive={() => setActiveStore(storeId) }/>
                ))} */}
                {!_.isEmpty(storeList, true) && storeList[activeStore] &&
                    <StoreManagerStore active={true}
                        key={activeStore}
                        {...storeList[activeStore]}
                        foodTypeSectionsUnassigned={foodTypeSectionsUnassigned}
                        foodTypeSections={foodTypeSections}
                        foodTypes={foodTypes}
                        onStoreEdit={() => handleEditStore(activeStore)}
                        onStoreDelete={() => handleRemoveStore(activeStore)}
                        onSetActive={() => setActiveStore(activeStore)}
                    />
                }


            </div>
        </DragDropContext>
    );
};

export default StoreManager;