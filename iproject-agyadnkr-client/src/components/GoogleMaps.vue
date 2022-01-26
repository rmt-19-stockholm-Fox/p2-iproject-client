<template>
  <div class="w-full h-screen">
    <gmap-map
      :zoom="16"
      :center="center"
      :options="options"
      style="width: 100%; height: 100%"
    >
      <gmap-marker
        v-for="(loc, index) in locationMarkers"
        :key="index"
        :position="loc.position"
        :clickable="true"
        :draggable="true"
        @click="center = loc.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>
 
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "GoogleMap",
  data() {
    return {
      // option for google maps display
      options: {
        fullscreenControl: false,
      },
    };
  },
  computed: {
    ...mapState(["center", "locationMarkers", "locPlaces", "existingPlace"]),
    
  },
  mounted() {
    this.locateGeoLocation();
    this.fetchLocations();
  },
  methods: {
    ...mapActions(["addLocationMarker", "initMarker", "fetchLocations"]),
    ...mapMutations(["SET_CENTER"]),

    // Set center using  google geolocation
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition((res) => {
        const marker = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        };
        this.SET_CENTER(marker);
      });
    },
    initialMarker(loc) {
      // console.log(loc, 'Di Viewss')
      this.initMarker(loc);
    },
  },
};
</script>