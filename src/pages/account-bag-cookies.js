import React, { Fragment, Component } from 'react';
import cookie from 'react-cookies';
import Layout from '../components/layout';

class BagPage extends Component {
  constructor() {
    super();

    this.onAddName = this.onAddName.bind(this);
    this.onRemoveName = this.onRemoveName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  componentWillMount() {
    this.state = { name: cookie.load('name') || 'Nyasha' };
  }

  onAddName(name) {
    this.setState({ name });
    cookie.save('name', name, { path: '/' });
  }

  onChangeName() {
    if (this.state.name === 'Nyasha') {
      this.setState({ name: 'Ste' });
      cookie.save('name', 'Ste', { path: '/' });
    } else {
      this.setState({ name: 'Nyasha' });
      cookie.save('name', 'Nyasha', { path: '/' });
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
          <div>{name && <h1>Hello {name}!</h1>}</div>
        </Fragment>
      </Layout>
    );
  }
}

export default BagPage;
