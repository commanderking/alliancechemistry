import React, { Component } from 'react';
import axios from 'axios';
import DescriptionsList from './DescriptionsList';
import CategoryList from './CategoryList';
import styled from 'styled-components';
import ListItem from './ListItem';
import CategorizeWrapper from './CategorizeWrapper';
import Results from './Results';
import Instructions from './Instructions';
import shuffle from '../../utils/shuffle';
import appURLs from '../../constants/appURLs';

const categories = ["Alpha Decay", "Beta Decay", "Gamma Radiation"];

const CategoriesWrapper = styled.div`
  width: 75%;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  min-height: 500px;
  height: 100%;
  position: relative;
`;

var instructions = "Categorize each description in as few attempts as possible";


class CategoryActivity extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
  }
  initialState() {
    return {
      attempts: 0,
      currentScore: 0,
      highScore: 0,
      activityComplete: false,
      uncategorizedList: null,
      instructionsActive: true,
      instructionsText: ""
    }
  }
  componentDidMount() {
    const URL = 'https://s3.amazonaws.com/alliance-chemistry/activityData/nuclear-chemistry/radiationTypes.json';
    const request = axios.get(URL).
      then((response) => {
        let { activeItemsCount, categories, instructions, listItems } = response.data;
        let initialState = {};
        initialState.uncategorizedList = shuffle(listItems).slice(0, activeItemsCount);
        initialState.instructionsText = instructions;
        initialState.highScore = activeItemsCount;
        categories.forEach((categoryName, i)=> {
          initialState[categoryName] = [];
        })
        this.setState(initialState);
      })

  }
  addItem(categoryName, item) {
    if (this.state[categoryName].length === 0) {
      this.setState({[categoryName] : [item]});
    } else {
      this.setState({[categoryName] : [...this.state[categoryName], item]});
    }
  }
  removeItem(index, currentCategory) {
    let newCategoryState = this.state[currentCategory].slice(0);
    newCategoryState.splice(index, 1);
    this.setState({[currentCategory] : newCategoryState});
  }
  handleDragItem(event) {
    console.log("dragging");
    let {index, correctcategory, currentcategory, type, content} = event.target.dataset;
    console.log(event.target.dataset)
    this.setState({ draggedItem: {
      index: index,
      type: type,
      content: content,
      correctCategory: correctcategory,
      currentCategory: currentcategory || "uncategorizedList"
    }});
  }
  handleDragEnd() {
    this.setState({draggedItem: null});
  }
  checkAnswer() {
    var that = this;
    let currentScore = 0;
    let answerKey = {};

    // mark item as correct or not and tally score
    categories.forEach(function(category,i) {
      answerKey[category] = that.state[category].map((item, i) => {
        if (item.correctCategory !== category) {
          item.correct = false;
        } else {
          item.correct = true;
          currentScore += 1;
        }
        return item;
      });
    });

    // Set the new state to reflect incorrect answers
    let activityComplete = currentScore === this.state.highScore ? true: false;

    let newState = {
      attempts: this.state.attempts += 1,
      currentScore: currentScore,
      activityComplete: activityComplete
    }
    categories.forEach((categoryName, i)=> {
      newState[categoryName] = answerKey[categoryName];
    })
    this.setState(newState);
  }
  reset() {
    window.location.reload();
  }
  renderCategories() {
    return categories.map((categoryName) => {
      return <CategoryList
        key={categoryName} categoryName={categoryName}
        currentItems={this.state[categoryName]}
        removeItem={this.removeItem.bind(this)}
        handleDragItem={this.handleDragItem.bind(this)}
        renderCategoryListItems={this.renderCategoryListItems.bind(this)}
        draggedItem={this.state.draggedItem}
        addItem={this.addItem.bind(this)} />;
    });
  }

  removeInstructions() {
    console.log('instructions removed');
    this.setState({
      instructionsActive: false
    });
  }

  renderCategoryListItems(items, categoryName) {
    return items.map((item, i) => {

      // Determine to display image or text depending on item
      let itemDisplay = item.type === "image" ? 
          <img src={`${appURLs.IMAGE_BASE}/${item.content}`}/>
          : item.content;

      if (this.state.draggedItem) {
        let { index, currentCategory } = this.state.draggedItem;
        if (i == index && categoryName === currentCategory) {
          console.log("should be invisible");
        } else {
          console.log("should be visible");
          console.log(i);
          console.log(index);
          console.log(categoryName);
          console.log(currentCategory);
          console.log(i === index);
          console.log(categoryName === currentCategory);
        }
      }

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
          onDragStart={this.handleDragItem.bind(this)}>
            {itemDisplay}
        </ListItem>
      )
    })
  }
  render() {
    let {uncategorizedList, attempts, currentScore} = this.state;
    let {instructionsActive, instructionsText } = this.state;
    var results = this.state.activityComplete ?
      <Results
        attempts={attempts}
        currentScore={currentScore}
        reset={this.reset.bind(this)}/> : null;

    if (!uncategorizedList) {
      return <div>Loading... </div>
    } else {
        return (
          <div>
            <Instructions
              active={instructionsActive}
              text={instructionsText}
              removeInstructions={this.removeInstructions.bind(this)} />
            <CategorizeWrapper
              instructionsActive={instructionsActive}
            >
              {results}
              <DescriptionsList items={uncategorizedList}
                renderCategoryListItems={this.renderCategoryListItems.bind(this)}
                handleDragItem={this.handleDragItem.bind(this)}
                handleDragEnd={this.handleDragEnd.bind(this)}
                checkAnswer={this.checkAnswer.bind(this)}
                attempts={this.state.attempts}
                currentScore={this.state.currentScore}
                highScore={this.state.highScore}
                activityComplete={this.state.activityComplete}/>
              <CategoriesWrapper>
                {this.renderCategories()}
              </CategoriesWrapper>
            </CategorizeWrapper>
          </div>
        )
    }
  }
}

export default CategoryActivity;
