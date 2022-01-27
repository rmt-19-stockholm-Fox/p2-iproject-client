<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col col-auto d-flex flex-column">
        <Post v-for="post in postColumns[0]" :key="post.id"
          :post="post"
        ></Post>
      </div>
      <div class="col col-auto d-flex flex-column">
        <Post v-for="post in postColumns[1]" :key="post.id"
          :post="post"
        ></Post>
      </div>
      <div class="col col-auto d-flex flex-column">
        <Post v-for="post in postColumns[2]" :key="post.id"
          :post="post"
        ></Post>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Post from './Post.vue';

export default {
  name: 'PostsList',
  components: { Post },
  props: ['params'],
  computed: {
    ...mapState(['posts']),
    postColumns() {
      return [
        this.posts.filter((v, i) => (i % 3) === 0),
        this.posts.filter((v, i) => (i % 3) === 1),
        this.posts.filter((v, i) => (i % 3) === 2)
      ];
    }
  },
  created() {
    this.$store.dispatch('fetchPosts', this.params);
  }
}
</script>
