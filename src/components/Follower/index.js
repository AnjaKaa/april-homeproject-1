import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FollowerWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
`;

const FollowerPic = styled.div`
  width: 100px;
  height: 100px;
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(238, 238, 238);
  border-image: initial;
`;

const FollowerPicImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const FollowerInfo = styled.div`
  padding-left: 20px;
  text-align: left;
`;
class Follower extends PureComponent {
  render() {
    const { login, avatarUrl } = this.props;

    return (
      <FollowerWrap>
        <FollowerPic>
          <FollowerPicImg src={avatarUrl} alt={login} />
        </FollowerPic>
        <FollowerInfo>
          <Link to={`/users/${login}`}>
            <h3>{login}</h3>
          </Link>
        </FollowerInfo>
      </FollowerWrap>
    );
  }
}

export default Follower;
