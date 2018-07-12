import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import styles from './style';

class CategoryModal extends React.Component {
    state={
      name: '',
      quote: '',
    }

    setName=(name) => {
      this.setState({ name });
    }

    setQuote=(quote) => {
      this.setState({ quote });
    }

    submit=() => {
      this.props.onSubmit(this.state.name, this.state.quote);
    }

    render() {
      return (
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>
                Enter the new item
            </Text>
            <TextInput
              placeholder="Enter category name"
              placeholderTextColor={styles.modalPlaceholder.color}
              style={styles.modalText}
              underlineColorAndroid={styles.modalText.color}
              returnKeyType="done"
              onChangeText={this.setName}
            />
            <TextInput
              placeholder="Enter quote"
              placeholderTextColor={styles.modalPlaceholder.color}
              style={styles.modalText}
              underlineColorAndroid={styles.modalText.color}
              returnKeyType="done"
              onChangeText={this.setQuote}
            />
            <Button title="Create" onPress={this.submit} />
          </View>
        </View>
      );
    }
}


export default CategoryModal;
