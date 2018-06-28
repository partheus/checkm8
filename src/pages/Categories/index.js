import React, { Component } from 'react';
import CategoriesView from '../../components/CategoriesView';
import AnimView from '../../components/Shared/AnimView';

export default class Home extends Component {
  render() {
    return (
      <AnimView>
        <CategoriesView />
      </AnimView>
    );
  }
}
