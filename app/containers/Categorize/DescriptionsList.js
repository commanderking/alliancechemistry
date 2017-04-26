import React, { Component } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
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

const ScoreSpan = styled.span`
  color: ${props => {
    console.log("colors");
    let score = props.currentScore;
    let highScore = props.highScore;
    if (score / highScore > 0.9) {
      return 'green';
    } else if (score / highScore >= 0.7) {
      return 'orange';
    } else {
      return 'red'
    }
  }}
`;

class DescriptionsList extends Component {
  render () {
    if (this.props.items.length === 0) {
      let { currentScore, highScore, attempts } = this.props;

      // Show submit button as long as high score not reached
      let activeButton = currentScore === highScore ?
          null :
          <Button bsStyle="primary" onClick={this.props.checkAnswer}>Submit Answers</Button>

      // Don't show Current or Attempted score when user hasn't attempted
      // TODO: Should be its own component/
      let progressDisplay;
      if (attempts === 0 || currentScore === highScore) {
        progressDisplay = <h3>Ready to Submit?</h3>;
      } else {
        progressDisplay = (
          <div>
            <h3>Current Score: <ScoreSpan currentScore = {currentScore}
                                          highScore = {highScore}>
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
      )
    }
    return (
      <DescriptionListWrapper>
        <h3>Descriptions</h3>

        <List>
          {this.props.renderCategoryListItems(this.props.items, "uncategorizedList")}
        </List>
      </DescriptionListWrapper>
    )
  }
}

export default DescriptionsList;
