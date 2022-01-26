<template>
  <div>
    <div>
      <h2>Vue Js Search and Add Marker</h2>

      <label>
        <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>

        <button @click="addLocationMarker">Add</button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map
      :zoom="16"
      :center="center"
      :options="options"
      style="width: 60%; height: 800px"
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
export default {
  name: "GoogleMap",
  data() {
    return {
      center: {
        lat: -7.759722999999999,
        lng: 110.3989719
      },
      locationMarkers: [
        {
          position: {
            lat: -7.759722999999999,
            lng: 110.3989719,
          },
        },
        {
          position: {
            lat: -7.76,
            lng: 110.39898,
          },
        },
      ],
      options: {
         fullscreenControl: false,
      },
      locPlaces: [],
      existingPlace: {},
    };
  },

  mounted() {
    this.locateGeoLocation();
  },
  methods: {
    initMarker(loc) {
      console.log(loc)
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng(),
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        console.log(this.existingPlace);
        this.existingPlace = null;
        console.log(marker);
        console.log(this.existingPlace);
      }
    },
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        };
      });
    },
  },
};
</script>