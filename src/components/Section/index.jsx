import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '../../components/MaterialUI';

const Section = ({ section, selected, selectedSections, index, handleChange }) => {
  const [checked, setChecked] = useState(selected);

  const onChangeHandler = (event) => {
    const newData = selectedSections.slice();
    if(event.target.checked) {
      newData[index].push(event.target.name);
    } else {
      const location = newData[index].indexOf(event.target.name);
      if (location > -1) {
        newData[index].splice(location, 1);
      }
    }
    handleChange([...newData]);
    setChecked(event.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel control={
        <Checkbox
          checked={checked}
          onChange={onChangeHandler}
          name={section}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      } label={section} />
    </FormGroup>
  )
};

Section.propTypes = {
  section: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedSections: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Section;
