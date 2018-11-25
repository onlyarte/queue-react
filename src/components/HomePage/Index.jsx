import React, { Fragment } from 'react';
import { Col } from 'reactstrap';
import SearchForm from './SearchForm';
import LogInForm from './LogInForm';

function HomePage() {
  return (
    <Fragment>
      <div className="hp-search">
        <div className="hp-search-back">
          <iframe
            title="youtube-background"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/x6UtXXWCNo8?controls=0&autoplay=1&mute=1&loop=1&playlist=x6UtXXWCNo8"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="hp-search-front d-flex justify-content-center align-items-center">
          <Col md={5}>
            <h1>
              <span className="bg-primary text-white text-poiret">QUEUE</span>
            </h1>

            <h3 className=" text-poiret mb-2">
              <span className="bg-primary text-white">електронні черги</span>
            </h3>

            <SearchForm />
          </Col>
        </div>
      </div>

      <div className="hp-login d-flex justify-content-center align-items-center" id="login">
        <Col md={5}>
          <LogInForm />
        </Col>
      </div>
    </Fragment>
  );
}

export default HomePage;
