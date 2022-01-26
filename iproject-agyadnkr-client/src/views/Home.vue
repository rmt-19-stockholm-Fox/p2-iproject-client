<template>
  <div class="home">
    <GoogleMaps
    :styles='"width: 75%; height: 800px"' />
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from '../components/GoogleMaps.vue'

export default {
  name: "Home",
  components: {
    GoogleMaps
  },
};
</script>
