<template>
  <div id="nav">
    <div class="w-screen h-24 bg-blue-600">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/location/add">Add Location</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/favourite">My Favourite</router-link> |
      <button 
      @click="logoutHandler">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Swal from 'sweetalert2'

export default {
  name: "Navbar",
  methods: {
    ...mapMutations(["SET_ISLOGGED"]),
    logoutHandler() {
      localStorage.clear();
      this.SET_ISLOGGED(false)
      this.$router.push("/");
      Swal.fire({
          icon: 'success',
          title: 'Yeayy..',
          text: 'Logout Success'
        })
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>