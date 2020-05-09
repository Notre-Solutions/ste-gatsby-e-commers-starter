import React from 'react';
import CartProvider from './src/components/cart/cartProvider';

export const wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>;
};
