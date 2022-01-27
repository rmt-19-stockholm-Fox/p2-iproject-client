<template>
  <div>
    <div class="container">
      <div class="row mt-3 mb-4">
        <div class="col-4 d-flex justify-content-end">
          <img id="profile-picture" :src="placePhoto">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center align-items-start">
          <h4>{{ placeName }}</h4>
          <div class="address">{{ placeAddress }}</div>
        </div>
        <div class="col-2"></div>
      </div>
      <div class="row">
        <div class="col-11 mx-auto">
          <hr />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col" style="margin-bottom: 80px;">
          <PostsList :params="{ placeId: $route.params.id }"></PostsList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostsList from '../components//PostsList.vue';
import storage from '../helpers/storage';

export default {
  name: 'Profile',
  components: { PostsList },
  computed: {
    ...mapState(['placeProfile']),
    placePhoto() {
      return this.placeProfile.photos
        ? `${storage.apiHost.value()}/places/photo?ref=${this.placeProfile.photos[0].photo_reference}`
        : this.placeProfile.icon;
    },
    placeAddress() {
      return this.$store.state.placeProfile.address
    },
    placeName() {
      return this.$store.state.placeProfile.name
    }
  },
  async beforeCreate() {
    this.$store.dispatch('fetchPlaceDetail', this.$route.params.id);
  }
}
</script>

<style scoped lang="scss">
hr {
  background-color: #eee;
}

.address {
  font-size: 0.9rem;
  color: #777;
  text-align: left;
}

#profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
</style>
