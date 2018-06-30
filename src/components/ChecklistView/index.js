import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import ListItem from './components/ListItem';
import styles from './style';


class ChecklistView extends React.Component {
  render() {
    const listItems = this.props.checklistData.map(({ label, value }) => (
      <ListItem
        itemLabel={label}
        value={value}
        key={label}
        onChange={this.props.updateList(label)}
      />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.checklistHeader}>
          <TouchableHighlight onPress={this.props.onBack} style={styles.backBtn}>
            <Text style={{ fontWeight: 'bold' }}>
                Back
            </Text>
          </TouchableHighlight>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>
              {this.props.selectedCategory}
            </Text>
          </View>
        </View>
        <ScrollView style={styles.checklistBody}>
          {listItems}
        </ScrollView>

      </View>
    );
  }
}
ChecklistView.defaultProps = {
  selectedCategory: 'category1',
  checklistData: [],
  onBack: () => {},
  updateList: () => {},
};
ChecklistView.propTypes = {
  selectedCategory: PropTypes.string,
  checklistData: PropTypes.arrayOf(PropTypes.object),
  onBack: PropTypes.func,
  updateList: PropTypes.func,
};
export default ChecklistView;
