import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  CheckBox,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';
import editIcon from '../../../../assets/edit.png';
import deleteIcon from '../../../../assets/delete.png';

class ListItem extends React.Component {
    state={
      checked: this.props.value,
    }

    toggle=() => {
      this.setState(prevState => ({ checked: !prevState.checked }));
    }

    render() {
      return (
        <View style={styles.container}>
          <CheckBox value={this.props.value} onValueChange={this.props.onChange} style={{ color: 'red' }} />
          <View style={styles.itemLabel}>
            <Text style={styles.itemLabelText}>
              {this.props.itemLabel}
            </Text>
          </View>
          <TouchableOpacity style={styles.actionBtn} onPress={this.props.editItem}>
            <Image resizeMode="stretch" source={editIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={this.props.deleteItem}>
            <Image resizeMode="stretch" source={deleteIcon} />
          </TouchableOpacity>
        </View>
      );
    }
}


ListItem.defaultProps = {
  itemLabel: 'label',
  value: false,
  onChange: () => {},
  editItem: () => {},
  deleteItem: () => {},
};
ListItem.propTypes = {
  itemLabel: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  editItem: PropTypes.func,
  deleteItem: PropTypes.func,
};
export default ListItem;
