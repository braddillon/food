import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
// import InputLabel from '@material-ui/core/InputLabel';

const renderCheckbox = ({ input, label }) => (
  <div>
  {/* <InputLabel htmlFor={input.name}>{label}</InputLabel> */}
  <Checkbox label={label} style={{padding: 0, paddingTop: 10}}checked={input.value ? true : false} onChange={input.onChange} />
  </div>
);

export default renderCheckbox;
