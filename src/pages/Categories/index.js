import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ToastAndroid } from 'react-native';
import CategoriesView from '../../components/CategoriesView';
import { storeData, retrieveData } from '../../utils/common';
import ActionButton from '../../components/Shared/ActionButton';
import newIcon from '../../assets/plus.png';
import defaultCategories from './data';

class Categories extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Categories',
    headerLeft: <View />,
    headerRight: (
      <ActionButton src={newIcon} onPress={navigation.getParam('toggleCreateMode')} />
    ),
  });

  state={
    categories: [],
    createMode: false,
  }

  componentDidMount() {
    this.fetchCategories()
      .catch(() => {
        storeData('Categories', defaultCategories)
          .then(this.fetchCategories);
      });
    this.props.navigation.setParams({ toggleCreateMode: this.toggleCreateMode });
  }

  fetchCategories=() => retrieveData('Categories')
    .then((data) => {
      if (data === null) {
        throw new Error('not set');
      }
      const categories = JSON.parse(data);
      this.setState({ categories });
    })

    addCategory=(categoryName, quote) => {
      if (categoryName.length > 0 && quote.length > 0) {
        const newCategory = { categoryName, quote };
        const updatedCategories = this.state.categories.concat(newCategory);
        storeData('Categories', updatedCategories).then(this.fetchCategories).then(this.toggleCreateMode);
      } else {
        ToastAndroid.showWithGravity(
          'U wot m8? Fill the name and quote fields',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }

    deleteCategory=(category) => {
      const key = this.state.categories.map(cat => cat.categoryName).indexOf(category);
      const updatedList = [...this.state.categories];
      updatedList.splice(key, 1);
      storeData('Categories', updatedList).then(this.fetchCategories);
    }

    toggleCreateMode=() => {
      this.setState(prevState => ({ createMode: !prevState.createMode }));
    }

  viewList=category => () => {
    this.props.navigation.navigate('Checklist', { selectedCategory: category });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CategoriesView
          onCardClick={this.viewList}
          categories={this.state.categories}
          createMode={this.state.createMode}
          toggleCreateMode={this.toggleCreateMode}
          addCategory={this.addCategory}
          deleteCategory={this.deleteCategory}
        />
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
