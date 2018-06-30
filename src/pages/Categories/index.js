import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoriesView from '../../components/CategoriesView';
import AnimView from '../../components/Shared/AnimView';

class Categories extends Component {
  render() {
    return (
      <AnimView style={{ flex: 1 }}>
        <CategoriesView onCardClick={this.props.onCardClick} />
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
