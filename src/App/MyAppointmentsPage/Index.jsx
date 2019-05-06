import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { HashLink } from 'react-router-hash-link';

import {
  Container, Row, Col,
} from 'reactstrap';

import AppointmentCard from './AppointmentCard';

import UserContext from '../UserContext';

class MyQueuesPage extends Component {
  constructor(props) {
    super(props);

    this.fetchMyAppointments = this.fetchMyAppointments.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);

    this.state = {
      loading: false,
      appointments: [],
    };
  }

  componentDidMount() {
    this.fetchMyAppointments();
  }

  fetchMyAppointments() {
    const { currentUser } = this.context;

    this.setState({ loading: true });

    axios.get(`http://localhost:8080/v1/user/${currentUser.userId}/appointments`)
      .then(({ data: appointments }) => this.setState({ appointments, loading: false }))
      .catch(error => console.log(error));
  }

  cancelAppointment(appointmentId) {
    axios.patch(`http://localhost:8080/v1/appointment/${appointmentId}/cancel`)
      .then(() => this.fetchMyAppointments())
      .catch(error => console.log(error));
  }

  render() {
    const { appointments, loading } = this.state;

    if (loading) {
      return (
        <Container className="py-3">
          <h5>Завантажуємо...</h5>
        </Container>
      );
    }

    if (appointments.length === 0) {
      return (
        <Container className="py-3">
          <h3>
            Мої зустрічі
          </h3>
          <span>У вас немає зустрічей</span>
        </Container>
      );
    }

    const futureAppointments = appointments
      .filter(a => new Moment(a.dateTimeTo).isAfter(new Moment()));

    const pastAppointments = appointments
      .filter(a => new Moment(a.dateTimeTo).isBefore(new Moment()));

    return (
      <Container className="py-3">
        <h3>
          Мої зустрічі
        </h3>

        <br />

        <h4>Майбутні</h4>
        {futureAppointments.length === 0 && (
          <span>Нічого не заплановано</span>
        )}
        {futureAppointments.length > 0 && (
          <Row className="mt-3">
            {futureAppointments.map(appointment => (
              <Col md={4} lg={3} className="mb-3" key={appointment.appointmentId}>
                <HashLink to={`/queues/${appointment.queue.queueId}`} className="clear-link">
                  <AppointmentCard appointment={appointment} className="card-hovered" />
                </HashLink>
              </Col>
            ))}
          </Row>
        )}

        <br />
        <br />

        <h4>Минулі</h4>
        {pastAppointments.length === 0 && (
          <span>Тут поки порожньо</span>
        )}
        {pastAppointments.length > 0 && (
          <Row className="mt-3">
            {pastAppointments.map(appointment => (
              <Col md={4} lg={3} className="mb-3" key={appointment.appointmentId}>
                <HashLink to={`/queues/${appointment.queue.queueId}`} className="clear-link">
                  <AppointmentCard appointment={appointment} className="card-hovered" />
                </HashLink>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    );
  }
}

MyQueuesPage.contextType = UserContext;

export default MyQueuesPage;
