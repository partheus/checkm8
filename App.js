import React, { Component } from 'react';
import { View } from 'react-native';
import Categories from './src/pages/Categories';

export default class App extends Component {
  state={
    page: 'Categories',
    selectedCategory: null,
  }

  render() {
    const { page, selectedCategory } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {page === 'Categories' ? <Categories /> : ''}
      </View>
    );
  }
}
