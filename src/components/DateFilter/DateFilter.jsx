import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { H6 } from "@blueprintjs/core";

const DateFilter = ({ todos, onDateFilterChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <H6>START DATE</H6>
      <DatePicker
        className="form-control"
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <H6>END DATE</H6>
      <DatePicker
        className="form-control"
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
};

export default DateFilter;
