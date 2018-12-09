import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import qs from 'qs';

import {
  Container, Row, Col, Button,
} from 'reactstrap';

import UserQueueCard from './UserQueueCard';
import UserQueueDetails from './UserQueueDetails';

import UserContext from '../UserContext';

class MyQueuesPage extends Component {
  constructor(props) {
    super(props);

    this.fetchMyQueues = this.fetchMyQueues.bind(this);

    this.state = {
      loading: false,
      queues: [],
    };
  }

  componentDidMount() {
    this.fetchMyQueues();
  }

  fetchMyQueues() {
    const { currentUser } = this.context;

    this.setState({ loading: true });

    axios.get(`http://localhost:8080/v1/user/${currentUser.userId}/queues`)
      .then(({ data: queues }) => this.setState({ queues, loading: false }))
      .catch(error => console.log(error));
  }

  render() {
    const { queues, loading } = this.state;

    const { search: queryString } = this.props.location;
    const { queue: activeQueueId = null } = qs.parse(queryString.substring(1));

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

    return (
      <Container className="py-3">
        <h3>
          Мої черги
          {' '}
          <Button color="primary">Додати</Button>
        </h3>

        {queues.length > 0 && (
          <Row className="my-3">
            {queues.map(queue => (
              <Col md={4} lg={3} key={queue.queueId}>
                <Link to={`/queues?queue=${queue.queueId}`} className="clear-link">
                  <UserQueueCard queue={queue} className="card-hovered" />
                </Link>
              </Col>
            ))}
          </Row>
        )}

        {activeQueueId && (
          <UserQueueDetails queueId={activeQueueId} />
        )}
      </Container>
    );
  }
}

MyQueuesPage.contextType = UserContext;

export default MyQueuesPage;