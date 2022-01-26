<template>
  <div>
    <div>
      <h2>Vue Js Search and Add Marker</h2>

      <label>
        <gmap-autocomplete @place_changed="initialMarker"></gmap-autocomplete>

        <button @click="addLocationMarker">Add</button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map
      :zoom="16"
      :center="center"
      :options="options"
      :style='styles'
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
  props: ['styles'],
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
      this.initMarker(loc);
    },
  },
};
</script>