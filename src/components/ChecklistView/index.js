import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ScrollView,
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
      />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.checklistHeader}>
          <Text>
            {this.props.selectedCategory}
          </Text>
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
};
ChecklistView.propTypes = {
  selectedCategory: PropTypes.string,
  checklistData: PropTypes.arrayOf(PropTypes.object),
};
export default ChecklistView;
