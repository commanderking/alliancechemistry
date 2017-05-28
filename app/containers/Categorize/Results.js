import React, { PropTypes } from 'react';
import styled from 'styled-components';

export const ResultsTable = styled.table`
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

Results.propTypes = {
  currentScore: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
};

export default function Results(props) {
  const { currentScore, attempts } = props;
  const tempScore = currentScore - attempts;
  const finalScore = tempScore + 1;
  return (
    <div>
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
            <td>{finalScore}</td>
          </tr>
        </tbody>
      </ResultsTable>
      <button onClick={props.reset} className="btn btn-info">Try Again</button>
    </div>
  );
}
