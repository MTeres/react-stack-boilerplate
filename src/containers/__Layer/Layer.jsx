/* ------------------------------------------
 Layer
 --------------------------------------------- */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {
  Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from 'containers/Home/Home';

const mapStateToProps = () => ({});

const bindActions = {};

const decorator = connect(mapStateToProps, bindActions);

class LayerContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <div className="Layer">
          <Helmet
            title="Home"
            titleTemplate="%s - Boilerplate"
          />
          <Switch>
            <Route component={Home} path="/home" />
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default decorator(LayerContainer);
