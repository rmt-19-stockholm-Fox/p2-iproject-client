<template>
  <div>
    <h1>Login</h1>
    <button @click="loginGoogle">
      Sign In with Google
    </button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    async loginGoogle() {
      const googleUser = await this.$gAuth.signIn();
      this.$store.dispatch('loginGoogle', googleUser.getAuthResponse().id_token);
      this.$router.push('/');
    }
  }
}
</script>
