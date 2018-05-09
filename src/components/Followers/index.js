import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-svg-spinner';

import { fetchRequest, getData, getIsFetching } from '../../ducks/followers';
import Follower from '../Follower';

import styled from 'styled-components';

const FollowersWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  justify-content: center;
`;

export class Followers extends PureComponent {
  componentDidMount() {
    const login = this.props.login;

    if (login) {
      this.props.fetchRequest(login);
    }
  }

  render() {
    const { followers, isFetching } = this.props;

    if (isFetching) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spinner size="64px" color="rgba(0, 191, 165, 0.85)" gap={5} />
        </div>
      );
    } else if (!followers) {
      return null;
    }

    return (
      <Fragment>
        <h2 style={{ textAlign: 'center', color: 'rgba(0, 191, 165, 0.85)' }}>Followers </h2>
        <FollowersWrap>
          {followers.map(item => (
            <Follower key={item.id} login={item.login} avatarUrl={item.avatar_url} />
          ))}
        </FollowersWrap>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    followers: getData(state),
    isFetching: getIsFetching(state),
  }),
  { fetchRequest },
)(Followers);
