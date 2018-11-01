import React from "react";
import { DatePicker } from "material-ui-pickers";

const renderDatePicker = ({ input: { onChange, value }, meta: { touched, error }, label, ...custom }) => {
  return (
    <div className="picker">
      <DatePicker label={label} value={value} onChange={onChange} {...custom} animateYearScrolling={false} />
      {touched && error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
};

export default renderDatePicker;
