<template>
  <div class="card">
    <div style="width: 300px;">
      <img :src="imageUrl" style="max-width: 300px;">
    </div>
    <div style="padding: 15px 15px 12px;">
      <div>{{ post.content }}</div>
      <div class="date">{{ new Date(post.createdAt).toLocaleString() }}</div>
    </div>
  </div>
</template>

<script>
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

export default {
  name: 'Post',
  props: ['post'],
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    async fetchImages(postId) {
      try {
        const result = await listAll(ref(getStorage(), `posts/${postId}`));
        
        if (result.items.length > 0) {
          this.imageUrl = await getDownloadURL(result.items[0]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.fetchImages(this.post.id);
  }
}
</script>

<style scoped lang="scss">
.card {
  text-align: left;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 7px 25px -3px;
  margin-bottom: 35px;

  .date {
    margin-top: 7px;
    font-size: 0.85rem;
    color: #777;
  }
}
</style>
