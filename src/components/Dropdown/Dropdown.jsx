import React from "react";

import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
  Divider
} from "@blueprintjs/core";
import { Example } from "@blueprintjs/docs-theme";
import { format, differenceInMinutes, compareAsc } from "date-fns";

export default class DropdownMenuExample extends React.Component {
  render() {
    const todoItems = this.props.todos
      .sort((item1, item2) => compareAsc(item1.start, item2.start))
      .map(item => {
        let hours = differenceInMinutes(item.end, item.start) / 60;
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return (
          <MenuItem text={format(item.start, "PPPP")}>
            {item.title} <Divider /> Time Required: {rhours} <b>hr</b>{" "}
            {rminutes} <b>min</b>
          </MenuItem>
        );
      });
    const exampleMenu = <Menu>{todoItems}</Menu>;
    return (
      <Example options={false} {...this.props}>
        <span class="button__badge">{this.props.todos.length}</span>
        <Popover content={exampleMenu} position={Position.BOTTOM_LEFT}>
          <Button minimal icon="notifications" />
        </Popover>
      </Example>
    );
  }
}
