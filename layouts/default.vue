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
    <v-content fluid>
      <navbar />
      <v-container fluid>
      <nuxt />
      </v-container>
    </v-content>
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
