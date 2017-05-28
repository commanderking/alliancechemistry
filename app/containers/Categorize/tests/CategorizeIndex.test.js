import React from 'react';
import { shallow } from 'enzyme';

import CategoryActivity from '../index';
import DescriptionsList from '../DescriptionsList';
import CategoryList from '../CategoryList';
import styled from 'styled-components';
import ListItem from '../ListItem';
import CategorizeWrapper from '../CategorizeWrapper';
import Results from '../Results';
import Instructions from '../Instructions';
import appURLs from '../../../constants/appURLs';
import axios from 'axios';

//TODO: Replace this with getInitialState in index.js

describe('<CategoryActivity />', () => {
  let mockState;
  let mockProps;
  let mock;

  beforeEach(() => {
  });

  describe('componentDidMount', () => {
    it('executes', () => {
      const setStateStub = jest.spyOn(CategoryActivity.prototype, 'setState');
      const wrapper = shallow(<CategoryActivity />);
      // axios.get = jest.fn();
      console.log(wrapper.html());
      wrapper.instance().setState = jest.fn();
      wrapper.instance().componentDidMount();
      console.log(setStateStub);
      expect(setStateStub).toBeCalled();
    });
  });

  describe('addItem', () => {
    it('executes', () => {
      const wrapper = shallow(<CategoryActivity />);
      wrapper.instance().setState = jest.fn();
      wrapper.instance().state.category1 = [];
      wrapper.instance().state.category2 = [];

      wrapper.instance().addItem('category1', { itemObject: {} });
      expect(wrapper.instance().setState).toBeCalledWith({ category1: [{ itemObject: {} }] });
    });
  });

  describe('render', () => {
    it('has proper structure', () => {
    });
  });
});
