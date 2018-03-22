/* ------------------------------------------
   Example - Component
--------------------------------------------- */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
// Import constants
// Import services
// Import components

class Example extends Component {
  static displayName = 'Example';
  static propTypes = {};
  constructor() {
    super();
    this.state = { example: 'Example' };
  }
  render() {
    const { example } = this.state;

    return (
      <Main isExemple>
        <p>{example}</p>
      </Main>
    );
  }
}

const motion = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

const Main = styled.div`
  display: block;
  margin-top: ${p => p.isExample ? '10px' : '0px'};
  > p {
    text-transform: uppercase;
  }
  animation-name: ${motion};
  ${p => p.isExample
  ? css`
    background: red;`
  : css`
    background: black;
  `}
`;

export default Example;
