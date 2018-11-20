import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    root: {
        marginBottom: 10,
        display: 'flex'
    },
    matchButton: {
        margin: theme.spacing.unit,
        fontSize: 10,
        padding: 1
    },
    label: {
        fontSize: '1em',
        paddingRight: 25,
        paddingLeft: 15,
        paddingTop: 15
    },
    ingComboBox: {
        minWidth: 200
    },
    catComboBox: {
        minWidth: 50
    },
    cell: {
        padding: 5
    }
});

const IngredientMatcherItem = props => {
    const { classes } = props;

    return (
        <TableRow>
            <TableCell className={classes.label}>{props.name}</TableCell>
            <TableCell className={classes.cell}>
                {!_.isEmpty(props.potentialMatches) ? (
                    <Select
                        value={String(props.selection)}
                        onChange={e =>
                            props.onChangeMatch(props.tmpId, e.target.value)
                        }
                        className={classes.ingComboBox}
                    >
                        {Object.keys(props.potentialMatches).map(item => (
                            <MenuItem key={item} value={String(item)}>
                                {props.potentialMatches[item]}
                            </MenuItem>
                        ))}
                    </Select>
                ) : null}

                <IconButton
                    color="primary"
                    onClick={() => props.openPicker(props.tmpId)}
                >
                    <EditIcon />
                </IconButton>
            </TableCell>

            <TableCell className={classes.cell}>
                <Select
                    value={String(props.section)}
                    onChange={e =>
                        props.onChangeSection(props.tmpId, e.target.value)
                    }
                    className={classes.catComboBox}
                >
                    {Object.keys(props.sections).map(item => (
                        <MenuItem key={item} value={String(item)}>
                            {props.sections[item].name}
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
        </TableRow>
    );
};

export default withStyles(styles)(IngredientMatcherItem);
