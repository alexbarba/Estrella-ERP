import React, { useState } from "react";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components

import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";

const useStyles = makeStyles(styles);

export const CustomSelect = ({ props }) => {
  const [selected, setSelected] = useState("");
  const { name, onOpen, options, defaultSelected, onChange } = props;
  const handleSimple = (event) => {
    setSelected(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  const classes = useStyles();
  return (
    <FormControl fullWidth className={classes.selectFormControl}>
      <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
        {name}
      </InputLabel>
      <Select
        MenuProps={{
          className: classes.selectMenu,
        }}
        classes={{
          select: classes.select,
        }}
        value={selected ? selected : defaultSelected?._id}
        onOpen={() => onOpen()}
        onChange={handleSimple}
        inputProps={{
          name: name,
          id: name,
        }}>
        <MenuItem
          disabled
          classes={{
            root: classes.selectMenuItem,
          }}>
          {name}
        </MenuItem>
        {defaultSelected && !options && (
          <MenuItem
            classes={{
              root: classes.selectMenuItem,
              selected: classes.selectMenuItemSelected,
            }}
            value={defaultSelected._id}>
            {defaultSelected.name}
          </MenuItem>
        )}
        {options &&
          options.map((option) => {
            return (
              <MenuItem
                key={option._id}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected,
                }}
                value={option._id}>
                {option.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};
