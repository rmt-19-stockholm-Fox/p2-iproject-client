<template>
  <div class="container">
    <div class="row">
      <div class="col mb-5">
        <PostsList></PostsList>
      </div>
    </div>
  </div>
</template>

<script>
import PostsList from '../components//PostsList.vue';

export default {
  name: 'Home',
  components: { PostsList }
}
</script>

<style scoped>
#profile-picture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
