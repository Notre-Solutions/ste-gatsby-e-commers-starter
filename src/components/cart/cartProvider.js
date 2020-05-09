import React, { Component, useState } from 'react';
import CartContext from './context';
import cookie from 'react-cookies';

class CartProvider extends Component {
  constructor() {
    super();

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);

    this.state = {
      cartItems: {},
      cartTotal: 0,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
    };
  }

  // componentWillMount() {
  // this.setState({
  //   cartItems: cookie.load('cartItems') || {},
  //   cartTotal: cookie.load('cartTotals') || 0,
  // });
  // }

  saveInCookies(total, items) {
    // cookie.save('cartItems', items, { path: '/' });
    // cookie.save('cartTotals', total, { path: '/' });
  }

  addToCart = (quantity, skuId, price, authUser) => {
    const cartTotal =
      Number(this.state.cartTotal) + Number(quantity) * Number(price);

    var currentCartItems = this.state.cartItems;
    if (currentCartItems[skuId]) {
      currentCartItems[skuId].quantity += quantity;
      console.log(currentCartItems);
    } else {
      currentCartItems[skuId] = { price, quantity };
      console.log(currentCartItems);
    }

    this.saveInCookies(cartTotal, currentCartItems);

    console.log(cartTotal);
    console.log(currentCartItems);
    this.setState({
      cartTotal,
      cartItems: currentCartItems,
    });

    console.log(this.state);
  };

  removeFromCart = (cartItem, authUser) => {
    const cartTotal =
      Number(this.state.cartTotal) - Number(cartItem.price);

    var currentCartItems = this.state.cartItems;
    var index = currentCartItems.indexOf(cartItem.id);
    if (index !== -1) {
      currentCartItems.slice(index, 1);
    }

    this.saveInCookies(cartTotal, currentCartItems);

    return this.setState(() => ({
      cartTotal,
      cartItems: currentCartItems,
    }));
  };

  render() {
    console.log(this.state);
    return (
      <CartContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
