import React from "react";
import PropTypes from "prop-types";

const Section = ({section}) => {
  return (
    <div>
      <label>
        <input type="checkbox" value="" checked name={section} /> {section}
      </label>
    </div>
  )
};

Section.propTypes = {
  section: PropTypes.string.isRequired,
};

export default Section;
