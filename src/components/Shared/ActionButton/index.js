import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image } from 'react-native';
import styles from './style';
import { noop } from '../../../utils/common';

class ActionButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={this.props.border ? styles.button : { ...styles.button, ...styles.noBorder }}
      >
        <Image source={this.props.src} resizeMode="contain" />
      </TouchableOpacity>
    );
  }
}

ActionButton.defaultProps = {
  onPress: noop,
  src: '',
  border: true,
};

ActionButton.propTypes = {
  onPress: PropTypes.func,
  src: PropTypes.string,
  border: PropTypes.bool,
};

export default ActionButton;
