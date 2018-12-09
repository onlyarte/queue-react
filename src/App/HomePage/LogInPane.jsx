import React from 'react';
import axios from 'axios';

import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
} from 'reactstrap';

import UserContext from '../UserContext';

class LogInPane extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      email: '',
      password: '',
      name: '',
      address: '',
      phoneNumber: '',
      // photo: undefined,
      activeTab: 'login',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleLogIn(event) {
    event.preventDefault();

    const userContext = this.context;
    const { email, password } = this.state;

    axios.post(
      'http://localhost:8080/v1/user/login',
      { email, password },
    )
      .then(({ data: user }) => userContext.set(user))
      .catch(error => console.log(error));
  }

  handleSignUp(event) {
    event.preventDefault();

    const userContext = this.context;

    const {
      email, password, name, address, phoneNumber, photo,
    } = this.state;

    axios.post(
      'http://localhost:8080/v1/user/signup',
      {
        email, password, name, address, phoneNumber, photo,
      },
    )
      .then(({ data: user }) => userContext.set(user))
      .catch(error => console.log(error));
  }

  toggle(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    const {
      activeTab, email, password, address, name, phoneNumber, photo,
    } = this.state;

    const { currentUser } = this.context;
    if (currentUser) return null;

    return (
      <Container id="login">
        <Row>
          <Col md={{ size: 6, offset: 3 }} className="py-5">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === 'login' ? 'active' : ''}
                  onClick={() => { this.toggle('login'); }}
                >
                  Вхід
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === 'signup' ? 'active' : ''}
                  onClick={() => { this.toggle('signup'); }}
                >
                  Реєстрація
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="login" className="my-2">
                <Form onSubmit={this.handleLogIn}>
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                    <Input type="email" name="email" required value={email} onChange={this.handleChange} />
                  </InputGroup>

                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">Пароль</InputGroupAddon>
                    <Input type="password" name="password" required value={password} onChange={this.handleChange} />
                  </InputGroup>

                  <Button type="submit" color="primary">
                    Увійти
                  </Button>
                </Form>
              </TabPane>

              <TabPane tabId="signup" className="my-2">
                <Form onSubmit={this.handleSignUp}>
                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                    <Input type="email" name="email" required value={email} onChange={this.handleChange} />
                  </InputGroup>

                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">Пароль</InputGroupAddon>
                    <Input type="password" name="password" required value={password} onChange={this.handleChange} />
                  </InputGroup>

                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">{'Ім\'я або організація'}</InputGroupAddon>
                    <Input type="text" name="name" required value={name} onChange={this.handleChange} />
                  </InputGroup>

                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">Адреса</InputGroupAddon>
                    <Input type="string" name="address" required value={address} onChange={this.handleChange} />
                  </InputGroup>

                  <InputGroup className="mb-2">
                    <InputGroupAddon addonType="prepend">Номер телефону</InputGroupAddon>
                    <Input type="tel" name="phoneNumber" required value={phoneNumber} onChange={this.handleChange} />
                  </InputGroup>

                  {/* <FormGroup>
                    <CustomInput
                      type="file"
                      name="photo"
                      label={photo ? photo.name : 'Фото профілю'}
                      // required
                      onChange={e => this.setState({ photo: e.target.files[0] })}
                    />
                  </FormGroup> */}

                  <Button type="submit" color="primary">
                    Зареєструватися
                  </Button>
                </Form>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    );
  }
}

LogInPane.contextType = UserContext;

export default LogInPane;
