import React, { Component } from 'react';
import { View } from 'react-native';
import Categories from './src/pages/Categories';
import Checklist from './src/pages/Checklist';

export default class App extends Component {
  state={
    page: 'Categories',
    selectedCategory: null,
  }

  onCardClick=category => () => {
    this.setState({ page: 'List', selectedCategory: category });
  }

    onBackButtonClick=() => {
      this.setState({ page: 'Categories', selectedCategory: null });
    }

    render() {
      const { page, selectedCategory } = this.state;
      return (
        <View style={{ flex: 1 }}>
          {page === 'Categories' ? <Categories onCardClick={this.onCardClick} /> : <Checklist selectedCategory={selectedCategory} onBack={this.onBackButtonClick} />}
        </View>
      );
    }
}
