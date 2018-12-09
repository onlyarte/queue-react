import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';
import Calendar from 'react-calendar';

import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  FormGroup,
} from 'reactstrap';

class CreateSlotsModal extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      dates: [new Date(), new Date()],
      timeFrom: '09:00',
      timeTo: '17:00',
      interval: '15',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { queueId, onToggle, onSlotsCreated } = this.props;

    const {
      dates, timeFrom, timeTo, interval,
    } = this.state;

    const slots = [];

    const startDate = new Moment(dates[0]);
    const endDate = new Moment(dates[1]);

    for (const date = new Moment(startDate); date.isBefore(endDate); date.add(1, 'days')) {
      const startDateTime = Moment({
        year: date.year(),
        month: date.month(),
        day: date.date(),
        hour: timeFrom.substring(0, 2),
        minute: timeFrom.substring(3),
      });

      const endDateTime = Moment({
        year: date.year(),
        month: date.month(),
        day: date.date(),
        hour: timeTo.substring(0, 2),
        minute: timeTo.substring(3),
      });

      for (const dateTime = new Moment(startDateTime); dateTime.isBefore(endDateTime); dateTime.add(Number(interval), 'minutes')) {
        const dateTimeCopy = new Moment(dateTime);

        const slotDateTimeFrom = dateTimeCopy.toISOString();
        dateTimeCopy.add(Number(interval), 'minutes');
        const slotDateTimeTo = dateTimeCopy.toISOString();

        slots.push({
          dateTimeFrom: slotDateTimeFrom,
          dateTimeTo: slotDateTimeTo,
        });
      }
    }

    console.log(slots);

    axios.post(
      `http://localhost:8080/v1/queue/${queueId}/appointments`,
      { ranges: slots },
    )
      .then(() => {
        this.setState({
          dates: [new Date(), new Date()],
          timeFrom: '09:00',
          timeTo: '17:00',
          interval: '15',
        });

        onToggle();
        onSlotsCreated();
      })
      .catch(error => console.log(error));
  }

  render() {
    const { isOpen, onToggle } = this.props;

    const {
      dates, timeFrom, timeTo, interval,
    } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={onToggle}>
        <ModalHeader toggle={this.toggle}>Додати слоти</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <p><b>Дати</b></p>
              <Calendar
                onChange={nextDates => this.handleChange({ target: { name: 'dates', value: nextDates } })}
                locale="uk-UK"
                returnValue="range"
                selectRange
                value={dates}
                className="calendar"
                minDate={new Date()}
              />
            </FormGroup>

            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Час з</InputGroupAddon>
              <Input
                type="time"
                name="timeFrom"
                required
                value={timeFrom}
                onChange={this.handleChange}
                placeholder="09:00"
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Час до</InputGroupAddon>
              <Input
                type="time"
                name="timeTo"
                required
                value={timeTo}
                onChange={this.handleChange}
                placeholder="09:00"
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroupAddon addonType="prepend">Інтервал (хв)</InputGroupAddon>
              <Input
                type="number"
                name="interval"
                required
                value={interval}
                onChange={this.handleChange}
                placeholder="15"
              />
            </InputGroup>

            <Button type="submit" color="primary">Розбити на слоти</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

CreateSlotsModal.defaultProps = {
  isOpen: false,
};

CreateSlotsModal.propTypes = {
  queueId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onSlotsCreated: PropTypes.func.isRequired,
};

export default CreateSlotsModal;
