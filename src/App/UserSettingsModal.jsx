import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  Alert,
} from 'reactstrap';

import UserContext from './UserContext';

class UserSettingsModal extends Component {
  constructor(props, userContext) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);

    this.state = {
      email: userContext.currentUser.email || '',
      name: userContext.currentUser.name || '',
      address: userContext.currentUser.address || '',
      phoneNumber: userContext.currentUser.phoneNumber || '',
      // photo: undefined,
      oldPassword: '',
      newPassword: '',
      infoFormMessage: undefined,
      passwordFormMessage: undefined,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleInfoSubmit(event) {
    event.preventDefault();

    const userContext = this.context;

    const {
      email, name, address, phoneNumber,
    } = this.state;

    axios.patch(
      `http://localhost:8080/v1/user/${userContext.currentUser.userId}`,
      {
        email, name, address, phoneNumber,
      },
    )
      .then(({ data: updatedUser }) => userContext.set(updatedUser))
      .then(() => this.setState({ infoFormMessage: 'Зміни збережено' }))
      .catch((error) => {
        console.log(error);
        this.setState({ infoFormMessage: 'Щось пішло не так' });
      });
  }

  handlePasswordSubmit(event) {
    event.preventDefault();

    const userContext = this.context;

    const { oldPassword, newPassword } = this.state;

    axios.patch(
      `http://localhost:8080/v1/user/${userContext.currentUser.userId}`,
      { oldPassword, newPassword },
    )
      .then(() => this.setState({ passwordFormMessage: 'Зміни збережено' }))
      .catch((error) => {
        console.log(error);
        this.setState({ passwordFormMessage: 'Щось пішло не так' });
      });
  }

  render() {
    const { isOpen, onToggle } = this.props;

    const {
      email, name, address, phoneNumber, oldPassword, newPassword,
      infoFormMessage, passwordFormMessage,
    } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={onToggle}>
        <ModalHeader toggle={this.toggle}>Налаштування профілю</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleInfoSubmit} className="mb-3">
            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
              <Input type="email" name="email" required value={email} onChange={this.handleChange} />
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

            {infoFormMessage && (
              <Alert color="secondary">
                {infoFormMessage}
              </Alert>
            )}

            <Button type="submit" color="primary">
              Оновити
            </Button>
          </Form>

          <Form onSubmit={this.handlePasswordSubmit}>
            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Старий пароль</InputGroupAddon>
              <Input type="password" name="oldPassword" required value={oldPassword} onChange={this.handleChange} />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Новий пароль</InputGroupAddon>
              <Input type="password" name="newPassword" required value={newPassword} onChange={this.handleChange} />
            </InputGroup>

            {passwordFormMessage && (
              <Alert color="secondary">
                {passwordFormMessage}
              </Alert>
            )}

            <Button type="submit" color="primary">
              Змінити
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

UserSettingsModal.contextType = UserContext;

UserSettingsModal.defaultProps = {
  isOpen: false,
};

UserSettingsModal.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

export default UserSettingsModal;
