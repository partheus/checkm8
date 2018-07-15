import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ToastAndroid, Linking } from 'react-native';
import CategoriesView from '../../components/CategoriesView';
import { storeData, retrieveData, removeData } from '../../utils/common';
import ActionButton from '../../components/Shared/ActionButton';
import newIcon from '../../assets/plus.png';
import defaultCategories from './data';

class Categories extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Categories',
    headerLeft: <View />,
    headerRight: (
      <ActionButton src={newIcon} onPress={navigation.getParam('toggleCreateMode')} border={false} />
    ),
  });

  state={
    categories: [],
    createMode: false,
    modalContent: { name: null, quote: null },
  }

  componentDidMount() {
    this.fetchCategories()
      .catch(() => {
        storeData('Categories', defaultCategories)
          .then(this.fetchCategories);
      });
    this.props.navigation.setParams({ toggleCreateMode: this.toggleCreateMode });
  }


  setModal=(name, quote) => () => {
    this.setState({
      modalContent: {
        name, quote,
      },
    });
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
          'U being cheeky m8? Fill the name and quote fields or press back to cancel',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
    }

    deleteCategory=category => () => {
      const key = this.state.categories.map(cat => cat.categoryName).indexOf(category);
      const updatedList = [...this.state.categories];
      updatedList.splice(key, 1);
      storeData('Categories', updatedList).then(this.fetchCategories);
    }

    editCategory=(oldName, oldQuote) => (name, quote) => {
      if (name === '' || quote === '') {
        ToastAndroid.showWithGravity(
          'Fill the values for category name and quote',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (oldName === name && oldQuote === quote) {
        ToastAndroid.showWithGravity(
          'Press back to cancel editing or enter new values',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else if (oldName === name) {
        const key = this.state.categories.map(obj => obj.categoryName).indexOf(name);
        const updatedObj = { ...this.state.categories[key], quote };
        const updatedList = [...this.state.categories];
        updatedList.splice(key, 1, updatedObj);
        storeData('Categories', updatedList).then(this.fetchCategories).then(this.setModal(null, null));
      } else {
        const key = this.state.categories.map(obj => obj.categoryName).indexOf(oldName);
        const updatedList = [...this.state.categories];
        updatedList[key].categoryName = name;
        updatedList[key].quote = quote;
        this.replaceList(oldName, name).then(() => {
          storeData('Categories', updatedList).then(this.fetchCategories)
            .then(this.setModal(null, null));
        });
      }
    }

    replaceList=(oldCategory, newCategory) => retrieveData(oldCategory)
      .then((list) => {
        removeData(oldCategory);
        return storeData(newCategory, JSON.parse(list));
      })

    toggleCreateMode=() => {
      this.setState(prevState => ({ createMode: !prevState.createMode }));
    }


  viewList=category => () => {
    this.props.navigation.navigate('Checklist', { selectedCategory: category });
  }

  openLink=() => {
    Linking.openURL('https://github.com/partheus/checkm8');
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
          editCategory={this.editCategory}
          modalContent={this.state.modalContent}
          setModal={this.setModal}
          openLink={this.openLink}
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
