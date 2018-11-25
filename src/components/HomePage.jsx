import React from 'react';

import {
  Form,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';

import Octicon, { Search as SearchIcon } from '@githubprimer/octicons-react';

function HomePage() {
  return (

    <div className="hp-container">
      <div className="hp-back" />
      <div className="hp-front d-flex justify-content-center align-items-center">
        <Col md={5}>
          <h1><span className="hp-front-header">QUEUE</span></h1>
          {/* <Card className="hp-front-card">
            <CardBody> */}
              <Form className="flex-grow-1">
                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">Черга</InputGroupAddon>
                  <Input type="text" name="query" placeholder="стоматолог, Марина або що завгодно" />
                </InputGroup>

                <InputGroup className="mb-2">
                  <InputGroupAddon addonType="prepend">Місто</InputGroupAddon>
                  <Input type="text" name="location" placeholder="Київ..." />
                </InputGroup>

                <Button type="button" color="primary">
                  <Octicon><SearchIcon x={10} /></Octicon>
                  {' '}
                  Шукати
                </Button>
              </Form>
            {/* </CardBody>
          </Card> */}
        </Col>
      </div>
    </div>
  );
}

export default HomePage;
