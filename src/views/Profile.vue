<template>
  <div>
    <div class="container">
      <div class="row mt-3 mb-4">
        <div class="col d-flex justify-content-end">
          <img id="profile-picture" :src="userPicture">
        </div>
        <div class="col d-flex flex-column justify-content-center align-items-start">
          <h4>{{ userName }}</h4>
          <h5>{{ userEmail }}</h5>
        </div>
      </div>
      <div class="row">
        <div class="col-11 mx-auto">
          <hr />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col" style="margin-bottom: 80px;">
          <PostsList :params="{ userId: $route.params.id, excludeUser: true }"></PostsList>
        </div>
      </div>
    </div>
    <div
      class="form-wrapper"
      :class="{ active: isCreatingPost }">
      <div class="container">
        <div class="row">
          <div class="form-box col-9 mx-auto">
            <div class="close-wrapper">
              <span @click="isCreatingPost = false">✕</span>
            </div>
            <PostForm></PostForm>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isAllowedToModify" 
      class="post-button-wrapper"
      :class="{ active: !isCreatingPost }">
      <div class="container">
        <div class="row">
          <div class="form-box col-6 mx-auto">
            <button class="btn btn-primary" @click="isCreatingPost = true">
              New Post +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostsList from '../components//PostsList.vue';
import PostForm from '../components/PostForm.vue';

export default {
  name: 'Profile',
  components: { PostsList, PostForm },
  data() {
    return {
      isCreatingPost: false
    }
  },
  watch: {
    '$store.state.createdPost'() {
      this.isCreatingPost = false;
    }
  },
  computed: {
    userPicture() {
      return this.$store.state.avatarUrl;
    },
    userEmail() {
      return this.$store.state.profile.email
    },
    userName() {
      return this.$store.state.profile.name
    },
    isAllowedToModify() {
      return this.$store.state.user && this.$route.params.id == this.$store.state.user.id;
    }
  },
  async beforeCreate() {
    try {
      this.$store.commit('RESET_PROFILE');

      await this.$store.dispatch('fetchProfile', this.$route.params.id);

      if (Object.keys(this.$store.state.profile).length == 0) {
        this.$router.push('/');
      }
    } catch(err) {
      console.log(err);
    }
  }
}
</script>

<style scoped lang="scss">
hr {
  background-color: #eee;
}

h5 {
  font-size: 1.1rem;
  color: #555;
}

#profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.form-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  text-align: center;
  transform: translateY(575px);
  transition: transform 0.65s ease-out;

  &.active {
    transform: translateY(0px);
  }

  .form-box {
    padding: 50px 50px 75px 50px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px 10px 0px 0px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px -5px 15px;
  }

  .close-wrapper {
    width: 100%;
    padding: 10px 15px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: right;
    
    span {
      color: #999;
      font-weight: bold;
      font-size: 1.2rem;
      cursor: pointer;

      &:hover {
        color: #333;
      }
    }
  }
}

.post-button-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  text-align: center;
  transform: translateY(500px);
  transition: transform 0.55s ease-out;

  &.active {
    transform: translateY(0px);
  }

  .form-box {
    padding: 17px 0 25px 0;
    background-color: rgba($color: white, $alpha: 0.45);
    opacity: 0.8;
    border-radius: 15px 15px 0px 0px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px -5px 15px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
