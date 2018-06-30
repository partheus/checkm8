import React, { Component } from 'react';
import { View } from 'react-native';
import Categories from './src/pages/Categories';
import Checklist from './src/pages/Checklist';

export default class App extends Component {
  state={
    page: 'Categorie',
    selectedCategory: null,
  }

  render() {
    const { page, selectedCategory } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {page === 'Categories' ? <Categories /> : <Checklist />}
      </View>
    );
  }
}
