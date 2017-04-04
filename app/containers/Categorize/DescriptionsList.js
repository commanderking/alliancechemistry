import React, { Component } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';

const DescriptionListWrapper = styled.div`
  width: 25%;
  display: inline-block;
  height: 95vh;
  overflow: scroll;
`;

const List = styled.ul`
  width: 100%;
`;

class DescriptionsList extends Component {
  render () {
    if (this.props.items.length === 0) {
      return (
        <DescriptionListWrapper>
          <h3>Current Score: {this.props.currentScore} / {this.props.highScore}</h3>
          <h3>Attempts: {this.props.attempts}</h3>
          <button className="btn btn-info" onClick={this.props.checkAnswer}>Submit Answers</button>
        </DescriptionListWrapper>
      )
    }
    return (
      <DescriptionListWrapper>
        <List>
          <h3>Descriptions</h3>
          {this.props.renderCategoryList(this.props.items, "uncategorizedList")}
        </List>
      </DescriptionListWrapper>
    )
  }
}

export default DescriptionsList;
