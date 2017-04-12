import React, { Component } from 'react';
import styled from 'styled-components';
import ResultsWrapper from './ResultsWrapper';

const ResultsTable = styled.table`
  width: 80%;
  margin: auto;
  margin-bottom: 1em;
  td:nth-child(1) {
    width: 60%;
    text-align: right;
  }
  td:nth-child(2) {
    text-align: center;
  }
`;

export default class Results extends Component {
  render() {
    let {currentScore, attempts} = this.props;
    return(
      <ResultsWrapper>
        <h3>Final Results</h3>
        <ResultsTable className="table table-hover">
          <tbody>
          <tr className="success">
              <td>Points earned: </td>
              <td>{currentScore}</td>
            </tr>
            <tr className="danger">
              <td>Attempts Penalty: </td>
              <td>- {attempts - 1}</td>
            </tr>
            <tr>
              <td>Final Score: </td>
              <td>{currentScore - attempts + 1}</td>
            </tr>
          </tbody>
        </ResultsTable>
        <button onClick={this.props.reset} className="btn btn-info">Try Again</button>
      </ResultsWrapper>
    )
  }
}
