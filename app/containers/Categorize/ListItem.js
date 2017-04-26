import styled from 'styled-components';

const ListItem = styled.li`
  list-style-type: none;
  padding: 0.25em;
  background-color: #FAFAFA;
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

  border-radius: 5px;
  border: ${props => {
      switch(props.correct) {
        case true:
          return '1px solid gray';
        case false:
          return '1px solid red';
        default:
          return '1px solid gray';
      }
  }};
  img {
    width: 100%;
    pointer-events: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default ListItem;
