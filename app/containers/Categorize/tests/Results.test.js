import React from 'react';
import { shallow } from 'enzyme';
import Results from '../Results';

describe('<Results />', () => {
  let mockProps;
  let wrapper;

  beforeEach(() => {
    mockProps = {
      currentScore: 5,
      attempts: 2,
      reset: jest.fn(),
    };
    wrapper = shallow(<Results {...mockProps} />);
  });

  describe('render', () => {
    it('renders with correct structure', () => {
      const successRow = wrapper.find('.success');
      expect(successRow.html()).toContain(mockProps.currentScore);

      const penaltyRow = wrapper.find('.danger');
      const expectedPenalty = mockProps.attempts - 1;
      expect(penaltyRow.html()).toContain(expectedPenalty);

      const tryAgainButton = wrapper.find('.btn-info');
      expect(tryAgainButton.text()).toEqual('Try Again');
    });

    it('calls reset activity on button click', () => {
      const tryAgainButton = wrapper.find('.btn-info');
      tryAgainButton.simulate('click');
      expect(mockProps.reset).toHaveBeenCalledTimes(1);
    });
  });
});
