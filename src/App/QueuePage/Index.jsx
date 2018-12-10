import React, { Component } from 'react';
import axios from 'axios';

import {
  Container, Row, Col,
} from 'reactstrap';

import QueueInfoCard from './QueueInfoCard';
import RequestAppointmentForm from './RequestAppointmentForm';

class QueuePage extends Component {
  constructor(props) {
    super(props);

    this.fetchQueue = this.fetchQueue.bind(this);
    this.fetchQueueAppointments = this.fetchQueueAppointments.bind(this);

    this.state = {
      loading: false,
      queue: null,
      slots: [],
    };
  }

  componentDidMount() {
    this.fetchQueue();
    this.fetchQueueAppointments();
  }

  fetchQueue() {
    const { queueId } = this.props.match.params;

    this.setState({ loading: true });

    axios.get(`http://localhost:8080/v1/queue/${queueId}`)
      .then(({ data: queue }) => this.setState({ queue, loading: false }))
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  fetchQueueAppointments() {
    const { queueId } = this.props.match.params;

    axios.get(`http://localhost:8080/v1/queue/${queueId}/appointments`)
      .then(({ data: appointments }) => {
        console.log(appointments);
        this.setState({
          slots: appointments.filter(a => a.status === 'CREATED'),
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { queue, slots, loading } = this.state;

    if (loading) {
      return (
        <Container className="py-3">
          <Row>
            <Col md={8}>
              <h5>Завантажуємо...</h5>
            </Col>
          </Row>
        </Container>
      );
    }

    if (!queue) {
      return (
        <Container className="py-3">
          <Row>
            <Col md={8}>
              <h5>Не можемо знайти цю чергу((</h5>
            </Col>
          </Row>
        </Container>
      );
    }

    console.log(queue);

    return (
      <Container className="py-3">
        <Row>
          <Col md={4}>
            <QueueInfoCard queue={queue} />
          </Col>
          <Col md={8}>
            <h3>Записатися</h3>

            {slots.length === 0 && (
              <p>Вільних дат поки немає. Спробуйте зателефонувати.</p>
            )}

            {slots.length > 0 && (
              <RequestAppointmentForm slots={slots} onRequested={this.fetchQueueAppointments} />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default QueuePage;
