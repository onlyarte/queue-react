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
  Person as PersonIcon,
  SignIn as SignInIcon,
} from '@githubprimer/octicons-react';

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
    const { user } = this.props;
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
            {user && (
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

          {user && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <Octicon><PersonIcon x={10} /></Octicon>
                {' '}
                {user.name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Налаштування
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  ВИЙТИ
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}

          <Nav navbar>
            <NavItem>
              <NavLink tag={HashLink} to="/#login">
                <Octicon><SignInIcon x={10} /></Octicon>
                {' '}
                УВІЙТИ
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

Header.defaultProps = {
  user: undefined,
};

Header.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }),
};

export default Header;
