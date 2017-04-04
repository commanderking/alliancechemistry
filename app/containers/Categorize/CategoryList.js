import React, { Component } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';

const CategoryUl = styled.div`
  width: 32%;
  display: inline-block;
  vertical-align: top;
  min-height: 500px;
  height: 100%;
  position: relative;
`;

const DropArea = styled.div`
  width: 90%;
  height: 90%;
  margin: auto;
  min-height: 500px;
  border: 1px solid black;
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
          onDragOver={this.allowDrop.bind(this)}>
          {this.props.renderCategoryList(currentItems, categoryName)}
        </DropArea>
      </CategoryUl>
    )
  }
}

export default CategoryList;
