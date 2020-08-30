import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSEAGING_SENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
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
