import React, { Component } from 'react';
import Layout from '../components/layout';
import { CartContext } from '../components/cart';
import { AuthUserContext } from '../components/Session';

class BagPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <AuthUserContext.Consumer>
          {(authUser) => (
            <CartContext.Consumer>
              {(context) => (
                <React.Fragment>
                  <h1>{context.cartTotal}</h1>
                  <h1>BAG</h1>
                  <p>This is your shopping bag</p>

                  <button
                    onClick={(e) =>
                      context.addToCart(
                        1,
                        { price: 1, id: 1 },
                        authUser,
                      )
                    }
                  >
                    Add Item to Cart
                  </button>
                </React.Fragment>
              )}
            </CartContext.Consumer>
          )}
        </AuthUserContext.Consumer>

        {/* <Cart></Cart> */}
      </Layout>
    );
  }
}

export default BagPage;
