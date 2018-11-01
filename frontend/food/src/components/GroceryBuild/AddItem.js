import React, { PureComponent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

// import { connect } from 'react-redux';

// import { clearMatchGroceryList, addGroceryItem } from '../../actions/actions';

const styles = theme => ({
    listItem: {
      backgroundColor: theme.palette.background.paper,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 9,
      paddingLeft: 15
    },
    active: {
        backgroundColor: '#337ab7',
        borderColor: '#337ab7',
        color: '#fff'
    },
  });

class GroceryAddItem extends PureComponent {

    onClick = (event) => {
        event.preventDefault();
        this.props.addGroceryItem(this.props.item);
    }

    render() {
        const { item, classes } = this.props;
        return (
            <ListItem key={item.id} className={classes.listItem + ' ' + (item.active ? classes.active : '')} onClick={this.onClick}>
                    {item.name}
                  </ListItem>
        );
    }
}

export default withStyles(styles)(GroceryAddItem);
