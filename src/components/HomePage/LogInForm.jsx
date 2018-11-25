import React from 'react';

import {
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
  FormGroup,
  CustomInput,
} from 'reactstrap';

class LogInForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      email: '',
      password: '',
      name: '',
      phoneNumber: '',
      photo: undefined,
      activeTab: 'login',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  toggle(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    const { activeTab, email, password, name, phoneNumber, photo } = this.state;

    return (
      <div>
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
            <Form>
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
            <Form>
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
                <InputGroupAddon addonType="prepend">Номер телефону</InputGroupAddon>
                <Input type="tel" name="phoneNumber" required value={phoneNumber} onChange={this.handleChange} />
              </InputGroup>

              <FormGroup>
                <CustomInput
                  type="file"
                  name="photo"
                  label={photo ? photo.name : 'Фото профілю'}
                  required
                  onChange={e => this.setState({ photo: e.target.files[0] })}
                />
              </FormGroup>

              <Button type="submit" color="primary">
                Зареєструватися
              </Button>
            </Form>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default LogInForm;
