import React, { Fragment, Component } from 'react';
import cookie from 'react-cookies';
import Layout from '../components/layout';

class BagPage extends Component {
  constructor() {
    super();

    this.state = {
      name: {},
    };

    this.onAddName = this.onAddName.bind(this);
    this.onRemoveName = this.onRemoveName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  componentWillMount() {
    this.setState({ name: cookie.load('name') });
  }

  onAddName(name) {
    this.setState({ name });
    cookie.save('name', name, { path: '/' });
  }

  onChangeName() {
    if (this.state.name.id === 'Ste') {
      var item = {
        id: 'Nyasha',
        qty: 2,
      };
      this.setState({ name: item });
      cookie.save('name', item, { path: '/' });
    } else {
      var item = {
        id: 'Ste',
        qty: 1,
      };
      this.setState({ name: item });
      cookie.save('name', item, { path: '/' });
    }
  }

  onRemoveName() {
    cookie.remove('name', { path: '/' });
  }

  render() {
    const { name } = this.state;
    return (
      <Layout>
        <Fragment>
          <h1>BAG</h1>
          <p>This is your shopping bag</p>
          <button onClick={this.onChangeName}>Change Name</button>
          <div>
            {name && (
              <h1>
                Hello {name.id}! Number {name.qty}
              </h1>
            )}
          </div>
        </Fragment>
      </Layout>
    );
  }
}

export default BagPage;
