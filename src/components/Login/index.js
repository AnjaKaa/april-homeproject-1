import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authorize, getIsAuthorized } from '../../ducks/auth';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 300px;
  margin: auto;
`;

const Input = styled.input`
  width: 100%;
`;

class Login extends PureComponent {
  handleEnter = event => {
    if (event.key === 'Enter') {
      const value = event.target.value;
      this.props.authorize(value);
    }
  };

  render() {
    console.log('props', this.props);
    const { isAuthorized } = this.props;

    if (isAuthorized) {
      return <Redirect to="/users/me" />;
    } else {
      return (
        <Wrap>
          <p>
            Получить токен нужно на своей странице github, перейдите по{' '}
            <a href="https://github.com/settings/tokens">адресу</a> и создать себе токен. Запишите
            куда нибудь токен, так как после создания доступ к нему будет только один раз.
          </p>
          <Input placeholder="auth_token" name="auth_token" onKeyPress={this.handleEnter} />
          <p>После ввода нажать Enter</p>
        </Wrap>
      );
    }
  }
}

export default connect(
  state => ({
    isAuthorized: getIsAuthorized(state),
  }),
  { authorize },
)(Login);
