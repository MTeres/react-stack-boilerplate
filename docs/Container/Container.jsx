/* ------------------------------------------
   Example - Container
--------------------------------------------- */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Import constants
// Import services
// Import components
import Example from '../Component/Component';

const mapStateToProps = () => {
  return {};
};
const bindActions = {};
const decorator = connect(mapStateToProps, bindActions);

class ExampleContainer extends Component {
  static displayName = 'ExampleContainer';
  static propTypes = {};
  render () {
    return (<Example {...this.props} />);
  }
}

export default decorator(ExampleContainer);
