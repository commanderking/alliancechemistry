import React from 'react';
import { Button } from 'react-bootstrap';
import { shallow } from 'enzyme';
import DescriptionList, { ScoreSpan } from '../DescriptionsList';
import toJson from 'enzyme-to-json';

describe('DescriptionList', () => {
  let wrapper;
  const mockProps = {
    checkAnswer: jest.fn(),
    renderCategoryListItems: jest.fn(),
    items: [{}, {}],
    currentScore: 4,
    highScore: 10,
    attempts: 0,
  };
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render remaining items to categorize if not all items have been categorized', () => {
    it('has correct structure and props', () => {
      wrapper = shallow(<DescriptionList {...mockProps} />);
      expect(wrapper.find('h3').text()).toBe('Descriptions');
      expect(mockProps.renderCategoryListItems).toHaveBeenCalled();
    });
  });

  describe('render with all items categorized, but no attempts', () => {
    beforeEach(() => {
      mockProps.items = [];
      wrapper = shallow(<DescriptionList {...mockProps} />);
    });

    it('has correct structure and props', () => {
      const headers = wrapper.find('h3');
      expect(headers.first().text()).toBe('Descriptions');
      expect(headers.at(1).text()).toBe('Ready to Submit?');
    });

    it('submit button checks answer', () => {
      const submitButton = wrapper.find(Button);
      expect(submitButton.dive().text()).toBe('Submit Answers');
      submitButton.simulate('click');
      expect(mockProps.checkAnswer).toHaveBeenCalledTimes(1);
    });

    it('does not render any remaining items', () => {
      expect(mockProps.renderCategoryListItems).not.toHaveBeenCalled();
    });
  });

  describe('render with all items categorized and some attempts', () => {
    it('has correct structure and props', () => {
      mockProps.items = [];
      mockProps.attempts = 1;

      wrapper = shallow(<DescriptionList {...mockProps} />);
      const scoreSpan = wrapper.find(ScoreSpan);
      expect(scoreSpan.html()).toContain(`${mockProps.currentScore} / ${mockProps.highScore}`);

      const attemptsH3 = wrapper.find('h3');
      expect(attemptsH3.at(2).text()).toBe(`Attempts: ${mockProps.attempts}`);

      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('render with all answers correct', () => {
    it('has correct structure and props', () => {
      mockProps.items = [];
      mockProps.currentScore = 10;
      wrapper = shallow(<DescriptionList {...mockProps} />);
      const headers = wrapper.find('h3');
      expect(headers.first().text()).toBe('Descriptions');
      expect(headers.at(1).text()).toBe('Mission Complete!');
    });
  });
});
