import React, { Component } from 'react';
import DescriptionsList from './DescriptionsList';
import CategoryList from './CategoryList';
import styled from 'styled-components';
import ListItem from './ListItem';


const categories = ["Alpha Decay", "Beta Decay", "Gamma Radiation"];

const CategoryActivityStyle = styled.div`
  min-height: 500px;
`;

const CategoriesWrapper = styled.div`
  width: 75%;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  min-height: 500px;
  height: 100%;
  position: relative;
`;

class CategoryActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attempts: 0,
      currentScore: 0,
      allCorrect: false,
      uncategorizedList: null
    }
  }
  componentDidMount() {
    var initialState = {};
    initialState.uncategorizedList = testList;
    initialState.highScore = testList.length;
    categories.forEach((categoryName, i)=> {
      initialState[categoryName] = [];
    })
    this.setState(initialState, console.log(this.state));
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
    let {index, correctcategory, currentcategory} = event.target.dataset;
    this.setState({ draggedItem: {
      index: index,
      text: event.target.innerHTML,
      correctCategory: correctcategory,
      currentCategory: currentcategory || "uncategorizedList"
    }});
  }
  checkAnswer() {
    var that = this;
    let currentScore = 0;
    let answerKey = {};
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

    let newState = {
      attempts: this.state.attempts += 1,
      currentScore: currentScore
    }
    categories.forEach((categoryName, i)=> {
      newState[categoryName] = answerKey[categoryName];
    })
    this.setState(newState);
  }
  renderCategories() {
    var that = this;
    return categories.map((categoryName) => {
      return <CategoryList
        key={categoryName} categoryName={categoryName}
        currentItems={this.state[categoryName]}
        removeItem={that.removeItem.bind(this)}
        handleDragItem={this.handleDragItem.bind(this)}
        renderCategoryList={this.renderCategoryList}
        draggedItem={this.state.draggedItem}
        addItem={this.addItem.bind(this)}/>;
    })
  }
  renderCategoryList(items, categoryName) {
    return items.map((item, i) => {
      return (
        <ListItem
          key={i}
          data-index={i}
          correct={item.correct}
          data-correctcategory={item.correctCategory}
          data-currentcategory={categoryName}
          draggable="true"
          onDragStart={this.handleDragItem.bind(this)}>
            {item.text}
        </ListItem>
      )
    })
  }
  render() {
    let {uncategorizedList} = this.state;
    if (!uncategorizedList) {
      return <div>Loading... </div>
    } else {
        return (
          <CategoryActivityStyle>
            <DescriptionsList items={uncategorizedList}
              renderCategoryList={this.renderCategoryList}
              handleDragItem={this.handleDragItem.bind(this)}
              checkAnswer={this.checkAnswer.bind(this)}
              attempts={this.state.attempts}
              currentScore={this.state.currentScore}
              highScore={this.state.highScore}/>
            <CategoriesWrapper>
              {this.renderCategories()}
            </CategoriesWrapper>
          </CategoryActivityStyle>
        )
    }
  }
}

var testList = [
  {
    "text" : "A neutron changes into a proton and an electron",
    "correctCategory": "Beta Decay"
  },
  {
    "text" : "Can travel across galaxies",
    "correctCategory" : "Gamma Radiation"
  },
  {
    "text" : "the particles released can be stopped by a piece of paper",
    "correctCategory" : "Alpha Decay"
  },
  {
    "text" : "the particles released have 2 protons and 2 neutrons like a helium nucleus",
    "correctCategory": "Alpha Decay"
  },
  {
    "text" : "the particles released can travel only a few centimeters through the air",
    "correctCategory" : "Alpha Decay"
  },
  {
    "text" : "the particles released can only be stopped by a thick sheet of lead or several meters of concrete or water",
    "correctCategory": "Gamma Radiation"
  },
  {
    "text" : "is a form of electromagnetic radiation",
    "correctCategory": "Gamma Decay"
  },
  {
    "text" : "the particles released can travel a few meters through the air",
    "correctCategory" : "Beta Decay"
  },
  {
    "text" : "particles released are most dangerous when swallowed or breathed in",
    "correctCategory": "Alpha Decay"
  },
  {
    "text" : "can be used to reduce the risk of food-borne illnesses",
    "correctCategory" : "Gamma Radiation"
  },
]

export default CategoryActivity;
