import React, { PropTypes } from 'react';
import styled from 'styled-components';
import InstructionsWrapper from './InstructionsWrapper';

const InstructionsContent = styled.div `
  position: absolute;
  font-size: 1.2em;
  height: 100px;
  top: 50%;
  transform: translateY(-50px);
`;

Instructions.propTypes = {
  active: PropTypes.bool.isRequired,
  removeInstructions: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default function Instructions(props) {
  if (props.active) {
    return (
      <InstructionsWrapper>
        <InstructionsContent>
          <p>{props.text}</p>
          <button onClick={props.removeInstructions} className="btn btn-info">Begin!</button>
        </InstructionsContent>
      </InstructionsWrapper>
    );
  }
  return null;
}
