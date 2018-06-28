import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import styles from './style';
import CategoryCard from '../CategoryCard';

class CategoriesView extends React.Component {
  render() {
    const { categories } = this.props;
    const categoryCards = categories.map(({ categoryName, quote }) => (
      <CategoryCard
        categoryName={categoryName}
        quote={quote}
        key={categoryName}
      />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>
            Categories
          </Text>
        </View>
        <View style={styles.sliderView}>
          <ScrollView
            pagingEnabled
            horizontal
            style={styles.scrollView}
          >
            {categoryCards}
          </ScrollView>
        </View>
      </View>
    );
  }
}
CategoriesView.defaultProps = {
  categories: [
    { categoryName: 'category1', quote: 'quote1' },
    { categoryName: 'category2', quote: 'quote2' },
    { categoryName: 'category3', quote: 'quote3' },
    { categoryName: 'category4', quote: 'quote4' },
    { categoryName: 'category5', quote: 'quote5' },
    { categoryName: 'category6', quote: 'quote6' },
  ],
};
CategoriesView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};
export default CategoriesView;
