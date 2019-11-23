import React, { memo } from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { isToday, isThisWeek, isAfter, isBefore, endOfWeek } from "date-fns";
import groupByDate from "../../utils/groupByDate";

const getFilters = (obj, onSelect) =>
  Object.keys(obj).map(key => (
    <MenuItem
      key={key}
      text={key}
      label={obj[key].length}
      name={key}
      onClick={onSelect}
    />
  ));

// Checks the number of todos available for today, thisWeek and upcoming
const getStats = list => ({
  totalToday: list.filter(todo => isToday(todo.date)).length,
  thisWeek: groupByDate(
    list,
    todo =>
      isAfter(todo.date, new Date()) &&
      isBefore(todo.date, endOfWeek(new Date()))
  ),
  upcoming: groupByDate(list, todo => !isThisWeek(todo.date))
});

const DateSelector = props => {
  const { todos } = props;
  const { totalToday, thisWeek, upcoming } = getStats(todos);
  const { onSelect } = props;

  const handleTodayFilter = () => onSelect({ key: "Today", value: new Date() });
  const handleOtherFilter = e => {
    const [firstTodo] = thisWeek[e.target.name] || upcoming[e.target.name];
    onSelect({
      key: e.target.name,
      value: firstTodo.date
    });
  };

  return (
    <Menu className="">
      <MenuItem text="Today" label={totalToday} onClick={handleTodayFilter} />
      {getFilters(thisWeek, handleOtherFilter)}
      <MenuDivider title="Upcoming" />
      {getFilters(upcoming, handleOtherFilter)}
      {!Object.entries(upcoming).length && (
        <MenuItem text="Nothing yet!" disabled />
      )}
    </Menu>
  );
};

export default memo(DateSelector);
