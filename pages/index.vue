<template>
<div class="container">
  <div class="btn-wrapper">
    <button v-on:click="addDarui" class="btn-1">だるい</button>
    <button v-on:click="addTsurai" class="btn-1">つらい</button>
    <button v-on:click="addHatarakitakunai" class="btn-1">働きたくない</button>
  </div>
  <div class="kokuban">
    <h3>{{ today }}</h3>
    <h3>だるい: {{ daruiCount }}人 つらい: {{ tsuraiCount }}人</h3>
    <h3>働きたくない: {{ hatarakitakunaiCount }}人</h3>
  </div>
  <v-form ref="new_form" class="ans_form">
    <v-text-field
      v-model="text1"
      counter
      label="吐き出しましょう。"
      :rules="[required, limit_length]"
    >
    </v-text-field>
    <button v-on:click="submit" class="send-btn"><v-icon>mdi-send</v-icon></button>
  </v-form>
  <div>
    <v-list color="#f1eddd" class="postlist">
        <template v-for="(post, index) in posts">
          <v-list-item :key="post.content">
              <v-list-item-content >
                <v-list-item-subtitle class="li-content">
                  {{ post.content }}
                </v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>
          <v-divider
            :key="index"
          ></v-divider>
        </template>
    </v-list>
  </div>

</div>
</template>

<script>
import 'moment/locale/ja'
import moment from 'moment-timezone'
import { mapActions, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  data () {
    return {
      today: moment().format('ll'),
      daruiCount: 0,
      tsuraiCount: 0,
      hatarakitakunaiCount: 0
    }
  },
  methods: {
    ...mapActions([
      'user/signInAnonymously',
      'user/checkIsSubmit',
      'posts/fetchPosts'
    ]),
    submit () {
      if (this.$refs.new_form.validate()) {
        // const batch = firebase.firestore().batch()
        const data = {
          content: this.text1,
          uid: this.user.uid,
          created_at: new Date(),
          daruiCount: 0,
          hatarakitakunaiCount: 0,
          tsuraiCount: 0
        }
        firebase.firestore()
          .collection('posts')
          .add(data)
          .then(() => {
            this.$refs.new_form.reset()
          })
      }
    },
    addDarui () {
      if (!this.isDarui) {
        const batch = firebase.firestore().batch()
        const createdAt = new Date()
        const createdAt2 = moment().tz('Asia/Tokyo').format('l').split('/')
        const year = createdAt2[0]
        const month = createdAt2[1]
        const date = createdAt2[2]
        const docId = String(year) + '-' + String(month) + '-' + String(date)
        const postRef = firebase.firestore().collection('count').doc(docId)
        const data = {
          uid: this.user.uid,
          created_at: createdAt
        }
        firebase.firestore()
          .collection('count')
          .doc(docId)
          .collection('darui')
          .add(data)
          .then(() => {
            batch.set(postRef, { daruiCount: firebase.firestore.FieldValue.increment(1) }, { merge: true })
            batch.commit()
            this.$store.commit('user/setDarui', true)
            this.daruiCount = this.daruiCount + 1
          })
      } else {
        console.log('もうむり')
      }
    },
    addTsurai () {
      if (!this.isTsurai) {
        const batch = firebase.firestore().batch()
        const createdAt = new Date()
        const createdAt2 = moment().tz('Asia/Tokyo').format('l').split('/')
        const year = createdAt2[0]
        const month = createdAt2[1]
        const date = createdAt2[2]
        const docId = String(year) + '-' + String(month) + '-' + String(date)
        const postRef = firebase.firestore().collection('count').doc(docId)
        const data = {
          uid: this.user.uid,
          created_at: createdAt
        }
        firebase.firestore()
          .collection('count')
          .doc(docId)
          .collection('tsurai')
          .add(data)
          .then(() => {
            batch.set(postRef, { tsuraiCount: firebase.firestore.FieldValue.increment(1) }, { merge: true })
            batch.commit()
            this.$store.commit('user/setTsurai', true)
            this.tsuraiCount = this.tsuraiCount + 1
          })
      } else {
        console.log('mもうむり')
      }
    },
    addHatarakitakunai () {
      if (!this.isHatarakitakunai) {
        const batch = firebase.firestore().batch()
        const createdAt = new Date()
        const createdAt2 = moment().tz('Asia/Tokyo').format('l').split('/')
        const year = createdAt2[0]
        const month = createdAt2[1]
        const date = createdAt2[2]
        const docId = String(year) + '-' + String(month) + '-' + String(date)
        const postRef = firebase.firestore().collection('count').doc(docId)
        const data = {
          uid: this.user.uid,
          created_at: createdAt
        }
        firebase.firestore()
          .collection('count')
          .doc(docId)
          .collection('hatarakitakunai')
          .add(data)
          .then(() => {
            batch.set(postRef, { hatarakitakunaiCount: firebase.firestore.FieldValue.increment(1) }, { merge: true })
            batch.commit()
            this.$store.commit('user/setHatarakitakunai', true)
            this.hatarakitakunaiCount = this.hatarakitakunaiCount + 1
          })
      } else {
        console.log('むりむり')
      }
    }
  },
  beforeCreate () {
  },
  created () {
    this['user/signInAnonymously']()
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      isTsurai: 'user/isTsurai',
      isDarui: 'user/isDarui',
      isHatarakitakunai: 'user/isHatarakitakunai',
      posts: 'posts/posts'
    })
  },
  asyncData () {
    const createdAt = moment().tz('Asia/Tokyo').format('l').split('/')
    const year = createdAt[0]
    const month = createdAt[1]
    const date = createdAt[2]
    const docId = String(year) + '-' + String(month) + '-' + String(date)
    console.log(docId)
    let daruiCount = 0
    let hatarakitakunaiCount = 0
    let tsuraiCount = 0
    return firebase.firestore().collection('count').doc(docId).get()
      .then((doc) => {
        if (doc.exists) {
          daruiCount = doc.data().daruiCount ? doc.data().daruiCount : 0
          hatarakitakunaiCount = doc.data().hatarakitakunaiCount ? doc.data().hatarakitakunaiCount : 0
          tsuraiCount = doc.data().tsuraiCount ? doc.data().tsuraiCount : 0
        }
        console.log(doc.data())
        return { daruiCount, hatarakitakunaiCount, tsuraiCount }
      })
  }
}
</script>

