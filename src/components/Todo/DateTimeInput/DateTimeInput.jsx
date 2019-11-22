import React from "react";
import DateTimePicker from "react-datetime-picker";

const DateTimeInput = () => {
  return (
    <div>
      <DateTimePicker />
    </div>
  );
};

// DateTimeInput.propTypes = {
//   date: PropTypes.instanceOf(Date),
//   isAllDay: PropTypes.bool.isRequired,
//   onSelect: PropTypes.func.isRequired
// };

// DateTimeInput.defaultProps = {
//   date: null
// };

export default DateTimeInput;
