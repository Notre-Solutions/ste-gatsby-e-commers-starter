// const config = {
//   apiKey: process.env.GATSBY_API_KEY,
//   authDomain: process.env.GATSBY_AUTH_DOMAIN,
//   databaseURL: process.env.GATSBY_DATABASE_URL,
//   projectId: process.env.GATSBY_PROJECT_ID,
//   storageBucket: process.env.GATSBY_STORAGE_BUCKET,
//   messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
// };

const config = {
  apiKey: 'AIzaSyCp4w_7KsURZ2rwiZj8J1PrtKzxpC8GBoo',
  authDomain: 'test-auth-22897.firebaseapp.com',
  databaseURL: 'https://test-auth-22897.firebaseio.com',
  projectId: 'test-auth-22897',
  storageBucket: 'test-auth-22897.appspot.com',
  messagingSenderId: '109491845503',
  appId: '1:109491845503:web:c9cba07772a38ed80b824a',
  measurementId: 'G-SD6TF7M692',
};

class Firebase {
  constructor(app) {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) =>
    this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: 'http://localhost:3000',
    });

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then((snapshot) => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {
                ADMIN: 'ADMIN',
              };
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = (uid) => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

  // *** Message API ***

  userData = (uid) => this.db.ref(`userData/${uid}`);

  userData = (uid, child) => {
    switch (child) {
      case 'address':
        return this.db.ref(`userData/${uid}/address`);
      case 'name':
        return this.db.ref(`userData/${uid}/name`);
      case 'sex':
        return this.db.ref(`userData/${uid}/sex`);
      case 'prevOders':
        return this.db.ref(`userData/${uid}/prevOders`);
      case 'bag':
        return this.db.ref(`userData/${uid}/bag`);
      case 'fav':
        return this.db.ref(`userData/${uid}/fav`);
      case 'text':
        return this.db.ref(`userData/${uid}/text`);
    }
  };
  userData = () => this.db.ref('userData');
}

let firebase;

function getFirebase(app, auth, database) {
  if (!firebase) {
    firebase = new Firebase(app, auth, database);
  }

  return firebase;
}

export default getFirebase;
