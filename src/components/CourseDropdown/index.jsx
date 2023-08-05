import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';


const CourseDropdown = ({ id, onChangeHandler, options }) => {
  const [age, setAge] = useState('');
  return (
    <div>
      <Typography variant="h6">Course {id}</Typography>
      {/* <select onChange={onChangeHandler}> */}
      <FormControl sx={{ m: 1, minWidth: 380 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          <Typography variant="caption">Please select a course</Typography>
        </InputLabel>
        <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            autoWidth
            label="Please select a course"
          >
          {/* <option value="Please select a course" selected>Please select a course</option> */}
            {options.map((option) => {
              return (
                <MenuItem value={option}>
                  <Typography>{option}</Typography>
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
      {/* </select> */}
    </div>
  );
};

CourseDropdown.propTypes = {
  id: PropTypes.number.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default CourseDropdown;