<style lang="scss">
.container {
  margin: 0;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.postlist {
  background-color: transparent;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.ans_form {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  margin-left: 1rem;
}
.send-btn {
  margin: 10px;
}

.li-content {
  text-align: left !important;
  word-break: break-all !important;
  white-space: normal !important;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}

.btn-1 {
  margin: 5px;
}

.count-info {
  max-width: 300px;
  margin: 10px;
}

h3 {
  text-align: left;
}

.btn-1 {
  border-bottom: 5px solid #9f000c;
  border-radius: 100vh;
  top: calc(50% - .5em);
  right: 1rem;
  color: #fff;
  background-color: rgba(255, 0, 0, 0.973);
  padding: 10px;
  font-weight: bold;
  &:hover {
    margin-top: 3px;
    border-bottom: 2px solid #9f000c;
  }
}

.kokuban {
    font-family: HuiFontP109;
    color: #fff;
    background-color: #114400;
    margin: 10px 0 10px 0;
    padding: 15px;
    border: 9px solid#c0c0c0;
    border-radius: 3px;
    box-shadow: 2px 2px 4px #666, 2px 2px 2px #111 inset;
    text-shadow: 0px 0px 2px #000;
    line-height: 1.9;
}
.point {
    color: #ffb1b3;
    font-weight: bold;
    border: 3px solid #ffb1b3;
}

.container {
  max-width: 500px;
  margin: auto;
}
</style>
