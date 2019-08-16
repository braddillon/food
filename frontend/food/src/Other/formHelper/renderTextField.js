import React from "react";
import TextField from "@material-ui/core/TextField";


const renderTextField = ({ input, label, type, meta: { touched, error }, ...custom }) => (
  <div>
    <TextField name={input} label={label} fullWidth type={type} {...input} {...custom} />
    {touched && error && <span style={{ color: "red" }}>{error}</span>}
  </div>
);

export default renderTextField;
