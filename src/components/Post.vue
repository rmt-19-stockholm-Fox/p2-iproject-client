<template>
  <div class="card">
    <div class="d-flex justify-content-center align-items-center" style="width: 300px; position: relative; min-height: 70px;">
      <div class="images-control btn">
        <button title="previous" 
          :disabled="displayedImageNum <= 1"
          @click="() => setDisplayedImage(this.displayedImageNum - 1)">
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>
        <button title="next" 
          :disabled="displayedImageNum === imageUrls.length"
          @click="() => setDisplayedImage(this.displayedImageNum + 1)">
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>
      </div>
      <div class="post-header">
        <button v-if="isAllowedToModify" 
          @click="confirmDeletePost"  
          title="delete" class="delete-button btn btn-danger">
          X
        </button>
        <div>
          <span @click="$router.push(`/place/${post.placeId}`)">
            <font-awesome-icon :icon="['fas', 'map-marker-alt']" style="margin-right: 5px;"/>
            {{ post.placeName }}
          </span>
        </div>
      </div>
      <img v-if="displayedImage && isLoadingImage" src="../assets/images/loading.gif" style="max-width: 300px;" />
      <img :src="displayedImage" @load="isLoadingImage = false"
        :style="{ 'max-width': isLoadingImage ? '1px' : '300px', 'min-width': isLoadingImage ? '1px' : '300px' }"
      />
    </div>
    <div style="padding: 15px 15px 12px;">
      <div v-if="post.User"
        title="visit profile" class="user-name">
        <span @click="$router.push(`/profile/${post.User.id}`)">
          {{ post.User ? post.User.name : '' }}
        </span>
      </div>
      <div class="post-content">
        <span v-if="isPostContentLong && showingLess" class="short"
        >{{ shortenPostContent }}<span v-if="isPostContentLong"
            @click="showingLess = false"
            class="post-content-toggler"
          > .....more</span>
        </span>
        <span v-if="!isPostContentLong || !showingLess" class="long"
        >{{ post.content }}<span v-if="isPostContentLong"
            @click="showingLess = true"
            class="post-content-toggler"
          > .....less</span>
        </span>
      </div>
      <div class="date">{{ new Date(post.createdAt).toLocaleString() }}</div>
    </div>
  </div>
</template>

<script>
import Alert from '../helpers/alert';

export default {
  name: 'Post',
  props: ['post'],
  data() {
    return {
      displayedImageNum: 0,
      isLoadingImage: true,
      showingLess: true
    }
  },
  computed: {
    displayedImage() {
      return this.displayedImageNum > 0
        ? this.imageUrls[this.displayedImageNum-1]
        : '';
    },
    imageUrls() {
      return this.post.imageUrls
        ? this.post.imageUrls.split(';')
        : []
    },
    isAllowedToModify() {
      return this.$store.state.user && 
        this.$route.params.id == this.$store.state.user.id;
    },
    isPostContentLong() {
      return this.post.content.length > 255;
    },
    shortenPostContent() {
      return this.isPostContentLong
        ? this.post.content.substring(0, 255)
        : '';
    },

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
        this.$store.dispatch('fetchPosts', { userId: this.$route.params.id });
      } catch(err) {
        console.log(err);
      }
    },
    setDisplayedImage(num) {
      this.isLoadingImage = true;
      this.displayedImageNum = num;
    }
  },
  created() {
    if (this.imageUrls.length > 0) {
      this.displayedImageNum = 1;
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  max-width: 300px;
  text-align: left;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 7px 25px -3px;
  margin-bottom: 35px;
  transition: transform 0.4s ease-out;

  .post-content {
    font-size: 0.93rem;
    margin: 3px 0 17px;
    white-space: pre-wrap;

    .post-content-toggler {
      color: #555;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        color: #111;
      }
    }
  }

  .post-header {
    width: 100%;
    height: 70px;
    padding: 7px;
    position: absolute;
    top: 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0.77), rgb(0, 0, 0, 0));
    color: #eee;
    font-size: 0.9rem;
    font-weight: bold;
    z-index: 299;

    span {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .user-name {
    font-weight: bold;
    font-size: 0.9rem;
    margin-bottom: 7px;

    span {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

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
    z-index: 50;
  }

  .images-control {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    padding: 5px;
    z-index: 49;

    button {
      margin: 0;
      padding-left: 9px;
      padding-right: 9px;
      border: none;
      border-radius: 7px;
      background-color: rgba($color: white, $alpha: 0.4);
      color: #777;
      font-size: 1.25rem;

      &:hover {
        color: #333;
        background-color: rgba($color: white, $alpha: 0.75);
      }

      &:disabled {
        visibility: hidden;
      }
    }
  }

  &:hover {
    transform: scale(1.05);

    .delete-button {
      display: inline;
    }

    .images-control {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
