import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ToastAndroid } from 'react-native';
import { storeData, retrieveData } from '../../utils/common';
import ChecklistView from '../../components/ChecklistView';
import ActionButton from '../../components/Shared/ActionButton';
import newIcon from '../../assets/plus.png';

class Checklist extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('selectedCategory', 'Checklist'),
    headerRight: (
      <ActionButton src={newIcon} onPress={navigation.getParam('toggleCreateMode')} />
    ),
  });

  state={
    checklistData: {},
    selectedCategory: this.props.navigation.getParam('selectedCategory', 'Documents'),
    modalContent: null,
    createMode: false,
  }


  componentDidMount() {
    this.fetchList()
      .catch(() => {
        storeData(this.state.selectedCategory, {})
          .then(this.fetchList);
      });
    this.props.navigation.setParams({ toggleCreateMode: this.toggleCreateMode });
  }

  setModal=content => () => {
    this.setState({ modalContent: content });
  }

  fetchList=() => retrieveData(this.state.selectedCategory)
    .then((data) => {
      // alert(data);
      if (data === null) {
        throw new Error('not set');
      }
      const checklistData = JSON.parse(data);
      this.setState({ checklistData });
    })

  updateList=key => () => {
    const updatedList = { ...this.state.checklistData, [key]: !this.state.checklistData[key] };
    storeData(this.state.selectedCategory, updatedList).then(this.fetchList);
  }


  createItem=(changeEvent) => {
    const key = changeEvent.nativeEvent.text;
    if (key === '') {
      ToastAndroid.showWithGravity(
        "Can't track the void, enter something real",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      const updatedList = { ...this.state.checklistData, [key]: false };
      storeData(this.state.selectedCategory, updatedList)
        .then(this.fetchList).then(this.toggleCreateMode);
    }
  }

  deleteItem=key => () => {
    const updatedList = { ...this.state.checklistData, [key]: undefined };
    storeData(this.state.selectedCategory, updatedList).then(this.fetchList);
  }

  editItem=oldValue => (changeEvent) => {
    const newValue = changeEvent.nativeEvent.text;
    if (newValue === '') {
      ToastAndroid.showWithGravity(
        "Can't track the void, enter something real",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (newValue === oldValue) {
      ToastAndroid.showWithGravity(
        'Change is the only constant. Enter a new label or press back to cancel editing',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      const updatedList = {
        ...this.state.checklistData,
        [newValue]: this.state.checklistData[oldValue],
        [oldValue]: undefined,
      };
      storeData(this.state.selectedCategory, updatedList)
        .then(this.fetchList).then(this.setModal(null));
    }
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
      <View style={{ flex: 1 }}>
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
      </View>
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
