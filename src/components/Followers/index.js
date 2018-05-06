import React, { PureComponent } from 'react';
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
  margin: 20px 60px;
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
      return <Spinner size="64px" color="fuchsia" gap={5} />;
    } else if (!followers) {
      return null;
    }

    return (
      <FollowersWrap>
        {followers.map(item => (
          <Follower key={item.id} login={item.login} avatarUrl={item.avatar_url} />
        ))}
      </FollowersWrap>
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
