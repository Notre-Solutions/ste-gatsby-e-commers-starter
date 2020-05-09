import React, { useContext } from 'react';
import CartContext from './context';

import { GetProduct } from '../Stripe/Products';

import Checkout from '../Stripe/Checkout';

// TODO: test loading time
const Cart = () => {
  const context = useContext(CartContext);
  var cartItems = context.cartItems;
  var productsInCart = [];
  var checkOutItems = [];

  Object.keys(cartItems).forEach(function (key) {
    var product = GetProduct(key);
    console.log(key);
    console.log(product);
    product.quantity = cartItems[key].quantity;
    productsInCart.push(product);
    checkOutItems.push({
      sku: key,
      quantity: cartItems[key].quantity,
    });
  });

  return (
    <div>
      <CartContext.Consumer>
        {(context) => {
          console.log(context);
        }}
      </CartContext.Consumer>
      {productsInCart.map((product) => {
        return (
          <div key={product.node.id}>
            <div>Name: {product.node.product.name}</div>
            <div>Price: {product.node.price}</div>
            <div>
              Category: {product.node.product.metadata.Category}
            </div>
            <div>Quantity: {product.quantity}</div>
            <img src={product.node.imgage} alt="Product Image" />
          </div>
        );
      })}
      <Checkout items={checkOutItems} />
    </div>
  );
};

export default Cart;
