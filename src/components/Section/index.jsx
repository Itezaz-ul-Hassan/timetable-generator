import React, { useState } from "react";
import PropTypes from "prop-types";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Section = ({section}) => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name={section}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      } label={section} />
    </FormGroup>
  )
};

Section.propTypes = {
  section: PropTypes.string.isRequired,
};

export default Section;
