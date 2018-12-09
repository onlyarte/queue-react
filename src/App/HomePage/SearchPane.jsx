import React, { Component } from 'react';
import Octicon, { Search as SearchIcon } from '@githubprimer/octicons-react';
import { Link } from 'react-router-dom';
import qs from 'qs';

import {
  Col,
  Form,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
} from 'reactstrap';

class SearchPane extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      query: '',
      location: '',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { query, location } = this.state;
    const searchLink = qs.stringify({ query, location });

    return (
      <div className="search-pane" id="search">
        <div className="search-pane-back">
          {/* <iframe
            title="youtube-background"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/x6UtXXWCNo8?controls=0&autoplay=1&mute=1&loop=1&playlist=x6UtXXWCNo8"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          /> */}
        </div>

        <div className="search-pane-front d-flex justify-content-center align-items-center">
          <Col md={5}>
            <h1>
              <span className="bg-primary text-white text-poiret">QUEUE</span>
            </h1>

            <h3 className=" text-poiret mb-2">
              <span className="bg-primary text-white">електронні черги</span>
            </h3>

            <Form>
              <InputGroup className="mb-2">
                <InputGroupAddon addonType="prepend">Черга</InputGroupAddon>
                <Input
                  type="text"
                  name="query"
                  placeholder="стоматолог, Марина або що завгодно"
                  value={query}
                  onChange={this.handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-2">
                <InputGroupAddon addonType="prepend">Місто</InputGroupAddon>
                <Input
                  type="text"
                  name="location"
                  placeholder="Київ..."
                  value={location}
                  onChange={this.handleChange}
                />
              </InputGroup>

              <Link to={`/search?${searchLink}`}>
                <Button type="button" color="primary">
                  <Octicon><SearchIcon x={10} /></Octicon>
                  {' '}
                  Шукати
                </Button>
              </Link>
            </Form>
          </Col>
        </div>
      </div>
    );
  }
}

export default SearchPane;
