import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-svg-spinner';
import styled from 'styled-components';

import { fetchRequest, getData, getIsFetching } from '../../ducks/users';
import Followers from '../Followers';

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
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
`;

const UserPicImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const UserInfo = styled.div`
  padding-left: 20px;
  text-align: left;
`;

export class UserPage extends PureComponent {
  componentDidMount() {
    console.log('this.props.match', this.props.match);
    const routerMatch = this.props.match;
    const userLogin = routerMatch && routerMatch.params.login;

    this.loadData(userLogin);
  }

  componentDidUpdate(prevProps, prevState) {
    const userLogin = this.props.match.params.login;

    if (this.props.match.params.login !== prevProps.match.params.login) {
      this.loadData(userLogin);
    }
  }

  loadData(userLogin) {
    console.log('userLogin', userLogin);
    if (userLogin === 'me') {
      this.props.fetchRequest();
    } else if (userLogin) {
      this.props.fetchRequest(userLogin);
    }
  }

  render() {
    console.log('UserPage');
    const { user, isFetching } = this.props;

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
      <Wrap>
        <UserWrap>
          <UserPic>
            <UserPicImg src={user.avatar_url} alt={user.login} />
          </UserPic>
          <UserInfo>
            <h3>{user.login}</h3>
            <p>Followers: {user.followers}</p>
            <p>Public repos: {user.public_repos}</p>
          </UserInfo>
        </UserWrap>
        <Followers login={user.login} />
      </Wrap>
    );
  }
}

export default connect(
  state => ({
    user: getData(state),
    isFetching: getIsFetching(state),
  }),
  { fetchRequest },
)(UserPage);
