<template>
  <div
    id="LocationAddForm"
    class="w-screen min-h-screen flex flex-row bg-red-500"
  >
    <div class="w-3/4 h-screen">
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
    <div class="w-1/4 h-screen">
      <label>
        <gmap-autocomplete @place_changed="initialMarker"></gmap-autocomplete>

        <button @click="addLocationMarker">Add</button>
      </label>
    </div>
  </div>
</template>

<script>
import GoogleMaps from "../components/GoogleMaps.vue";
import { mapState } from "vuex";

export default {
  name: "LocationAddForm",
  component: {
    GoogleMaps,
  },
  data() {
    return {
      addLocation: {},
      options: {
        fullscreenControl: false,
      },
    };
  },
  computed: {
    ...mapState(["center", "locationMarkers", "locPlaces", "existingPlace"]),
  },
};
</script>

<style>
</style>