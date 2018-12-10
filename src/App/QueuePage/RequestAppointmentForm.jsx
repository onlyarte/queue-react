import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Moment from 'moment';
import Calendar from 'react-calendar';

import {
  Button,
  Form,
  FormGroup,
  Alert,
} from 'reactstrap';

import UserContext from '../UserContext';

class RequestAppointmentForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      selectedDate: new Date(),
      slotId: undefined,
      message: undefined,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onRequested } = this.props;
    const userContext = this.context;
    const { slotId } = this.state;

    axios.patch(
      `http://localhost:8080/v1/appointment/${slotId}/request`,
      { clientId: userContext.currentUser.userId },
    )
      .then(() => {
        this.setState({ message: 'Ми відправили запит. Статус перевіряйте у Моїх зустрічах.' });
        onRequested();
      })
      .catch(error => console.log(error));
  }

  render() {
    const { slots } = this.props;
    const { selectedDate, slotId, message } = this.state;

    const selectedDateM = new Moment(selectedDate);
    const dateSlots = slots.filter((slot) => {
      const slotDateM = new Moment(slot.dateTimeFrom);
      return selectedDateM.year() === slotDateM.year()
          && selectedDateM.month() === slotDateM.month()
          && selectedDateM.date() === slotDateM.date();
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Calendar
            locale="uk-UK"
            returnValue="start"
            value={selectedDate}
            onChange={nextDate => this.setState({ selectedDate: nextDate, slotId: undefined })}
            className="calendar queue-page-calendar"
            minDate={new Date()}
          />
        </FormGroup>

        <FormGroup>
          <b>Доступний час:</b>
          <br />
          {dateSlots.length === 0 && (
            <span>Нічого нема на вибрану дату.</span>
          )}
          {dateSlots.length > 0 && dateSlots.map(slot => (
            <Button
              type="button"
              outline={slot.appointmentId !== slotId}
              color="primary"
              className="mr-2 my-1"
              onClick={() => this.setState({ slotId: slot.appointmentId })}
              key={slot.appointmentId}
            >
              {new Moment(slot.dateTimeFrom).format('HH:mm')}
              {' – '}
              {new Moment(slot.dateTimeTo).format('HH:mm')}
            </Button>
          ))}
        </FormGroup>

        {slotId && (
          <FormGroup>
            <Button type="submit" color="primary">Відправити запит</Button>
          </FormGroup>
        )}

        {message && (
          <FormGroup>
            <Alert color="secondary">
              {message}
            </Alert>
          </FormGroup>
        )}
      </Form>
    );
  }
}

RequestAppointmentForm.contextType = UserContext;

RequestAppointmentForm.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({
    appointmentId: PropTypes.string.isRequired,
    dateTimeFrom: PropTypes.string.isRequired,
    dateTimeTo: PropTypes.string.isRequired,
  })).isRequired,

  onRequested: PropTypes.func.isRequired,
};

export default RequestAppointmentForm;
