import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FollowerWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
  margin: 10px;
  border: 1px solid rgba(0, 191, 165, 0.85);
`;

const FollowerPic = styled.div`
  width: 100px;
  height: 100px;
  background-color: rgb(255, 255, 255);
  padding: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }
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
          <img src={avatarUrl} alt={login} />
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
