import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

class UserData extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {
      address: {
        line1: '',
        line2: '',
        line3: '',
        postcode: '',
        county: '',
        contry: '',
      },
      name: {
        first: '',
        last: '',
      },
      sex: '',
      prevOders: [],
      bag: [],
      fav: [],
      text: '',
      loading: false,
      userData: {},
    };
    this.state.address = {};
    this.state.address.line1 = '';
  }

  setStateUserValsToDeafult() {
    this.setState({
      address: {
        line1: '',
        line2: '',
        line3: '',
        postcode: '',
        county: '',
        contry: '',
      },
      name: {
        first: '',
        last: '',
      },
      sex: '',
      prevOders: [],
      bag: [],
      fav: [],
    });
  }

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.onListenForUserData();
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  onListenForUserData = () => {
    this.setState({ loading: true });

    this.props.firebase
      .userData()
      .orderByChild('createdAt')
      .on('value', (snapshot) => {
        const userObject = snapshot.val();

        if (userObject) {
          const userData = Object.keys(userObject).map((key) => ({
            ...userObject[key],
            uid: key,
          }));

          this.setState({
            userData: userData,
            loading: false,
          });
        } else {
          this.setStateUserValsToDeafult();
          this.setState({ loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.userData().off();
  }

  onCreateUserData = (event, authUser) => {
    this.props.firebase.userData().push({
      address: this.state.address,
      // name: this.state.name,
      // sex: this.state.sex,
      // prevOders: this.state.prevOders,
      // bag: this.state.bag,
      // fav: this.stath.fav,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setStateUserValsToDeafult();
    event.preventDefault();
  };

  addOrUpdateUserData = (event) => {
    this.state.userData.find();
  };

  onEditUserData = (userData) => {
    this.props.firebase.userData(userData.uid).set({
      address: this.state.address,
      // name: this.state.name,
      // sex: this.state.sex,
      // prevOders: this.state.prevOders,
      // bag: this.state.bag,
      // fav: this.stath.fav,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = (uid) => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { userData, loading } = this.state;
    const { address, name, sex, prevOders, bag, fav } = userData;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {!loading && userData && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {userData && (
              <>
                <h1>User Detials</h1>
                <h2>Address</h2>
                <div>
                  Address line one: {this.state.address.line1}
                </div>
                <div>
                  Address line two: {this.state.address.line2}
                </div>
                <div>
                  Address line three: {this.state.address.line3}
                </div>
                <div>Postcode: {this.state.address.postcode}</div>
                <div>County: {this.state.address.county}</div>
                <div>Cuntry: {this.state.address.contry}</div>
              </>
            )}

            {!userData && <div>You currently have no user Data</div>}
            <h1>Update User Detials</h1>
            <form
              onSubmit={(event) =>
                this.onCreateUserData(event, authUser)
              }
            >
              Address
              <label>
                Address line one:
                <input
                  type="text"
                  value={this.state.address.line1}
                  onChange={this.onChangeAddress}
                />
              </label>
              <label>
                Address line two:
                <input
                  type="text"
                  value={this.state.address.line2}
                  onChange={this.onChangeAddress2}
                />
              </label>
              <label>
                Address line three:
                <input
                  type="text"
                  value={this.state.address.line3}
                  onChange={this.onChangeAddress3}
                />
              </label>
              <label>
                County:
                <input
                  type="text"
                  value={this.state.address.county}
                  onChange={this.onChangeAddress4}
                />
              </label>
              <label>
                Contry
                <input
                  type="text"
                  value={this.state.address.contry}
                  onChange={this.onChangeAddress5}
                />
              </label>
              <label>
                PostCode:
                <input
                  type="text"
                  value={this.state.address.postcode}
                  onChange={this.onChangeAddress6}
                />
              </label>
              <button type="submit">Update</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(UserData);
