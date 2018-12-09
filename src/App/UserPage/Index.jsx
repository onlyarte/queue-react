import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
  Container, Row, Col,
} from 'reactstrap';

import UserInfoCard from './UserInfoCard';
import UserQueueCard from './UserQueueCard';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.fetchUser = this.fetchUser.bind(this);
    this.fetchUserQueues = this.fetchUserQueues.bind(this);

    this.state = {
      loading: false,
      user: null,
      queues: [],
    };
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchUserQueues();
  }

  fetchUser() {
    const { userId } = this.props.match.params;

    this.setState({ loading: true });

    axios.get(`http://localhost:8080/v1/user/${userId}`)
      .then(({ data: user }) => this.setState({ user, loading: false }))
      .catch(error => console.log(error));
  }

  fetchUserQueues() {
    const { userId } = this.props.match.params;

    axios.get(`http://localhost:8080/v1/user/${userId}/queues`)
      .then(({ data: queues }) => this.setState({ queues }))
      .catch(error => console.log(error));
  }

  render() {
    const { user, queues, loading } = this.state;

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

    if (!user) {
      return (
        <Container className="py-3">
          <Row>
            <Col md={8}>
              <h5>Такого користувача у нас немає((</h5>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container className="py-3">
        <Row>
          <Col md={4}>
            <UserInfoCard user={user} />
          </Col>
          <Col md={8}>
            <h3>Черги користувача</h3>
            {queues.length === 0 && (
              <p>Користувач поки не створив жодної черги</p>
            )}

            {queues.length > 0 && (
              <Row className="my-3">
                {queues.map(queue => (
                  <Col md={6} lg={4} className="mb-3" key={queue.queueId}>
                    <Link to={`/queues/${queue.queueId}`} className="clear-link">
                      <UserQueueCard queue={queue} className="card-hovered" />
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserPage;
