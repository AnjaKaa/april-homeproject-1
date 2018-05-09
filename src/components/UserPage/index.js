import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-svg-spinner';
import styled from 'styled-components';

import { getIsAuthorized, logout } from '../../ducks/auth';
import { fetchRequest, getData, getIsFetching } from '../../ducks/users';
import { getErrorMessage } from '../../ducks/network';
import Followers from '../Followers';

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const UserWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
`;

const UserPic = styled.div`
  width: 300px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(238, 238, 238);
  border-image: initial;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const UserInfo = styled.div`
  padding-left: 20px;
  text-align: left;
`;

const LogoutBtnWrap = styled.div`
  margin: 10px auto 40px;
  text-align: center;
`;

const LogoutBtn = props => {
  return (
    <button logout={logout} onClick={props.handleClick}>
      Logout
    </button>
  );
};

export class UserPage extends Component {
  componentDidMount() {
    const userLogin = window.location.pathname.replace('/users/', '');
    this.loadData(userLogin);
  }

  componentDidUpdate(prevProps, prevState) {
    const userLogin = window.location.pathname.replace('/users/', '');

    if (this.props.match.params.login !== prevProps.match.params.login) {
      this.loadData(userLogin);
    }
  }

  loadData(userLogin) {
    if (userLogin === 'me') {
      this.props.fetchRequest();
    } else if (userLogin) {
      this.props.fetchRequest(userLogin);
    }
  }

  render() {
    const { user, isFetching, isAuthorized, errorMessage } = this.props;

    if (isFetching) {
      return (
        <Wrap>
          <Spinner size="64px" color="fuchsia" gap={5} />
        </Wrap>
      );
    } else if (!user) {
      return null;
    }

    return (
      <Fragment>
        <Wrap>
          <UserWrap>
            <UserPic>
              <img src={user.avatar_url} alt={user.login} />
            </UserPic>
            <UserInfo>
              <h3>{user.login}</h3>
              <p>Followers: {user.followers}</p>
              <p>Public repos: {user.public_repos}</p>
            </UserInfo>
          </UserWrap>
          <Followers login={user.login} />
        </Wrap>
        <LogoutBtnWrap>
          {isAuthorized && <LogoutBtn logout={logout} handleClick={() => this.props.logout()} />}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </LogoutBtnWrap>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    user: getData(state),
    isFetching: getIsFetching(state),
    errorMessage: getErrorMessage(state),
    isAuthorized: getIsAuthorized(state),
  }),
  { fetchRequest, logout },
)(UserPage);
