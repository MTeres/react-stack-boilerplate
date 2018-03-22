/* ------------------------------------------
   LeftComponent - Component
--------------------------------------------- */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  tittle: {
    id: 'LeftComponent.tittle',
    defaultMessage: 'Left Side',
    description: 'Tittle',
  },
  button: {
    id: 'LeftComponent.button',
    defaultMessage: 'click',
    description: 'button',
  },
});

class LeftComponent extends Component {
  static displayName = 'LeftComponent';
  static propTypes = {
    intl: PropTypes.object.isRequired,
  };
  render() {
    const { intl: { formatMessage } } = this.props;
    return (
      <Main>
        <Message>{formatMessage(messages.tittle)}</Message>
        <Button isClick><Link to="/home/right">{formatMessage(messages.button)}</Link></Button>
      </Main>
    );
  }
}

const Main = styled.div`
    height: 500px;
    width: 50%;
    background: linear-gradient(20deg,rgb(219,112,147),#daa357);
    border: 1px solid #daa357;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
`;

const Message = styled.p`
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    font-size: 20px;
`;

const Button = styled.button`
  text-transform: uppercase;
  cursor: pointer;
  width: 120px;
  padding: 10px;
  border-radius: 5px;
  background: #DB7093;
  a {
    color: #fff;
  }
`;

export default injectIntl(LeftComponent);
