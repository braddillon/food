import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const FoodForm_SectionOverride_Dialog = (props) => {
    return (
        <Dialog open={props.open} onClose={props.handleSectionDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                Add Store Override
                </DialogTitle>
            <DialogContent>

                <List component="nav" aria-label="main mailbox folders">
                    {Object.keys(props.emptyStores).map(key =>
                        <ListItem key={key} button onClick={() => props.handleSectionOverrideSubmit(key, props.emptyStores[key].defaultSection)}>
                            <ListItemText primary={props.emptyStores[key].name} />
                        </ListItem>
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleSectionDialogClose} color="primary">
                    Cancel
                    </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FoodForm_SectionOverride_Dialog;