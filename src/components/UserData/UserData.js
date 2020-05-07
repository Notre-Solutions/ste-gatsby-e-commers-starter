import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

/**
 * @class
 */

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
        country: '',
        county: '',
      },
      name: {
        first: '',
        last: '',
      },
      sex: '',
      prevOrders: ['empty'],
      bag: ['empty'],
      fav: ['empty'],
      text: '',
      loading: false,
      userCreated: false,
      fbId: '',
      fbData: {},
    };
    this.addToBag = this.addToBag.bind(this);
    this.deleteFromBag = this.deleteFromBag.bind(this);
  }

  setStateUserValsToDeafult() {
    this.setState({
      address: {},
      name: {},
      sex: '',
      prevOrders: [],
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
    var authUser = JSON.parse(localStorage.getItem('authUser'));
    console.log(authUser);
    if (authUser) {
      this.setState({ loading: true });
      this.props.firebase
        .userData()
        .orderByChild('userId')
        .equalTo(authUser.uid)
        .on('child_added', (snapshot) => {
          var fbData = snapshot.val();
          console.log(fbData);
          console.log(authUser.uid);
          this.setState({ fbData });
          if (fbData) {
            const {
              address,
              name,
              sex,
              prevOrders,
              bag,
              fav,
            } = fbData;
            this.setState({
              address,
              name,
              sex,
              prevOrders,
              bag,
              fav,
              loading: false,
              userCreated: true,
              fbId: snapshot.key,
            });
          } else {
            this.setState({ laoding: false });
            console.log('hi');
          }
        });
    }
  };

  componentWillUnmount() {
    this.props.firebase.userData().off();
  }

  onCreateUserData = (authUser) => {
    this.props.firebase.userData().push({
      address: this.state.address,
      name: this.state.name,
      sex: this.state.sex,
      prevOrders: this.state.prevOrders,
      bag: this.state.bag,
      fav: this.state.fav,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  getCurrentUserData() {
    const { address, name, sex, prevOrders, bag, fav } = this.state;
    return { address, name, sex, prevOrders, bag, fav };
  }

  addOrUpdateUserData = (event, authUser) => {
    if (this.state.userCreated) {
      console.log('here');
      this.onEditUserData();
    } else {
      this.onCreateUserData(authUser);
    }
    event.preventDefault();
  };

  onEditUserData = () => {
    this.props.firebase
      .userData()
      .child(this.state.fbId)
      .update({
        address: this.state.address,
        name: this.state.name,
        sex: this.state.sex,
        prevOrders: this.state.prevOrders,
        bag: this.state.bag,
        fav: this.state.fav,
        editedAt: this.props.firebase.serverValue.TIMESTAMP,
      })
      .then(
        (success) => {
          console.log('success', success);
        },
        (error) => {
          console.log('error', error);
        },
      );
  };

  onRemoveUser = (uid) => {
    this.props.firebase.userData(uid).remove();
  };

  // onNextPage = () => {
  //   this.setState(
  //     (state) => ({ limit: state.limit + 5 }),
  //     this.onListenForMessages,
  //   );
  // };

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let address = this.state.address;
    let name = this.state.name;
    switch (nam) {
      case 'line1':
        address.line1 = val;
        this.setState({ address });
        break;
      case 'line2':
        address.line2 = val;
        this.setState({ address });
        break;
      case 'line3':
        address.line3 = val;
        this.setState({ address });
        break;
      case 'postcode':
        address.postcode = val;
        this.setState({ address });
      case 'country':
        address.country = val;
        this.setState({ address });
        break;
        break;
      case 'county':
        address.county = val;
        this.setState({ address });
        break;
      case 'second':
        name.second = val;
        this.setState({ name });
        break;
      case 'first':
        name.first = val;
        this.setState({ name });
        break;
      default:
        this.setState({ [nam]: val });
    }
    if (nam == 'line1') {
      let address = this.state.address;
      address.line1 = val;
      this.setState({ address });
    }
    if (nam == 'line1') {
      let address = this.state.address;
      address.line1 = val;
      this.setState({ address });
    }
  };

  currentUserData() {
    var currentUser = this.getCurrentUserData();
    if (this.state.userCreated) {
      return (
        <>
          <h1>User Detials</h1>
          <h2>Name</h2>
          <div>First Name: {currentUser.name.first}</div>
          <div>Second Name: {currentUser.name.second}</div>
          <h2>Address</h2>
          <div>Address line one: {currentUser.address.line1}</div>
          <div>Address line two: {currentUser.address.line2}</div>
          <div>Address line three: {currentUser.address.line3}</div>
          <div>Postcode: {currentUser.address.postcode}</div>
          <div>County: {currentUser.address.county}</div>
          <div>Cuntry: {currentUser.address.country}</div>

          <h1>Bag</h1>
          <ul>
            {this.state.bag.map((item) => {
              return <li>{item}</li>;
            })}
          </ul>
          <h1>Fav</h1>
          <h1>Prev Orders</h1>
        </>
      );
    } else {
      return (
        <>
          <h1>User Detials</h1>
          <h3>No data given</h3>
        </>
      );
    }
  }

  addToBag() {
    var array = this.state.bag;
    if (array[0] === 'empty') {
      array = ['Added Item'];
    } else {
      array.push('Added Item');
    }
    this.setState({ bag: array });
    if (this.state.userCreated) {
      this.onEditUserData();
    }
  }

  deleteFromBag() {
    var array = this.state.bag;
    if (array.length > 0) {
      array.pop();
      console.log(array);
    }
    this.setState({ bag: array });
    if (this.state.userCreated) {
      this.onEditUserData();
    }
  }

  render() {
    const {
      address,
      name,
      sex,
      prevOrders,
      bag,
      fav,
      loading,
    } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}

            {this.currentUserData()}

            {!this.state.userCreated && (
              <div>You currently have no user Data</div>
            )}
            <h1>Update User Detials</h1>
            <form
              onSubmit={(event) =>
                this.addOrUpdateUserData(event, authUser)
              }
            >
              Address
              <label>
                Address line one:
                <input
                  type="text"
                  value={address.line1}
                  name="line1"
                  onChange={this.myChangeHandler}
                />
              </label>
              <label>
                Address line two:
                <input
                  type="text"
                  name="line2"
                  value={address.line2}
                  onChange={this.myChangeHandler}
                />
              </label>
              <label>
                Address line three:
                <input
                  type="text"
                  name="line3"
                  value={address.line3}
                  onChange={this.myChangeHandler}
                />
              </label>
              <label>
                County:
                <input
                  type="text"
                  name="county"
                  value={address.county}
                  onChange={this.myChangeHandler}
                />
              </label>
              <label>
                Contry:
                <input
                  type="text"
                  name="country"
                  value={address.country}
                  onChange={this.myChangeHandler}
                />
              </label>
              <label>
                PostCode:
                <input
                  type="text"
                  name="postcode"
                  value={this.state.address.postcode}
                  onChange={this.myChangeHandler}
                />
              </label>
              <label>
                First Name:
                <input
                  type="text"
                  name="first"
                  value={this.state.name.first}
                  onChange={this.myChangeHandler}
                />
              </label>
              <label>
                Second Name:
                <input
                  type="text"
                  name="second"
                  value={this.state.name.second}
                  onChange={this.myChangeHandler}
                />
              </label>
              <button type="submit">Update</button>
            </form>
            <div>
              <button onClick={this.addToBag}>Add To Bag</button>
              <button onClick={this.deleteFromBag}>
                Deletd from Bag
              </button>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(UserData);
