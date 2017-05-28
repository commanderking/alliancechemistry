import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const DescriptionListWrapper = styled.div`
  width: 25%;
  text-align: center;
  display: inline-block;
`;

const List = styled.ul`
  width: 100%;
  height: 90vh;
  min-height: 500px;
  overflow: scroll;
  background-color: lightblue;
  border-radius: 5px;
  padding: 1em 0em;
`;

export const ScoreSpan = styled.span`
  color: ${(props) => {
    const score = props.currentScore;
    const highScore = props.highScore;
    if (score / highScore > 0.9) {
      return 'green';
    } else if (score / highScore >= 0.7) {
      return 'orange';
    }
    return 'red';
  }}
`;

DescriptionList.propTypes = {
  checkAnswer: PropTypes.func.isRequired,
  renderCategoryListItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  currentScore: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  attempts: PropTypes.number.isRequired,
};

export default function DescriptionList(props) {

  // If no remaining items to categorize, show submit options
  // Otherwise, show the remaining items

  if (props.items.length === 0) {
    const { currentScore, highScore, attempts } = props;

    // Show submit button as long as high score not reached
    const activeButton = currentScore === highScore ?
        null :
        <Button bsStyle="primary" onClick={props.checkAnswer}>Submit Answers</Button>;

    // Don't show Current or Attempted score when user hasn't attempted
    // TODO: Should be its own component/
    let progressDisplay;
    if (attempts === 0) {
      progressDisplay = <h3>Ready to Submit?</h3>;
    } else if (currentScore === highScore) {
      progressDisplay = <h3>Mission Complete!</h3>;
    } else {
      progressDisplay = (
        <div>
          <h3>Current Score: <ScoreSpan
            currentScore={currentScore}
            highScore={highScore}
          >
            {currentScore} / {highScore}
          </ScoreSpan>
          </h3>
          <h3>Attempts: {attempts}</h3>
        </div>
      );
    }
    return (
      <DescriptionListWrapper>
        <h3>Descriptions</h3>
        <div>
          {progressDisplay}
          {activeButton}
        </div>
      </DescriptionListWrapper>
    );
  }
  return (
    <DescriptionListWrapper>
      <h3>Descriptions</h3>

      <List>
        {props.renderCategoryListItems(props.items, 'uncategorizedList')}
      </List>
    </DescriptionListWrapper>
  );
}
