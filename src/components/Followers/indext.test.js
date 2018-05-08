import React from 'react';
import { shallow } from 'enzyme';
import { Followers } from './index';
import Follower from '../Follower';
import Spinner from 'react-svg-spinner';

describe('Компонента UserPage', () => {
  describe('Содержит методы:', () => {
    const wrapper = shallow(<Followers />);

    it('componentDidMount', () => {
      expect(wrapper.instance().componentDidMount).toBeDefined();
    });
  });

  describe('Загрузка данных:', () => {
    it('присутствует спинер при загрузке (props.isFetching === true)', () => {
      const wrapper = shallow(<Followers isFetching={true} />);

      expect(wrapper.find(Spinner)).toHaveLength(1);
    });
  });

  describe('Проверка дочерних элементов:', () => {
    const followersData = [
      { id: 1, login: 'test', avatar_url: 'http://test-image' },
      { id: 2, login: 'dex157', avatar_url: 'http://test-image' },
    ];
    const wrapper = shallow(<Followers followers={followersData} />);

    it(`количество соответствует props.followers = ${followersData.length}`, () => {
      expect(wrapper.find(Follower).length).toBe(followersData.length);
    });
  });
});
