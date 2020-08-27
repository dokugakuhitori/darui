import firebase from 'firebase'

export const state = () => ({
  posts: []
})

export const mutations = {
  setPosts (state, posts) {
    state.posts = posts
  }
}

export const getters = {
  posts (state) {
    return state.posts
  }
}

export const actions = {
  fetchPosts (context) {
    firebase.firestore().collection('posts')
      .orderBy('created_at', 'desc').limit(50).get()
      .then((querySnapShot) => {
        const posts = []
        querySnapShot.forEach((doc) => {
          const data = {
            content: doc.data().content,
            created_at: doc.data().created_at.toDate(),
            uid: doc.data().uid
          }
          posts.push(data)
        })
        context.commit('setPosts', posts)
      })
      .catch(() => {
      })
  }
}
