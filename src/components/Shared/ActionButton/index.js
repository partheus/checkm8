import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';

class ActionButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Image source={this.props.src} resizeMode="stretch" />
      </TouchableOpacity>
    );
  }
}


export default ActionButton;
