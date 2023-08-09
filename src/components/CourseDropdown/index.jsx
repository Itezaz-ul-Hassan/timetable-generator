import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';

const CourseDropdown = ({ setRecentlyChangedCourse, courses, id, onChangeHandler, options, selectedSections }) => {
  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    maxHeight: "150px",
    paddingBottom: "0px",
  };

  return (
    <Grid item>
      <Typography variant="h6">Course {id}</Typography>
      <FormControl sx={{ m: 1, minWidth: 380 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          <Typography variant="caption">Please select a course</Typography>
        </InputLabel>
        <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={courses[id-1] ?? ""}
            onChange={(event) => {
              onChangeHandler((prevCourses) => {
                const newData = prevCourses.slice();
                newData[id-1] = event.target.value;
                return newData;
              });
              setRecentlyChangedCourse(event.target.value);
              
            }}
            autoWidth
            label="Please select a course"
          >
            {options.map((option) => {
              return (
                <MenuItem value={option}>
                  <Typography>{option}</Typography>
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Grid>
  );
};

CourseDropdown.propTypes = {
  setRecentlyChangedCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  selectedSections: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default CourseDropdown;
