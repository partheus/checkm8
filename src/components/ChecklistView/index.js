import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import ListItem from './components/ListItem';
import styles from './style';
import { noop } from '../../utils/common';

class ChecklistView extends React.Component {
  render() {
    const listLabels = Object.keys(this.props.checklistData);
    const listItems = listLabels.map(label => (
      <ListItem
        itemLabel={label}
        value={this.props.checklistData[label]}
        key={label}
        onChange={this.props.updateList(label)}
        deleteItem={this.props.deleteItem(label)}
        editItem={this.props.setModal(label)}
      />
    ));
    return (
      <View style={styles.container}>
        <ScrollView style={styles.checklistBody}>
          {listItems}
        </ScrollView>
        {
          this.props.modalContent
          && (
          <Modal
            transparent
            onRequestClose={this.props.setModal(null)}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalBody}>
                <Text style={styles.modalText}>
                      Enter the new label
                </Text>
                <TextInput
                  defaultValue={this.props.modalContent}
                  style={styles.modalText}
                  underlineColorAndroid={styles.modalText.color}
                  returnKeyType="done"
                  onSubmitEditing={this.props.editItem(this.props.modalContent)}
                />
              </View>
            </View>
          </Modal>
          )
        }
        {
          this.props.createMode
          && (
          <Modal
            transparent
            onRequestClose={this.props.toggleCreateMode}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalBody}>
                <Text style={styles.modalText}>
                      Enter the new item
                </Text>
                <TextInput
                  placeholder="Type an item you want to track"
                  placeholderTextColor={styles.modalPlaceholder.color}
                  style={styles.modalText}
                  underlineColorAndroid={styles.modalText.color}
                  returnKeyType="done"
                  onSubmitEditing={this.props.createItem}
                />
              </View>
            </View>
          </Modal>
          )
        }
      </View>
    );
  }
}
ChecklistView.defaultProps = {
  checklistData: {},
  updateList: noop,
  createItem: noop,
  deleteItem: noop,
  editItem: noop,
  toggleCreateMode: noop,
  setModal: noop,
  createMode: false,
  modalContent: '',
};
ChecklistView.propTypes = {
  checklistData: PropTypes.object,
  updateList: PropTypes.func,
  createItem: PropTypes.func,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  toggleCreateMode: PropTypes.func,
  setModal: PropTypes.func,
  createMode: PropTypes.bool,
  modalContent: PropTypes.string,
};
export default ChecklistView;
