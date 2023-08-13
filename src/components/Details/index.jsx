import React from "react";
import PropTypes from 'prop-types';

import { Typography } from '../../components/MaterialUI';

const Details = ({ version, semester }) => {
  return (
    <>
      <Typography variant="h4">TimeTable Generator</Typography>
      <Typography variant="h5">Version {version} - {semester}</Typography>
    </>
  )
};

Details.propTypes = {
  version: PropTypes.string,
  semester: PropTypes.string,
};

Details.defaultProps = {
  version: '1.6',
  semester: 'Spring 2023',
};

export default Details;
