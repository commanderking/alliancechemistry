import React from 'react';
import InstructionsWrapper from './InstructionsWrapper';

export default (props) => {
  if (props.active) {
    return (
      <InstructionsWrapper>
        <p>{props.text}</p>
        <button onClick={props.removeInstructions} className="btn btn-info">Begin!</button>
      </InstructionsWrapper>
    )
  } else {
    return null;
  }
}
