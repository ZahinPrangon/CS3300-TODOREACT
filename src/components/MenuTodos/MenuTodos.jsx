import React from "react";
import { Popover, Menu, MenuItem, Position, Button } from "@blueprintjs/core";

export const MenuTodos = () => {
  return (
    <div>
      <Popover
        content={
          <Menu>
            <MenuItem text="today" />
            <MenuItem text="tommorow" />
          </Menu>
        }
        position={Position.RIGHT_BOTTOM}
      >
        <Button icon="share" text="Check upcoming todos" />
      </Popover>
    </div>
  );
};
