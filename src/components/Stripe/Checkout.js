import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = ({ items }) => {
  const buttonStyles = {
    fontSize: '13px',
    color: '#fff',
    outline: 'none',
    padding: '12px 60px',
    boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
    backgroundColor: 'rgb(255, 178, 56)',
    borderRadius: '6px',
    letterSpacing: '1.5px',
  };
  const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY);
  const redirectToCheckout = async (event) => {
    event.preventDefault();
    const stripeCheckout = await stripePromise;
    const { error } = await stripeCheckout.redirectToCheckout({
      shippingAddressCollection: {
        allowedCountries: ['GB', 'US', 'IE'],
      },
      items: items,
      successUrl: `http://localhost:8001/success/`,
      cancelUrl: `http://localhost:8001/failed/`,
    });
    if (error) {
      console.warn('Error:', error);
    }
  };
  return (
    <div>
      <button style={buttonStyles} onClick={redirectToCheckout}>
        Go To CheckOut
      </button>
    </div>
  );
};
export default Checkout;
