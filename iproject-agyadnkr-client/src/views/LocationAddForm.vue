<template>
  <div
    id="LocationAddForm"
    class="w-screen min-h-screen flex flex-row bg-white"
  >
    <div class="basis-4/12 h-screen flex flex-col">
      <div class="my-24">
        <p
          class="text-6xl px-12"
          style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
        >
          Add New Location
        </p>
      </div>
      <label>
         <p
            class="text-left text-xl mx-20"
            style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
          >
            Find Location
          </p>
        <gmap-autocomplete
          class="w-10/12 py-4 px-4 mt-4 mb-8 border rounded-md text-xl"
          @place_changed="initialMarker"
        ></gmap-autocomplete>
      </label>
      <div class="grid grid-cols-1 mt-8 place-items-center">
        <div class="w-full flex-flex-col mt-8">
          <p
            class="text-left text-xl py-4 mx-20"
            style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
          >
            Name
          </p>
          <input
            v-model="existingPlace.name"
            type="text"
            class="w-10/12 h-10 py-6 px-4 text-xl border rounded-md"
            placeholder="Location name will be displayed here"
            readonly
          />
        </div>
        <div class="w-full flex-flex-col mt-8">
          <p
            class="text-left text-xl py-4 mx-20"
            style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
          >
            Address
          </p>
        <textarea
          cols="20"
          rows="6"
          v-model="existingPlace.formatted_address"
          type="text"
          placeholder="Location address will be displayed here"
          class="w-10/12 h-36 py-6 px-4 text-xl border rounded-md"
          readonly
        />
        </div>
        <div class="w-full flex-flex-col mt-8">
           <p
            class="text-left text-xl py-4 mx-20"
            style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
          >
            Price
          </p>
        <input
          v-model="price"
          type="number"
          class="w-10/12 h-10 py-6 px-4 text-xl border rounded-md"
          placeholder="Input price here"
        />
        </div>
        <button
          class="
            w-10/12
            rounded-full
            mt-16
            py-5
            px-12
            bg-blue-500
            hover:bg-blue-600
            text-2xl text-slate-100
          "
          style="font-family: 'Encode Sans', sans-serif; font-weight: 400"
          @click="addLocationMarker"
        >
          Add Location
        </button>
      </div>
    </div>
    <div class="basis-8/12 h-screen">
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "LocationAddForm",
  component: {},
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
    price: {
      set(value) {
        this.$store.commit("SET_PRICE", value);
      },
    },
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

<style>
</style>