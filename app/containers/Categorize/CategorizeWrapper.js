import styled from 'styled-components';

const CategorizeWrapper = styled.div`
  min-width: 1020px;
  padding: 1em 0em 0em 0em;

  // Zone out background when instructions active
  opacity: ${(props) => {
    return props.instructionsActive ? '0.3' : '1.0';
  }}
  pointer-events: ${(props) => {
    return props.instructionsActive ? 'none' : '';
  }}
`;

export default CategorizeWrapper;
