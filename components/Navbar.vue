<template>
  <div id="nav">
    <h1>今日もだるい</h1>
    <!-- <nuxt-link to="/">Home</nuxt-link> | -->
    <!-- <nuxt-link to="/darui">だるい人</nuxt-link> |
    <nuxt-link to="/hatarakitakunai">働きたくない人</nuxt-link> -->
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Noto Serif JP', serif;
  font-weight: 900;
}
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
