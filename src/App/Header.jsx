import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import Octicon, {
  Squirrel as PersonIcon,
  SignIn as SignInIcon,
  SignOut as SignOutIcon,
  Tools as ToolsIcon,
} from '@githubprimer/octicons-react';

import UserContext from './UserContext';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { onUserSettingsOpen } = this.props;
    const userContext = this.context;
    const { isOpen } = this.state;

    return (
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand tag={Link} to="/" className="text-poiret">QUEUE</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-between">
          <Nav navbar>
            <NavItem>
              <NavLink tag={HashLink} to="/#search">Шукати</NavLink>
            </NavItem>
            {userContext.currentUser && (
              <Fragment>
                <NavItem>
                  <NavLink tag={Link} to="/queues">Мої черги</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/appointments">Мої зустрічі</NavLink>
                </NavItem>
              </Fragment>
            )}
          </Nav>

          {userContext.currentUser && (
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <Octicon><PersonIcon x={10} /></Octicon>
                  {' '}
                  {userContext.currentUser.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={onUserSettingsOpen}>
                    <Octicon><ToolsIcon x={10} /></Octicon>
                    {' '}
                    Налаштування
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => userContext.unset()}>
                    <Octicon><SignOutIcon x={10} /></Octicon>
                    {' '}
                    Вийти
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          )}

          {!userContext.currentUser && (
            <Nav navbar>
              <NavItem>
                <NavLink tag={HashLink} to="/#login">
                  <Octicon><SignInIcon x={10} /></Octicon>
                  {' '}
                  Увійти
                </NavLink>
              </NavItem>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    );
  }
}

Header.contextType = UserContext;

Header.propTypes = {
  onUserSettingsOpen: PropTypes.func.isRequired,
};

export default Header;
