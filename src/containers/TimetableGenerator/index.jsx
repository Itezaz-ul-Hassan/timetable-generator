import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

import Timetable from "../../components/Timetable";


const TimetableGenerator = ({selectedTime}) => {
  return (
    <>
      <Timetable state={selectedTime} />
      <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 3 }}>
        <Button variant="contained">Generate</Button>
      </Grid>
    </>
  );
};

TimetableGenerator.propTypes = {
  selectedTime: PropTypes.array.isRequired,
};

export default TimetableGenerator;
