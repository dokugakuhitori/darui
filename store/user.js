import firebase from 'firebase'
import moment from 'moment'

export const state = () => ({
  user: { uid: '' },
  isLogin: false,
  isDarui: false,
  isTsurai: false,
  isHatarakitakunai: false
})

export const mutations = {
  setUser (state, user) {
    state.user.uid = user.user.uid
  },
  setLogin (state, isLogin) {
    state.isLogin = isLogin
  },
  setDarui (state, isDarui) {
    state.isDarui = isDarui
  },
  setTsurai (state, isTsurai) {
    state.isTsurai = isTsurai
  },
  setHatarakitakunai (state, isHatarakitakunai) {
    state.isHatarakitakunai = isHatarakitakunai
  }
}

export const getters = {
  user (state) {
    return state.user
  },
  isLogin (state) {
    return state.isLogin
  },
  isDarui (state) {
    return state.isDarui
  },
  isTsurai (state) {
    return state.isTsurai
  },
  isHatarakitakunai (state) {
    return state.isHatarakitakunai
  }
}

export const actions = {
  signInAnonymously (context) {
    firebase.auth().signInAnonymously()
      .then((user) => {
        context.commit('setUser', user)
        context.commit('setLogin', true)
        context.dispatch('checkIsSubmit')
        context.dispatch('posts/fetchPosts', null, { root: true })
      })
      .catch(() => {
        context.commit('setLogin', false)
      })
  },
  checkIsSubmit (context) {
    const createdAt = new Date()
    const year = moment(createdAt).get('year')
    const month = moment(createdAt).get('month')
    const date = moment(createdAt).get('date')
    const docId = String(year) + '-' + String(month + 1) + '-' + String(date)
    firebase.firestore().collection('count').doc(docId).collection('darui')
      .where('uid', '==', context.state.user.uid)
      .limit(1)
      .get()
      .then((querySnapShot) => {
        if (querySnapShot.docs.length !== 0) {
          context.commit('setDarui', true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    firebase.firestore().collection('count').doc(docId).collection('tsurai')
      .where('uid', '==', context.state.user.uid)
      .limit(1)
      .get()
      .then((querySnapShot) => {
        if (querySnapShot.docs.length !== 0) {
          context.commit('setTsurai', true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    firebase.firestore().collection('count').doc(docId).collection('hatarakitakunai')
      .where('uid', '==', context.state.user.uid)
      .limit(1)
      .get()
      .then((querySnapShot) => {
        if (querySnapShot.docs.length !== 0) {
          context.commit('setHatarakitakunai', true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
