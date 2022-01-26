<template>
  <div class="card">
    <div class="d-flex justify-content-center align-items-center" style="width: 300px;">
      <button @click="confirmDeletePost" title="delete" class="delete-button btn btn-danger">
        X
      </button>
      <img :src="primaryImage" style="max-width: 300px;">
    </div>
    <div style="padding: 15px 15px 12px;">
      <div>{{ post.content }}</div>
      <div class="date">{{ new Date(post.createdAt).toLocaleString() }}</div>
    </div>
  </div>
</template>

<script>
import { getStorage, listAll, ref, deleteObject } from "firebase/storage";
import Alert from '../helpers/alert';

export default {
  name: 'Post',
  props: ['post'],
  computed: {
    primaryImage() {
      return this.post.imageUrls 
        ? this.post.imageUrls.split(';')[0]
        : '';
    }
  },
  methods: {
    async confirmDeletePost() {
      try {
        const result = await Alert.confirm({
          title: 'Deleting post...',
          text: 'Are you sure?'
        });

        if (result.isConfirmed) {
          this.deletePost();
        }
      } catch(err) {
        console.log(err);
      }
    },
    async deletePost() {
      try {
        await this.$store.dispatch('deletePost', this.post.id);
        this.$store.dispatch('fetchPosts');
        this.deletePostImages();
      } catch(err) {
        console.log(err);
      }
    },
    async deletePostImages() {
      try {
        console.log('deleting post images', this.post.id);
  
        const result = await listAll(ref(getStorage(), `posts/${this.post.id}`));
        const p = result.items.map(itemRef => deleteObject(itemRef));
        
        await Promise.all(p);
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  text-align: left;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 7px 25px -3px;
  margin-bottom: 35px;
  transition: transform 0.4s ease-out;

  .date {
    margin-top: 7px;
    font-size: 0.85rem;
    color: #777;
  }

  .delete-button {
    position: absolute;
    top: 3px;
    right: 3px;
    display: none;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 3px 9px;
    opacity: 0.85;
  }

  &:hover {
    transform: scale(1.05);

    .delete-button {
      display: inline;
    }
  }
}
</style>
