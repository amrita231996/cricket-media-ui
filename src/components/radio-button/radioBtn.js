import * as React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { PropTypes } from "carbon-components-react";

export default function RadioBtn(props) {
  return (
    <FormControl>
      <FormLabel id="radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {props.children}
      </RadioGroup>
    </FormControl>
  );
}
