import React from 'react';
import { shallow } from 'enzyme';
import Results from '../Results';
import CategoryList from '../CategoryList';

describe('CategoryList', () => {
  let wrapper;
  const mockProps = {
    categoryName: 'Category 1',
    currentItems: [{}, {}],
    draggedItem: {
      content: 'Item content',
      type: 'text',
      index: 1,
      correctCategory: 'Category 1',
      currentCategory: 'Category 2',
    },
    addItem: jest.fn(),
    removeItem: jest.fn(),
    renderCategoryListItems: jest.fn(),
  };
  describe('render', () => {
    beforeEach(() => {
      wrapper = shallow(<CategoryList {...mockProps} />);
    });

    it('renders proper structure and correct props', () => {
      expect(wrapper.find('h3').text()).toBe(mockProps.categoryName);
      expect(mockProps.renderCategoryListItems).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().props).toMatchObject(mockProps);
    });
  });
});
