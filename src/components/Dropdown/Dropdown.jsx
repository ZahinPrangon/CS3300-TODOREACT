import React from "react";

import {
  Button,
  Menu,
  MenuItem,
  Popover,
  Position,
  Divider
} from "@blueprintjs/core";
import { Example } from "@blueprintjs/docs-theme";
import { format, differenceInMinutes, compareAsc } from "date-fns";

export default class DropdownMenuExample extends React.Component {
  render() {
    const { todos } = this.props;
    const todoItems = todos
      .sort((item1, item2) => compareAsc(item1.start, item2.start))
      // .filter(item => isToday(item.start))
      .map(item => {
        let hours = differenceInMinutes(item.end, item.start) / 60;
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return (
          <Menu>
            <MenuItem text={`${format(item.start, "PPPP")}`}>
              {item.title} <Divider /> Ends in {format(item.end, "PPPP")}{" "}
              <Divider /> Time Required: {rhours} <b>hr</b> {rminutes}{" "}
              <b>min</b>
            </MenuItem>
          </Menu>
        );
      });

    // const upcomingItems = todos
    //   .sort((item1, item2) => compareAsc(item1.start, item2.start))
    //   .filter(item => isToday(item.start) === false)
    //   .map(item => {
    //     let hours = differenceInMinutes(item.end, item.start) / 60;
    //     let rhours = Math.floor(hours);
    //     let minutes = (hours - rhours) * 60;
    //     let rminutes = Math.round(minutes);
    //     return (
    //       <Menu>
    //         <MenuItem text={`${format(item.start, "PPPP")}`}>
    //           {item.title} <Divider /> Ends in {format(item.end, "PPPP")}{" "}
    //           <Divider /> Time Required: {rhours} <b>hr</b> {rminutes}{" "}
    //           <b>min</b>
    //         </MenuItem>
    //       </Menu>
    //     );
    //   });

    const exampleMenu = <Menu>{todoItems}</Menu>;
    const nothingMenu = (
      <Menu>
        <MenuItem className="text-bold" text="Nothing To Show" />
      </Menu>
    );
    return (
      <Example options={false} {...this.props}>
        <span class="button__badge">{todos.length}</span>
        <Popover
          content={todos.length > 0 ? exampleMenu : nothingMenu}
          position={Position.BOTTOM_LEFT}
        >
          <Button minimal icon="notifications" />
        </Popover>
      </Example>
    );
  }
}
