import React from "react";
import { DateTimePicker } from 'material-ui-pickers';

const renderDateTimePicker = ({ input: { onChange, value }, label, ...custom }) => {
  return (
    <div className="picker">
      <DateTimePicker label="Reading Date" value={value} onChange={onChange} animateYearScrolling={false} />
    </div>
  );
};

export default renderDateTimePicker;
