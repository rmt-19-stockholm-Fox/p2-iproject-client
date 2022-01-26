<template>
  <div id="Home" class="w-screen min-h-screen flex flex-row bg-white">
    <div class="basis-4/12 h-screen flex flex-col"></div>
    <div class="basis-8/12 h-screen">
      <GoogleMaps></GoogleMaps>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from "../components/GoogleMaps.vue";

export default {
  name: "Home",
  components: {
    GoogleMaps,
  },
};
</script>
