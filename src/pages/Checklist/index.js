import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import AnimView from '../../components/Shared/AnimView';
import ChecklistView from '../../components/ChecklistView';
import sta from './data';

class Checklist extends Component {
  state={
    checklistData: {},
  }


  componentDidMount() {
    this.fetchList();
  }

  fetchList=() => {
    this.retrieveData(this.props.selectedCategory)
      .then((data) => {
        const checklistData = JSON.parse(data);
        this.setState({ checklistData });
      });
  }

  updateList=key => () => {
    const updatedList = { ...this.state.checklistData, [key]: !this.state.checklistData[key] };
    console.log(key, updatedList);
    this.storeData(this.props.selectedCategory, updatedList);
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

transform=dataObject => Object.keys(dataObject).map(item => (
  {
    label: item,
    value: dataObject[item],
  }))


render() {
  return (
    <AnimView style={{ flex: 1 }}>
      <ChecklistView checklistData={this.state.checklistData} onBack={this.props.onBack} updateList={this.updateList} />
    </AnimView>
  );
}
}

Checklist.defaultProps = {
  selectedCategory: 'Misc',
  onBack: () => {},
};
Checklist.propTypes = {
  selectedCategory: PropTypes.string,
  onBack: PropTypes.func,
};

export default Checklist;
