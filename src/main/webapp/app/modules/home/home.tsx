import './home.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { getLoginUrl, REDIRECT_URL } from 'app/shared/util/url-utils';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  useEffect(() => {
    const redirectURL = localStorage.getItem(REDIRECT_URL);
    if (redirectURL) {
      localStorage.removeItem(REDIRECT_URL);
      location.href = `${location.origin}${redirectURL}`;
    }
  });

  const { account } = props;

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
      <Col md="9">
        <h2>
          <Translate contentKey="home.title" interpolate={{ username: account.login }}>
            Welcome, {account.login}!
          </Translate>
        </h2>
        <p className="lead">
          <Translate contentKey="home.subtitle">This is your homepage</Translate>
        </p>
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
          </div>
        ) : (
          <div></div>
        )}
        <p>
          <Translate contentKey="home.question">Please select what you would like to do, to ask questions :</Translate>
        </p>

        <ul>
          <li>
            <a href="/store" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.store">Go to store</Translate>
            </a>
          </li>
          <li>
            <a href="/doctor" target="_blank" rel="noopener noreferrer">
              <Translate contentKey="home.link.doctor">See the doctor</Translate>
            </a>
          </li>
        </ul>

        <p>
          <Translate contentKey="home.like">If you like NHipster, do not forget to give us a star on</Translate>{' '}
          <a href="https://github.com/Serpent999/SoEq" target="_blank" rel="noopener noreferrer">
            Github
          </a>
          !
        </p>
      </Col>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
