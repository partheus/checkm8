import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Modal,
} from 'react-native';
import styles from './style';
import CategoryCard from '../CategoryCard';
import CategoryModal from './components/CategoryModal';

class CategoriesView extends React.Component {
  render() {
    const { categories } = this.props;
    const categoryCards = categories.map(({ categoryName, quote }) => (
      <CategoryCard
        categoryName={categoryName}
        quote={quote}
        key={categoryName}
        onClick={this.props.onCardClick(categoryName)}
        onDelete={this.props.deleteCategory(categoryName)}
      />
    ));
    return (
      <View style={styles.container}>
        {
          this.props.createMode
          && (
          <Modal
            transparent
            onRequestClose={this.props.toggleCreateMode}
            animationType="slide"
          >
            <CategoryModal onSubmit={this.props.addCategory} />
          </Modal>
          )
        }
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
    { categoryName: 'Documents', quote: 'quote1' },
    { categoryName: 'Medication', quote: 'quote2' },
    { categoryName: 'Apparel', quote: 'quote3' },
    { categoryName: 'Electronics', quote: 'quote4' },
    { categoryName: 'Toiletries', quote: 'quote5' },
    { categoryName: 'Kitchenware', quote: 'quote6' },
    { categoryName: 'Food Items', quote: 'quote4' },
    { categoryName: 'Stationery', quote: 'quote5' },
    { categoryName: 'Misc', quote: 'quote6' },
  ],
  onCardClick: () => {},
};
CategoriesView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  onCardClick: PropTypes.func,
};
export default CategoriesView;
