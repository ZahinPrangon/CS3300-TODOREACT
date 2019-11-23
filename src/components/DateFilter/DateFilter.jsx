import React from "react";
// import PropTypes from "prop-types";
import { AnchorButton, Popover, Position } from "@blueprintjs/core";
import DateSelector from "../DateSelector/DateSelector";

const DateFilter = ({ todos, onDateFilterChange }) => {
  return (
    <div>
      <Popover
        content={<DateSelector todos={todos} onSelect={onDateFilterChange} />}
        position={Position.BOTTOM_LEFT}
        minimal
      >
        <AnchorButton minimal rightIcon="caret-down" icon="time" className="">
          TODOS
        </AnchorButton>
      </Popover>
    </div>
  );
};

export default DateFilter;
