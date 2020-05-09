import React, { Component } from 'react';

import Product from '../components/Stripe/Products';

export default class Products extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Product />
      </div>
    );
  }
}
