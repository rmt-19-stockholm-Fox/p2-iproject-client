<template>
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container-fluid">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link active" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active" to="/login">Login</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="" v-on:click.prevent='logoutClick'>Logout</a>
      </li>
      <li class="nav-item">
        <router-link class="nav-link active" to="/travelplace">TravelPlace</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logoutClick () {
      localStorage.clear()
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style>

</style>
