import React, { Component } from 'react';
import CartContext from './context';
import cookie from 'react-cookies';

class CartProvider extends Component {
  constructor() {
    super();

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);

    this.state = {
      cartItems: [],
      cartTotal: 0,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
    };
  }

  componentWillMount() {
    this.setState({
      cartItems: cookie.load('cartItems') || [],
      cartTotal: cookie.load('cartTotals') || 0,
    });
  }

  saveInCookies(total, items) {
    cookie.save('cartItems', items, { path: '/' });
    cookie.save('cartTotals', total, { path: '/' });
  }

  addToCart = (quantity, cartItem, authUser) => {
    const cartTotal =
      Number(this.state.cartTotal) +
      Number(quantity) * Number(cartItem.price);
    console.log(this.state.cartTotal);
    console.log(quantity);
    console.log(cartItem.price);
    console.log(cartTotal);

    var currentCartItems = this.state.cartItems;
    var index = currentCartItems.indexOf(cartItem.id);
    if (index === -1) {
      cartItem.quantity = 1;
      currentCartItems.push(cartItem);
    } else {
      currentCartItems[index].quantity += 1;
    }

    this.saveInCookies(cartTotal, currentCartItems);

    return this.setState(() => ({
      cartTotal,
      cartItems: currentCartItems,
    }));
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
    return (
      <CartContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
