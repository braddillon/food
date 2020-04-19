import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import _ from 'lodash';

import { groceryList_populate, deleteGroceryItem, getGroceryStores } from '../../Grocery/actions/actions';
import StoreGrocerySection from './StoreGrocerySection.js';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import ShopplingListPDF from './StorePrintedList';
import { PDFDownloadLink } from "@react-pdf/renderer";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        fullWidth: true,
        display: 'flex',
        wrap: 'nowrap',
        marginBottom: 25
    },
    button: {
        margin: 2,
        textTransform: 'none'
    },
    locked: {
        backgroundColor: 'red',
        hover: {
            backgroundColor: 'red'
        }
    },
    storeList: {
        textAlign: 'left',
        marginLeft: '1em',
    }
}));

const StoreGroceryList = (props) => {
    const componentRef = useRef();
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const stores = useSelector(state => state.stores)
    const groceries = useSelector(state => state.groceries)

    const [locked, setLocked] = React.useState(false);
    const [comboValue, setComboValue] = React.useState(4);

    useEffect(() => {
        dispatch(getGroceryStores());
        dispatch(groceryList_populate());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function deleteCheckedItems(e) {
        let itemsToDelete = _.pickBy(props.groceries, function (value, key) {
            return value.checked === true;
        });
        //let delItem = deleteGroceryItem;
        _.forOwn(itemsToDelete, function (value, key) {
            dispatch(deleteGroceryItem(key));
        });
    }

    function comboChange(e) {
        setComboValue(e.target.value);
    }

    function buildList() {
        const sections = stores[comboValue].sections;

        if (!_.isEmpty(stores))
            return Object.keys(stores[comboValue].sections)
                .sort((a, b) => sections[a].order - sections[b].order)
                .map(section => (
                    <StoreGrocerySection key={sections[section].id} id={sections[section].id} name={sections[section].sectionName} storeId={comboValue} locked={locked} />
                ));
        else return 'empty';
    }

    let lockedClasses = classes.button;
    if (locked) {
        lockedClasses = [classes.button, classes.locked].join(' ');
    }



    if (_.isEmpty(stores))
        return <div></div>
    else {
        // Split into 2 lists
        let target_items = Object.keys(groceries).length / 2
        if (target_items > 45)
            target_items = 45
        let pages = []
        pages.push([])
        pages[0].push([])

        let colNum = 0
        const sections = stores[comboValue].sections;
        Object.keys(sections).sort((a, b) => sections[a].order - sections[b].order).reduce((total, item) => {
            let section_length = Object.keys(groceries).filter(key => groceries[key].grocerySections[comboValue] == item).length
            if (section_length > 0) {
                if ((total <= target_items)) {
                    pages[pages.length - 1][colNum].push(item)
                } else {
                    if (colNum === 1) {
                        pages.push([])
                        pages[pages.length - 1].push([])
                        colNum = 0
                        pages[pages.length - 1][colNum].push(item)
                    }
                    else {
                        colNum = colNum + 1
                        pages[pages.length - 1].push([])
                        pages[pages.length - 1][colNum].push(item)
                    }
                    total = 0
                }
            }
            return total + section_length
        }, 0)

        return (
            <div className={classes.storeList}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="stores">Store:</InputLabel>
                    <Select
                        value={comboValue}
                        onChange={comboChange}
                        disabled={locked}
                        inputProps={{
                            name: 'stores',
                            id: 'stores'
                        }}
                    >
                        {_.map(stores, store => (
                            <MenuItem value={store.id} key={store.id}>
                                {store.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <Button variant="contained" color="secondary" className={classes.button} onClick={deleteCheckedItems} disabled={locked}>
                    Remove Item
                </Button>
                <Button variant="contained" color="secondary" className={lockedClasses} onClick={() => setLocked(prevState => !prevState)}>
                    Lock
                </Button>
                <PDFDownloadLink document={<ShopplingListPDF store={comboValue} sections={stores[comboValue].sections} groceries={groceries} pages={pages} />} fileName="shopping_list.pdf">
                    Download PDF
                </PDFDownloadLink >
                {buildList()}
            </div>
        );

    }
}



// const mapDispatchToProps = {
//     getGroceryStores,
//     groceryList_populate,
//     deleteGroceryItem
// };

// const StoreGroceryListContainer = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(StoreGroceryList);
// export default withStyles(styles)(StoreGroceryListContainer);
export default StoreGroceryList