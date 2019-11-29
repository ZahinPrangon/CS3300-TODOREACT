import React from "react";
import { Navbar, Alignment, Tabs, Tab } from "@blueprintjs/core";

class SecondaryNav extends React.Component {
  render() {
    // {<strong></strong>}
    return (
      <div>
        <Navbar>
          <Navbar.Group>
            <Navbar.Heading>
              Current page: {this.props.navbarTabId}
            </Navbar.Heading>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            {/* controlled mode & no panels (see h1 below): */}
            <Tabs
              animate={this.props.animate}
              id="navbar"
              large={true}
              onChange={this.props.handleNavbarTabChange}
              selectedTabId={this.props.navbarTabId}
            >
              <Tab id="Files" title="Files" />
              <Tab id="Builds" title="Builds" />
            </Tabs>
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

export default SecondaryNav;
