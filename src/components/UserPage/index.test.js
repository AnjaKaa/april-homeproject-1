import React from 'react';
import { shallow } from 'enzyme';
import { UserPage } from '../UserPage';
import Spinner from 'react-svg-spinner';

describe('Компонента UserPage', () => {
  describe('Содержит методы:', () => {
    const wrapper = shallow(<UserPage />);

    it('componentDidMount', () => {
      expect(wrapper.instance().componentDidMount).toBeDefined();
    });
    it('componentDidUpdate', () => {
      expect(wrapper.instance().componentDidUpdate).toBeDefined();
    });
  });

  describe('Загрузка данных:', () => {
    it('присутствует спинер при загрузке (props.isFetching === true)', () => {
      const wrapper = shallow(<UserPage isFetching={true} />);

      expect(wrapper.find(Spinner)).toHaveLength(1);
    });
    it('пустая разметка при отсутствии пользователя (isFetching === false && user === null)', () => {
      const wrapper = shallow(<UserPage isFetching={false} />);

      expect(wrapper.html()).toEqual(null);
    });
  });

  describe('Проверка вёрстки, присутствует:', () => {
    const userData = {
      login: 'dex157',
      avatar_url: 'http://test-image',
      followers: -1,
      public_repos: -1,
    };
    const wrapper = shallow(<UserPage user={userData} />);

    it('аватар пользователя', () => {
      expect(
        wrapper
          .find('img')
          .first()
          .props().src,
      ).toBe(userData.avatar_url);
    });
    it('логин пользователя', () => {
      expect(wrapper.find('h3').text()).toBe(userData.login);
    });
    it('фоловеры пользователя', () => {
      expect(
        wrapper
          .find('p')
          .at(0)
          .text(),
      ).toBe(`Followers: ${userData.followers}`);
    });
    it('публичные репозитории пользователя', () => {
      expect(
        wrapper
          .find('p')
          .at(1)
          .text(),
      ).toBe(`Public repos: ${userData.public_repos}`);
    });
  });
});
