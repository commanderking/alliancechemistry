import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import DescriptionsList from './DescriptionsList';
import CategoryList from './CategoryList';
import ListItem from './ListItem';
import CategorizeWrapper from './CategorizeWrapper';
import ResultsWrapper from './ResultsWrapper';
import Results from './Results';
import Instructions from './Instructions';
import appURLs from '../../constants/appURLs';

const CategoriesWrapper = styled.div`
  width: 75%;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  min-height: 500px;
  height: 100%;
  position: relative;
`;

export function getInitialState() {
  return {
    attempts: 0,
    currentScore: 0,
    highScore: 0,
    activityComplete: false,
    uncategorizedList: null,
    instructionsActive: true,
    instructionsText: '',
    categories: [],
  };
}

class CategoryActivity extends Component {

  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  componentDidMount() {
    console.log('component mounted');
    const URL = 'https://s3.amazonaws.com/alliance-chemistry/activityData/nuclear-chemistry/radiationTypes.json';
    axios.get(URL)
      .then((response) => {
        const { activeItemsCount, categories, instructions, listItems } = response.data;
        const initialState = {};
        initialState.uncategorizedList = _.shuffle(listItems).slice(0, activeItemsCount);
        initialState.instructionsText = instructions;
        initialState.highScore = activeItemsCount;
        initialState.categories = categories;
        categories.forEach((categoryName) => {
          initialState[categoryName] = [];
        });
        this.setState(initialState);
      });

    _.bindAll(this,
      'handleDragEnd',
      'reset',
      'removeInstructions',
      'renderCategoryListItems',
      'handleDragItem',
      'handleDragEnd',
      'checkAnswer',
      'removeItem',
      'addItem',
    );
  }

  addItem(categoryName, item) {
    console.log(categoryName);
    console.log(this.state);
    if (this.state[categoryName].length === 0) {
      this.setState({ [categoryName]: [item] });
    } else {
      this.setState({ [categoryName]: [...this.state[categoryName], item] });
    }
  }
  removeItem(index, currentCategory) {
    const newCategoryState = this.state[currentCategory].slice(0);
    newCategoryState.splice(index, 1);
    this.setState({ [currentCategory]: newCategoryState });
  }
  handleDragItem(event) {
    /*
     *data-indexes can only be saved as lowercase, which is why correctcategory needs to
     *be converted to correctCategory in setState
    */

    const { index, correctcategory, currentcategory, type, content } = event.target.dataset;
    this.setState({ draggedItem: {
      index,
      type,
      content,
      correctCategory: correctcategory,
      currentCategory: currentcategory || 'uncategorizedList',
    } });
  }
  handleDragEnd() {
    this.setState({ draggedItem: null });
  }
  checkAnswer() {
    let currentScore = 0;
    const answerKey = {};

    // mark item as correct or not and tally score
    this.state.categories.forEach((category) => {
      answerKey[category] = this.state[category].map((item) => {
        const correctedItem = item;
        if (item.correctCategory !== category) {
          correctedItem.correct = false;
        } else {
          correctedItem.correct = true;
          currentScore += 1;
        }
        return correctedItem;
      });
    });

    // Set the new state to reflect incorrect answers
    const activityComplete = currentScore === this.state.highScore;

    const newState = {
      attempts: this.state.attempts += 1,
      currentScore,
      activityComplete,
    };
    this.state.categories.forEach((categoryName) => {
      newState[categoryName] = answerKey[categoryName];
    });
    this.setState(newState);
  }
  reset() {
    window.location.reload();
  }

  removeInstructions() {
    this.setState({
      instructionsActive: false,
    });
  }

  renderCategories() {
    return this.state.categories.map((categoryName) => {
      return (
        <CategoryList
          key={categoryName} categoryName={categoryName}
          currentItems={this.state[categoryName]}
          removeItem={this.removeItem}
          handleDragItem={this.handleDragItem}
          renderCategoryListItems={this.renderCategoryListItems}
          draggedItem={this.state.draggedItem}
          addItem={this.addItem}
        />
      );
    });
  }

  renderCategoryListItems(items, categoryName) {
    return items.map((item, i) => {
      // Determine to display image or text depending on item
      const itemDisplay = item.type === 'image' ?
        <img alt="item text" src={`${appURLs.IMAGE_BASE}/${item.content}`} />
          : item.content;
      return (
        <ListItem
          key={i}
          data-index={i}
          correct={item.correct}
          data-type={item.type}
          data-content={item.content}
          data-correctcategory={item.correctCategory}
          data-currentcategory={categoryName}
          draggable="true"
          onDragEnd={this.handleDragEnd}
          onDragStart={this.handleDragItem}
        >
          {itemDisplay}
        </ListItem>
      );
    });
  }
  render() {
    const { uncategorizedList, attempts, currentScore } = this.state;
    const { instructionsActive, instructionsText } = this.state;
    const results = this.state.activityComplete ?
      (
        <ResultsWrapper>
          <Results
            attempts={attempts}
            currentScore={currentScore}
            reset={this.reset}
          />
        </ResultsWrapper>
      ) : null;

    if (!uncategorizedList) {
      return <div>Loading... </div>;
    }
    return (
      <div>
        <Instructions
          active={instructionsActive}
          text={instructionsText}
          removeInstructions={this.removeInstructions}
        />
        <CategorizeWrapper
          instructionsActive={instructionsActive}
        >
          {results}
          <DescriptionsList
            items={uncategorizedList}
            renderCategoryListItems={this.renderCategoryListItems}
            handleDragItem={this.handleDragItem}
            handleDragEnd={this.handleDragEnd}
            checkAnswer={this.checkAnswer}
            attempts={this.state.attempts}
            currentScore={this.state.currentScore}
            highScore={this.state.highScore}
            activityComplete={this.state.activityComplete}
          />
          <CategoriesWrapper>
            {this.renderCategories()}
          </CategoriesWrapper>
        </CategorizeWrapper>
      </div>
    );
  }
}

export default CategoryActivity;
