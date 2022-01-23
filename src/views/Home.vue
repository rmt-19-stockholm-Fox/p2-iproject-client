<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex justify-content-end">
        <img id="profile-picture" :src="userPicture">
      </div>
      <div class="col d-flex flex-column justify-content-center align-items-start">
        <h4>{{ userName }}</h4>
        <h5>{{ userEmail }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userPicture: ''
    }
  },
  watch: {
    '$store.state.user'(value) {
      if (value != null && value.pictureUrl) {
        this.userPicture = value.pictureUrl;
      }
    }
  },
  computed: {
    userEmail() {
      return this.$store.state.user 
        ? this.$store.state.user.email 
        : 'not logged in';
    },
    userName() {
      return this.$store.state.user
        ? this.$store.state.user.name ? this.$store.state.user.name : 'No Name'
        : 'No Name'
    }
  }
}
</script>

<style scoped>
#profile-picture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
