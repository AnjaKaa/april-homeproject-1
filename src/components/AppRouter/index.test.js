import React from 'react';
import { shallow } from 'enzyme';

import AppRouter from './index';

describe('Компонента AppRouter', () => {
  describe('Присутствует:', () => {
    const wrapper = shallow(<AppRouter />);

    it('Switch', () => {
      expect(wrapper.find('Switch')).toHaveLength(1);
    });
    it('PrivateRoute /users/me', () => {
      expect(
        wrapper
          .find('Connect(PrivateRoute)')
          .first()
          .props().path,
      ).toEqual('/users/me');
    });
    it('PrivateRoute /users/:login', () => {
      expect(
        wrapper
          .find('Connect(PrivateRoute)')
          .last()
          .props().path,
      ).toEqual('/users/:login');
    });
    it('Route /login', () => {
      expect(
        wrapper
          .find('Route')
          .last()
          .prop('path'),
      ).toEqual('/login');
    });
  });
});
