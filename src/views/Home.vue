<template>
  <div class="container">
    <div class="row mb-5">
      <div class="col d-flex justify-content-end">
        <img id="profile-picture" :src="userPicture">
      </div>
      <div class="col d-flex flex-column justify-content-center align-items-start">
        <h4>{{ userName }}</h4>
        <h5>{{ userEmail }}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-6 mx-auto">
        <PostForm></PostForm>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <PostsList></PostsList>
      </div>
    </div>
  </div>
</template>

<script>
import PostsList from '../components//PostsList.vue';
import PostForm from '../components/PostForm.vue';

export default {
  name: 'Home',
  components: { PostsList, PostForm },
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
