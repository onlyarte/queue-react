import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Link } from 'react-router-dom';

import {
  Container, Row, Col,
} from 'reactstrap';

import ProviderSearchCard from './ProviderCard';
import QueueSearchCard from './QueueCard';

class Search extends Component {
  constructor(props) {
    super(props);

    this.fetchQueues = this.fetchQueues.bind(this);
    this.fetchProviders = this.fetchProviders.bind(this);

    this.state = {
      loading: false,
      queues: [],
      providers: [],
    };
  }

  componentDidMount() {
    this.fetchQueues();
    this.fetchProviders();
  }

  fetchQueues() {
    const { location } = this.props;

    this.setState({ loading: true });

    axios.get(`http://localhost:8080/v1/search/queue${location.search}`)
      .then(({ data: queues }) => this.setState({ queues, loading: false }))
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  fetchProviders() {
    const { location } = this.props;

    this.setState({ loading: true });

    axios.get(`http://localhost:8080/v1/search/provider${location.search}`)
      .then(({ data: providers }) => this.setState({ providers, loading: false }))
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, queues, providers } = this.state;
    const { search: queryString } = this.props.location;
    const { query, location } = qs.parse(queryString.substring(1));

    if (loading) {
      return (
        <Container className="py-3">
          <Row>
            <Col md={8}>
              <h5>
                Шукаємо
                {query && ` ${query}`}
                {location && ` в ${location}`}
                ... Зачекайте хвилинку
              </h5>
            </Col>
          </Row>
        </Container>
      );
    }

    if (queues.length < 1 && providers.length < 1) {
      return (
        <Container className="py-3">
          <Row>
            <Col md={8}>
              <h5>
                Ми нічого не знайшли
                {query && ` за запитом ${query}`}
                {location && ` в ${location}`}
                ((
              </h5>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container className="py-3">
        <Row>
          <Col>
            <h4>
              Ось що ми знайшли
              {query && ` за запитом ${query}`}
              {location && ` в ${location}`}
              :
            </h4>

            <br />

            <h4>Люди</h4>
            {providers.length < 1 && <span>Людей немає</span>}
            <Row className="my-3">
              {providers.map(provider => (
                <Col md={4} lg={3} className="mb-3" key={provider.userId}>
                  <Link to={`/users/${provider.userId}`} className="clear-link">
                    <ProviderSearchCard provider={provider} className="card-hovered" />
                  </Link>
                </Col>
              ))}
            </Row>

            <br />

            <h4>Черги</h4>
            {queues.length < 1 && <span>Черг немає</span>}
            <Row className="my-3">
              {queues.map(queue => (
                <Col md={4} lg={3} className="mb-3" key={queue.queueId}>
                  <Link to={`/queues/${queue.queueId}`} className="clear-link">
                    <QueueSearchCard queue={queue} className="card-hovered" />
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
