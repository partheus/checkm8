import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import CategoriesView from '../../components/CategoriesView';

class Categories extends Component {
  viewList=category => () => {
    this.props.navigation.navigate('Checklist', { selectedCategory: category });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CategoriesView onCardClick={this.viewList} />
      </View>
    );
  }
}

Categories.defaultProps = {
  navigation: {},
};
Categories.propTypes = {
  navigation: PropTypes.object,
};
export default Categories;
