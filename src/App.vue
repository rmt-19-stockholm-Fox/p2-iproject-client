<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link>
      <router-link v-if="$store.getters.isLoggedIn" :to="{ path: `/profile/${$store.state.user.id}`}">
        Profile
      </router-link>
      <router-link v-if="!$store.getters.isLoggedIn" to="/login">
        Login
      </router-link>
      <router-link v-if="$store.getters.isLoggedIn" to="/logout">
        Logout
      </router-link>
    </div>
    <router-view/>
    <ImagePreview></ImagePreview>
  </div>
</template>

<script>
import storage from './helpers/storage';
import ImagePreview from './components/ImagePreview.vue';

export default {
  name: 'App',
  components: { ImagePreview },
  watch: {
    '$store.state.user'(value) {
      if (value && !value.pictureUrl) {
        this.$store.dispatch('fetchDefaultProfilePicture');
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('fetchAvatarUrl');
    const accessToken = storage.accessToken.value();

    if (accessToken) {
      this.$store.dispatch('fetchUser', accessToken);
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    margin-left: 5px;
    margin-right: 5px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

hr {
  background-color: #ccc;
}
</style>
