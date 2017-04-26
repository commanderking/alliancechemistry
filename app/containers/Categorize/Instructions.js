import React from 'react';
import InstructionsWrapper from './InstructionsWrapper';
import styled from 'styled-components';

const InstructionsContent = styled.div `
  position: absolute;
  font-size: 1.2em;
  height: 100px;
  top: 50%;
  transform: translateY(-50px);
`;

export default (props) => {
  if (props.active) {
    return (
      <InstructionsWrapper>
        <InstructionsContent>
          <p>{props.text}</p>
          <button onClick={props.removeInstructions} className="btn btn-info">Begin!</button>
        </InstructionsContent>

      </InstructionsWrapper>
    )
  } else {
    return null;
  }
}
