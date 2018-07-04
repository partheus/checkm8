import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './style';

class ActionButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}


export default ActionButton;
