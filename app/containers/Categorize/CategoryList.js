import React, { Component } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';

const CategoryUl = styled.div`
  width: 33.3%;
  display: inline-block;
  vertical-align: top;
  position: relative;
`;

const DropArea = styled.div`
  width: 95%;
  margin: auto;
  min-height: 500px;
  border-radius: 5px;
  padding: 0.25em;
  background-color: lightgray;
  border: ${props => {
    return props.draggedItem === null ? 'none' : '2px dotted black';
  }}

`;

class CategoryList extends Component {
  drop(event) {
    // If statement to prevent drag and drop onto same category
    let { text, index, correctCategory, currentCategory}= this.props.draggedItem;
    if (this.props.categoryName !== currentCategory) {
      this.props.addItem(this.props.categoryName, {
        "text" : text,
        "correctCategory" : correctCategory,
        "currentCategory" : currentCategory
      })
      this.props.removeItem(index, currentCategory);
    }
  }

  allowDrop(event){
    event.preventDefault();
  }

  render() {
    let {categoryName, currentItems} = this.props;
    return (
      <CategoryUl>
        <h3>{categoryName}</h3>
        <DropArea
          onDrop={this.drop.bind(this)}
          onDragOver={this.allowDrop.bind(this)}
          draggedItem={this.props.draggedItem}>
          {this.props.renderCategoryListItems(currentItems, categoryName)}
        </DropArea>
      </CategoryUl>
    )
  }
}

export default CategoryList;
