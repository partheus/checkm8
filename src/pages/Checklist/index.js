import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import AnimView from '../../components/Shared/AnimView';
import ChecklistView from '../../components/ChecklistView';
import sta from './data';

class Checklist extends Component {
  state={
    checklistData: [],
  }


  componentDidMount() {
    // this.storeData('Documents', sta.Documents);
    // this.storeData('Medication', sta.Medication);
    // this.storeData('Apparel', sta.Apparel);
    // this.storeData('Electronics', sta.Electronics);
    // this.storeData('Toiletries', sta.Toiletries);
    // this.storeData('Kitchenware', sta.Kitchenware);
    // this.storeData('Food Items', sta['Food Items']);
    // this.storeData('Stationery', sta.Stationery);
    // this.storeData('Misc', sta.Misc);
    this.fetchList();
  }

  fetchList=() => {
    this.retrieveData(this.props.selectedCategory)
      .then((data) => {
        const checklistData = this.transform(JSON.parse(data));
        this.setState({ checklistData });
      });
  }

  updateList=key => () => {
    // const updatedList = { ...this.state.checklistData, [key]: !this.state.checklistData[key] };
    console.log(key);
    // this.storeData(this.props.selectedCategory, updatedList).then(this.fetchList);
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
