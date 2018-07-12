import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';
import styles from './style';
import { noop } from '../../../utils/common';

class ActionButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Image source={this.props.src} resizeMode="stretch" />
      </TouchableOpacity>
    );
  }
}

ActionButton.defaultProps = {
  onPress: noop,
  src: '',
};

ActionButton.propTypes = {
  onPress: PropTypes.func,
  src: PropTypes.string,
};

export default ActionButton;
