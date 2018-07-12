import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';
import deleteIcon from '../../assets/rubbish-bin.png';
import editIcon from '../../assets/edit.png';
import { noop } from '../../utils/common';

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
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionBtn} onPress={this.props.onDelete}>
            <Image resizeMode="cover" source={deleteIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={this.props.onEdit}>
            <Image resizeMode="cover" source={editIcon} />
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

CategoryCard.defaultProps = {
  categoryName: 'Category1',
  quote: 'quote1',
  onClick: () => {},
  onDelete: noop,
  onEdit: noop,
};

CategoryCard.propTypes = {
  categoryName: PropTypes.string,
  quote: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default CategoryCard;
