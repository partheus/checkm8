import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import AnimView from '../../components/Shared/AnimView';
import ChecklistView from '../../components/ChecklistView';
// import sta from './data';

class Checklist extends Component {
  state={
    checklistData: {},
    selectedCategory: this.props.navigation.getParam('selectedCategory', 'Documents'),
    modalContent: null,
    createMode: false,
  }


  componentDidMount() {
    this.fetchList();
  }

  setModal=content => () => {
    this.setState({ modalContent: content });
  }

  fetchList=() => {
    this.retrieveData(this.state.selectedCategory)
      .then((data) => {
        const checklistData = JSON.parse(data);
        this.setState({ checklistData });
      });
  }

  updateList=key => () => {
    const updatedList = { ...this.state.checklistData, [key]: !this.state.checklistData[key] };
    console.log(key, updatedList);
    this.storeData(this.state.selectedCategory, updatedList).then(this.fetchList);
  }


  storeData = async (categoryName, data) => {
    try {
      await AsyncStorage.setItem(categoryName, JSON.stringify(data));
    } catch (error) {
      alert(error);
    }
  }

  retrieveData = async (categoryName) => {
    try {
      const value = await AsyncStorage.getItem(categoryName);
      return value;
    } catch (error) {
      // Error retrieving data
      return 'error';
    }
  }

  createItem=(changeEvent) => {
    const key = changeEvent.nativeEvent.text;
    const updatedList = { ...this.state.checklistData, [key]: false };
    this.storeData(this.state.selectedCategory, updatedList)
      .then(this.fetchList).then(this.toggleCreateMode);
  }

  deleteItem=key => () => {
    const updatedList = { ...this.state.checklistData, [key]: undefined };
    this.storeData(this.state.selectedCategory, updatedList).then(this.fetchList);
  }

  editItem=oldValue => (changeEvent) => { // TODO: handle label collision
    const newValue = changeEvent.nativeEvent.text;
    const updatedList = {
      ...this.state.checklistData,
      [newValue]: this.state.checklistData[oldValue],
      [oldValue]: undefined,
    };
    this.storeData(this.state.selectedCategory, updatedList)
      .then(this.fetchList).then(this.setModal(null));
  }


transform=dataObject => Object.keys(dataObject).map(item => (
  {
    label: item,
    value: dataObject[item],
  }))

  toggleCreateMode=() => {
    this.setState(prevState => ({ createMode: !prevState.createMode }));
  }

  render() {
    return (
      <AnimView style={{ flex: 1 }}>
        <ChecklistView
          selectedCategory={this.state.selectedCategory}
          checklistData={this.state.checklistData}
          onBack={this.props.onBack}
          updateList={this.updateList}
          createMode={this.state.createMode}
          toggleCreateMode={this.toggleCreateMode}
          createItem={this.createItem}
          deleteItem={this.deleteItem}
          editItem={this.editItem}
          modalContent={this.state.modalContent}
          setModal={this.setModal}
        />
      </AnimView>
    );
  }
}

Checklist.defaultProps = {
  navigation: {},
  onBack: () => {},
};
Checklist.propTypes = {
  navigation: PropTypes.object,
  onBack: PropTypes.func,
};

export default Checklist;