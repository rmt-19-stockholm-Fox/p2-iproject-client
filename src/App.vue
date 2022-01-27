<template>
  <div id="app">
    <div id="nav" class="container">
      <div class="row">
        <div class="col">
          <div class="navbar-left">
            <h3 @click="$router.push('/')">InstaFood</h3>
            <router-link to="/">
              Home
            </router-link>
            <router-link v-if="$store.getters.isLoggedIn" :to="{ path: `/profile/${$store.state.user.id}`}">
              Profile
            </router-link>
          </div>
        </div>
        <div class="col">
          <div class="navbar-right">
            <a v-if="!$store.getters.isLoggedIn" @click="loginGoogle">Sign In</a>
            <router-link v-if="$store.getters.isLoggedIn" to="/logout">
              Sign Out
            </router-link>
          </div>
        </div>
      </div>
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
  methods: {
    async loginGoogle() {
      const googleUser = await this.$gAuth.signIn();
      this.$store.dispatch('loginGoogle', googleUser.getAuthResponse().id_token);
      this.$router.push('/');
      this.initSignIn();
    },
    initSignIn() {
      this.$store.dispatch('fetchAvatarUrl');
      const accessToken = storage.accessToken.value();

      if (accessToken) {
        this.$store.dispatch('fetchUser', accessToken);
      }
    }
  },
  beforeCreate() {
    if (window.location.hostname == 'localhost') {
      storage.apiHost.set('http://localhost:3000');
    } else {
      storage.apiHost.set('https://instafood-danielrylv.herokuapp.com');
    }
  },
  created() {
    this.initSignIn();
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
  padding: 30px 30px 10px 30px;
  margin-bottom: 45px;
  border-bottom: 1px solid #ddd;

  h3 {
    margin-left: 20px;
    margin-right: 45px;
    cursor: pointer;
  }

  .navbar-left {
    display: flex;
    align-items: center;
  }

  .navbar-right {
    display: flex;
    justify-content: end;
  }

  a {
    margin-left: 5px;
    margin-right: 5px;
    font-weight: bold;
    color: #2c3e50;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &.router-link-exact-active {
      color: green;
    }
  }
}

hr {
  background-color: #ccc;
}
</style>
