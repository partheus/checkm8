import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoriesView from '../../components/CategoriesView';
import AnimView from '../../components/Shared/AnimView';

class Categories extends Component {
  viewList=category => () => {
    this.props.navigation.navigate('Checklist', { selectedCategory: category });
  }

  render() {
    return (
      <AnimView style={{ flex: 1 }}>
        <CategoriesView onCardClick={this.viewList} />
      </AnimView>
    );
  }
}

Categories.defaultProps = {
  onCardClick: () => {},
};
Categories.propTypes = {
  onCardClick: PropTypes.func,
};
export default Categories;
