<template>
  <v-app>
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
  }
}
</script>
