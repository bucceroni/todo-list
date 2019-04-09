import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

const TextFielDate = props => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="pickers">
        <DatePicker
          keyboard
          variant="outlined"
          label="Date"
          value={props.date}
          onChange={props.onChange}
          format={"MM/DD/YYYY"}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default TextFielDate;
