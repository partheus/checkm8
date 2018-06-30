import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    top: new Animated.Value(600),
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: 750,
        },
      ),
      Animated.timing(
        this.state.top,
        {
          toValue: 0,
          easing: Easing.elastic(3),
          duration: 750,
        },
      ),
    ]).start();
  }

  render() {
    const { fadeAnim, top } = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          position: 'relative',
          top,
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}


// FadeInView.defaultProps = {
//   style: {},
//   children: {},
// };
// FadeInView.propTypes = {
//   style: PropTypes.objectOf(),
//   children: PropTypes.objectOf(),
// };

export default FadeInView;
