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
import { format, differenceInMinutes } from "date-fns";

export default class DropdownMenuExample extends React.Component {
  render() {
    const todoItems = this.props.todos.map(item => {
      return (
        <MenuItem text={format(item.start, "PPPP")}>
          {item.title} <Divider /> Time Required:{" "}
          {differenceInMinutes(item.end, item.start)} minutes
        </MenuItem>
      );
    });
    const exampleMenu = <Menu>{todoItems}</Menu>;
    return (
      <Example options={false} {...this.props}>
        <Popover content={exampleMenu} position={Position.BOTTOM_LEFT}>
          <Button icon="notifications" />
        </Popover>
      </Example>
    );
  }
}
