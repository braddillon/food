import React, { PureComponent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import IconDelete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';




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
    iconButton: {
        padding: 0,
        marginLeft: 'auto',
        marginRight: 5,
    }
  });

class GroceryItem extends PureComponent {

    render() {
        const { item, classes } = this.props;
        return (
            <ListItem key={item.id} className={classes.listItem} >
                    {item.name}
                    <IconButton variant="fab" color="secondary" aria-label="Edit" className={classes.iconButton} onClick={this.props.onDelete}>
                        <IconDelete>edit_icon</IconDelete>
                    </IconButton>
                  </ListItem>
        );
    }
}

export default withStyles(styles)(GroceryItem);