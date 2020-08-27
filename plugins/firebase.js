import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyC5l6IxfejIvBUdiYvxJarH6fW8WxJBl6g',
  authDomain: 'darui-tsurai.firebaseapp.com',
  databaseURL: 'https://darui-tsurai.firebaseio.com',
  projectId: 'darui-tsurai',
  storageBucket: 'darui-tsurai.appspot.com',
  messagingSenderId: '882742868111',
  appId: '1:882742868111:web:dd9c865d030a83cbf398fa',
  measurementId: 'G-PSWVGSJ5BY'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export default firebase

// export default {
//   init () {
//     firebase.initializeApp(firebaseConfig)
//     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//   },
//   logout () {
//     firebase.auth().signOut()
//   },
//   // onAuth () {
//   //   firebase.auth().onAuthStateChanged((user) => {
//   //     user = user ? user : {}
//   //     store.commit('setUser', user)
//   //     store.commit('setLogin', user.uid ? true : false)
//   //   })
//   // },
//   login () {
//     // const provider = new firebase.auth.TwitterAuthProvider();
//     // firebase.auth().signInWithPopup(provider);
//     store.commit('setUser', firebase.auth().currentUser)
//     store.commit('setLogin', true)
//   }
// }
