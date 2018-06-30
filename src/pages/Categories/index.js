import React, { Component } from 'react';
import CategoriesView from '../../components/CategoriesView';
import AnimView from '../../components/Shared/AnimView';

export default class Categories extends Component {
  render() {
    return (
      <AnimView style={{ flex: 1 }}>
        <CategoriesView />
      </AnimView>
    );
  }
}
