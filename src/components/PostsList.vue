<template>
  <div class="d-flex flex-column align-items-center">
    <Post v-for="post in posts" :key="post.id"
      :post="post"
    ></Post>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Post from './Post.vue';

export default {
  name: 'PostsList',
  components: { Post },
  computed: {
    ...mapState(['posts'])
  },
  created() {
    this.$store.dispatch('fetchPosts');
  }
}
</script>
