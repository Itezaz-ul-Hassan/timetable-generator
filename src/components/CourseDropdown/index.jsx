import React from 'react';
import PropTypes from 'prop-types';


const CourseDropdown = ({ id, onChangeHandler, options }) => {
  return (
    <div>
      <h3>Course {id + 1}</h3>
      <select onChange={onChangeHandler}>
        <option value="Please select a course" selected>Please select a course</option>
          {options.map((option) => {
            return <option value={option}>{option}</option>
          })}
      </select>
    </div>
  );
};

CourseDropdown.propTypes = {
  id: PropTypes.number.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default CourseDropdown;
