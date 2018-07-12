import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './style';

class CategoryCard extends React.Component {
  render() {
    const { categoryName, quote } = this.props;
    return (

      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onClick} style={styles.card}>
          <Text style={styles.cardText}>
            {categoryName}
          </Text>
        </TouchableOpacity>
        <View style={styles.quote}>
          <Text style={styles.quoteText}>
            {`- ${quote} -`}
          </Text>
        </View>
      </View>

    );
  }
}
CategoryCard.defaultProps = {
  categoryName: 'Category1',
  quote: 'quote1',
  onClick: () => {},
};
CategoryCard.propTypes = {
  categoryName: PropTypes.string,
  quote: PropTypes.string,
  onClick: PropTypes.func,
};
export default CategoryCard;
