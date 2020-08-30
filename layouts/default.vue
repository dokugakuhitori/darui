<template>
  <v-app>
    <v-snackbar
      top
      v-model='snackbarVisible'
      color='error'
      timeout='2000'
    >
      {{ this.$store.getters['snackbar/message'] }}
    </v-snackbar>
    <v-main class="ma-2" fluid>
      <navbar />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  computed: {
    snackbarVisible: {
      get () {
        return this.$store.state.snackbar.isEnable
      },
      set () {
        return this.$store.dispatch('snackbar/snackOff')
      }
    }
  }
}

</script>
