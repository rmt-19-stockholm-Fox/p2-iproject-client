<template>
  <div>
    <h1>Logging Out...</h1>
  </div>
</template>

<script>
import storage from '../helpers/storage';

export default {
  name: 'Logout',
  created() {
    this.$gAuth.signOut();
    storage.accessToken.clear();
    this.$store.commit('LOG_OUT');
    this.$router.push('/');
    
  }
}
</script>
