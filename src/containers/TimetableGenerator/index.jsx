import React from 'react';
import PropTypes from 'prop-types';

import { Button, Grid } from '../../components/MaterialUI';
import Timetable from "../../components/Timetable";


const TimetableGenerator = ({ onSubmit, selectedTime, handleChange, setButtonClicked }) => {
  return (
    <>
      <Timetable state={selectedTime} handleChange={handleChange} />
      <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 3 }}>
        <Button variant="contained" onClick={() => {
          onSubmit();
          setButtonClicked(true);
        }}>Generate</Button>
      </Grid>
    </>
  );
};

TimetableGenerator.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedTime: PropTypes.array.isRequired,
  setButtonClicked: PropTypes.func.isRequired,
};

export default TimetableGenerator;
