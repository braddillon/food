import React from 'react';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MaterialTable, {MTableToolbar} from 'material-table'
import { push } from 'connected-react-router';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createSelector } from 'reselect';

import _ from 'lodash';

import {
  getFoodTypes,
  foodListPopulate2,
  foodDeleteItems,
  foodModifyAttribute,
  updateFoodItem,
} from '../actions/actions';

import { getGroceryStores } from '../../Grocery/actions/actions';

// import { selectFoodInListForBrowser, selectFoodTypeLookup } from '../reducers/foodReducer';
import { selectFoodTypeLookup } from '../reducers/foodReducer';
import { selectGrocerySections } from '../../Store/reducers/reducers';


const useStyles = makeStyles(theme => ({
  storeList: {
    textAlign: 'left',
    marginLeft: '1em',
    marginBottom: '1em',
  }
}));

export const selectFoodInListForBrowser = createSelector(
    state => state.food,
    (_, storeId) => storeId,
    (food, storeId) => {
      let newList = Object.keys(food).reduce((obj, item) => {
                let new_obj = {}
                new_obj['id'] = food[item].id
                new_obj['name'] = food[item].name
                new_obj['staple'] = food[item].staple
                new_obj['ignore'] = food[item].ignore
                new_obj['foodtype'] = food[item].foodtype
                new_obj['section'] = food[item].sections[storeId]
                new_obj['all_sections'] = food[item].sections
                obj.push(new_obj)
                return obj;
            }, [])
        
            return newList;
    }
  );

const FoodBrowser2 = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const foodTypes = useSelector(state => selectFoodTypeLookup(state))
  const stores = useSelector(state => state.stores)
  const [active_store, set_active_store] = React.useState('');
  const sections = useSelector(state => selectGrocerySections(state, active_store))
  const food = useSelector(state => selectFoodInListForBrowser(state, active_store))
  const [state, setState] = React.useState({
      columns: [
          { title: 'Food', field: 'name', defaultSort: 'asc' },
          { title: 'Food Type', field: 'foodtype', lookup: foodTypes },
          { title: 'Section', field: 'section', lookup: sections },
          { title: 'Staple', field: 'staple', type: 'boolean' },
          { title: 'Ignore', field: 'ignore', type: 'boolean' }
        ]
  });


  useEffect(() => {
    dispatch(getFoodTypes());
    dispatch(getGroceryStores());
    dispatch(foodListPopulate2());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setState({
      columns: [
          { title: 'Food', field: 'name', defaultSort: 'asc' },
          { title: 'Food Type', field: 'foodtype', lookup: foodTypes },
          { title: 'Section', field: 'section', lookup: sections },
          { title: 'Staple', field: 'staple', type: 'boolean' },
          { title: 'Ignore', field: 'ignore', type: 'boolean' }
        ]})
  }, [foodTypes, sections])

  useEffect(() => {
    if (!_.isEmpty(stores))
      set_active_store(Object.keys(stores)[0])
  }, [stores])

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={state.columns}
        data={food}
        title="Food Browser"
        options={{
          pageSize: 20,
          search: false,
          showTitle: true,
          sorting: true,
          filtering: true,
          selection: true,
          cellStyle: {
            padding: 5,
          },
          debounceInterval: 100,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF'
          }
        }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add Food',
            isFreeAction: true,
            onClick: (event) => dispatch(push('/food/add'))
          },
          {
            tooltip: 'Remove All Selected Foods',
            icon: 'delete',
            onClick: (evt, data) => {
              let to_delete = Object.keys(data).map(key => data[key].id)
              dispatch(foodDeleteItems(to_delete))
            }
          },
          {
            tooltip: 'Toggle staple',
            icon: 'grade',
            onClick: (evt, data) => {
              let selected = Object.keys(data).map(key => String(data[key].id))
              console.log(selected)
              dispatch(foodModifyAttribute('staple', selected))
            }
          },
          {
            tooltip: 'Toggle ignore',
            icon: 'filterList',
            onClick: (evt, data) => {
              let selected = Object.keys(data).map(key => String(data[key].id))
              dispatch(foodModifyAttribute('ignore', selected))
            }
          }

        ]}
        editable={{
          onRowUpdate: (newData, oldData) => new Promise((resolve,reject) => {
            let food_sections = food[newData.id].all_sections
            food_sections[active_store] = newData.section
            let override = Object.keys(food_sections).map( key => {
              return {storeId: key, sectionId: food_sections[key]}
            })
            let gItem = {
              id: newData.id,
              foodName: newData.name,
              foodTypeId: newData.foodtype,
              staple: newData.staple,
              overrides: override
            }
            dispatch(updateFoodItem(gItem, props, resolve));
            
          })
        }}
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <div style={{padding: '0px 10px'}}>
                Store for Section
                <Select
                        className={classes.storeList}
                        value={active_store}
                        onChange={e => set_active_store(e.target.value)}
                        disabled={false}
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
              </div>
            </div>
          ),
        }}
      />
    </div>
  )
};

export default FoodBrowser2;