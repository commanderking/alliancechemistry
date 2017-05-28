import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const CategoryUl = styled.div`
  width: 33.3%;
  display: inline-block;
  vertical-align: top;
  position: relative;
`;

const DropArea = styled.div`
  width: 95%;
  margin: auto;
  height: 90vh;
  min-height: 500px;
  border-radius: 5px;
  padding: 0.25em;
  background-color: lightgray;
  border: ${(props) => {
    return props.draggedItem === null ? 'none' : '2px dotted black';
  }}

`;

class CategoryList extends Component {
  drop(event) {
    // If statement to prevent drag and drop onto same category
    const { categoryName } = this.props;
    const { content, type, index, correctCategory, currentCategory } = this.props.draggedItem;

    // If item moved to a new category
    if (categoryName !== currentCategory) {
      this.props.addItem(categoryName, {
        type,
        content,
        correctCategory,
        currentCategory,
      });
      this.props.removeItem(index, currentCategory);
    }
  }

  allowDrop(event) {
    event.preventDefault();
  }

  render() {
    const { categoryName, currentItems } = this.props;
    return (
      <CategoryUl>
        <h3>{categoryName}</h3>
        <DropArea
          onDrop={this.drop.bind(this)}
          onDragOver={this.allowDrop.bind(this)}
          draggedItem={this.props.draggedItem}
        >
          {this.props.renderCategoryListItems(currentItems, categoryName)}
        </DropArea>
      </CategoryUl>
    );
  }
}

CategoryList.propTypes = {
  categoryName: PropTypes.string.isRequired,
  currentItems: PropTypes.array.isRequired,
  draggedItem: PropTypes.shape({
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    correctCategory: PropTypes.string.isRequired,
    currentCategory: PropTypes.string.isRequired,
  }),
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  renderCategoryListItems: PropTypes.func.isRequired,
};

export default CategoryList;
