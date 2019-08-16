import React from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const renderComboBox = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <div>
    <InputLabel htmlFor={input.name} style={{ marginRight: 10 }}>
      {label}
    </InputLabel>
    <Select
      {...input}
      children={children}
      onChange={event => {
        input.onChange(event.target.value);
      }}
      {...custom}
    />
  </div>
);

export default renderComboBox;
