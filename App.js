import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Categories from './src/pages/Categories';
import Checklist from './src/pages/Checklist';

class App extends Component {
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
        <View style={{ flex: 1, backgroundColor: '#171a22' }}>
          {page === 'Categories' ? <Categories onCardClick={this.onCardClick} /> : <Checklist selectedCategory={selectedCategory} onBack={this.onBackButtonClick} />}
        </View>
      );
    }
}

export default createStackNavigator({
  Categories,
  Checklist,
}, {
  initialRouteName: 'Categories',
});
