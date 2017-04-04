
import styled from 'styled-components';

const ListItem = styled.li`
  list-style-type: none;
  padding: 0.5em;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
  }
  width: 90%;
  margin:auto;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  color: ${props => {
    switch(props.correct) {
      case true:
        return 'black'
      case false:
        return 'red'
      default:
        return 'black'
    }
  }};
`;

export default ListItem;
