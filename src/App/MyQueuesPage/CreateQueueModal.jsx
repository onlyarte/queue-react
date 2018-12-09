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
  FormGroup,
  CustomInput,
} from 'reactstrap';

import UserContext from '../UserContext';

class CreateQueueModal extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      address: '',
      phoneNumber: '',
      photo: undefined,
      message: undefined,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, message: undefined });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onQueueCreated, onToggle } = this.props;
    const userContext = this.context;

    const {
      name, description, address, phoneNumber,
    } = this.state;

    axios.post(
      'http://localhost:8080/v1/queue',
      {
        name,
        description,
        address,
        phoneNumber,
        providerId: userContext.currentUser.userId,
      },
    )
      .then(() => {
        this.setState({
          message: 'Додано',
          name: '',
          description: '',
          address: '',
          phoneNumber: '',
          photo: undefined,
        });

        onToggle();
        onQueueCreated();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ message: 'Щось пішло не так' });
      });
  }

  render() {
    const { isOpen, onToggle } = this.props;

    const {
      name, description, address, phoneNumber, photo, message,
    } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={onToggle}>
        <ModalHeader toggle={this.toggle}>Створити чергу</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit} className="mb-3">
            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Назва</InputGroupAddon>
              <Input type="text" name="name" required value={name} onChange={this.handleChange} />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Опис</InputGroupAddon>
              <Input type="text" name="description" required value={description} onChange={this.handleChange} />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Адреса</InputGroupAddon>
              <Input type="string" name="address" required value={address} onChange={this.handleChange} />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Номер телефону</InputGroupAddon>
              <Input type="tel" name="phoneNumber" required value={phoneNumber} onChange={this.handleChange} />
            </InputGroup>

            <FormGroup>
              <CustomInput
                type="file"
                name="photo"
                label={photo ? photo.name : 'Лого або фото'}
                // required
                onChange={e => this.setState({ photo: e.target.files[0] })}
                id="create-queue-photo-input"
              />
            </FormGroup>

            {message && (
              <Alert color="secondary">
                {message}
              </Alert>
            )}

            <Button type="submit" color="primary">
              Створити
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

CreateQueueModal.contextType = UserContext;

CreateQueueModal.defaultProps = {
  isOpen: false,
};

CreateQueueModal.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onQueueCreated: PropTypes.func.isRequired,
};

export default CreateQueueModal;
