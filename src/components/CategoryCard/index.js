import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import styles from './style';

class CategoryCard extends React.Component {
  render() {
    const { categoryName, quote } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text>
            {categoryName}
          </Text>
        </View>
        <View style={styles.quote}>
          <Text>
            {quote}
          </Text>
        </View>
      </View>
    );
  }
}
CategoryCard.defaultProps = {
  categoryName: 'Category1',
  quote: 'quote1',
};
CategoryCard.propTypes = {
  categoryName: PropTypes.string,
  quote: PropTypes.string,
};
export default CategoryCard;
