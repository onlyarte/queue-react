import React, { Component } from 'react';
import axios from 'axios';

import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

class Queues extends Component {
  constructor(props) {
    super(props);

    this.fetchQueues = this.fetchQueues.bind(this);

    this.state = {
      loading: true,
      queues: [],
    };
  }

  componentDidMount() {
    this.fetchQueues();
  }

  fetchQueues() {
    this.setState({ loading: true });

    
  }

  render() {
    const { loading, queues } = this.state;

    if (loading) return null;

    return (
      <Container>
        {queues.map(queue => (
          <Card>
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>Some quick example text to build on the card title and make up the bulk of the.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        ))}
      </Container>
    );
  }
}

export default Queues;
