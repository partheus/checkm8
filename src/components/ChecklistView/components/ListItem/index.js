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
import ActionButton from '../../../Shared/ActionButton';
import editIcon from '../../../../assets/edit.png';
import deleteIcon from '../../../../assets/delete.png';
import crossIcon from '../../../../assets/cross.png';
import tickIcon from '../../../../assets/tick.png';

class ListItem extends React.Component {
    state={
      checked: this.props.value,
      showDeleteMode: false,
    }

    toggle=() => {
      this.setState(prevState => ({ checked: !prevState.checked }));
    }

    toggleDeleteMode=() => {
      this.setState(prevState => ({ showDeleteMode: !prevState.showDeleteMode }));
    }

    showItem=() => (
      <View style={styles.container}>
        <CheckBox value={this.props.value} onValueChange={this.props.onChange} />
        <View style={styles.itemLabel}>
          <Text style={styles.itemLabelText}>
            {this.props.itemLabel}
          </Text>
        </View>
        <ActionButton src={editIcon} onPress={this.props.editItem} />
        <ActionButton src={deleteIcon} onPress={this.toggleDeleteMode} />
      </View>
    )

    showDeleteDialog=() => (
      <View style={styles.deleteContainer}>
        <View style={styles.itemLabel}>
          <Text style={styles.itemLabelText}>
           Confirm Delete?
          </Text>
        </View>
        <ActionButton src={tickIcon} onPress={this.props.deleteItem} />
        <ActionButton src={crossIcon} onPress={this.toggleDeleteMode} />
      </View>
    )

    render() {
      const display = this.state.showDeleteMode ? this.showDeleteDialog() : this.showItem();
      return display;
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
