<template>
  <div id="nav">
    <h1>今日もだるい</h1>
    <!-- <nuxt-link to="/">Home</nuxt-link> | -->
    <!-- <nuxt-link to="/darui">だるい人</nuxt-link> |
    <nuxt-link to="/hatarakitakunai">働きたくない人</nuxt-link> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 500px;
  margin: 0 auto;
  width: 95%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
