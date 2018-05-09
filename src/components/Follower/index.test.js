import React from 'react';
import { shallow } from 'enzyme';
import Follower from './index';

describe('Компонента Follower', () => {
  describe('Проверка вёрстки, присутствует:', () => {
    const userData = {
      login: 'dex157',
      avatarUrl: 'http://test-image',
    };
    const wrapper = shallow(<Follower {...userData} />);

    it('аватар пользователя', () => {
      expect(wrapper.find('img').prop('src')).toBe(userData.avatarUrl);
    });
    it('логин пользователя', () => {
      expect(wrapper.find('h3').text()).toBe(userData.login);
    });
    it('ссылка на страницу', () => {
      expect(wrapper.find('Link').prop('to')).toBe(`/users/${userData.login}`);
    });
  });
});
