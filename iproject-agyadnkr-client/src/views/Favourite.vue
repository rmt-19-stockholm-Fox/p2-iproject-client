<template>
  <div id="Home" class="w-screen min-h-screen flex flex-row bg-white">
    <div class="overflow-y-auto basis-4/12 h-screen flex flex-col">
      <Card
        v-for="location in myFavourite"
        :key="location.id"
        :location="location.Location"
      ></Card>
    </div>
    <div class="basis-8/12 h-screen">
      <gmap-map
        :zoom="16"
        :center="center"
        :options="options"
        style="width: 100%; height: 100%"
      >
        <gmap-marker
          v-for="(loc, index) in myFavourite"
          :key="index"
          :position="{
            lat: +loc.Location.lattitude,
            lng: +loc.Location.longitude
          }"
          :clickable="true"
          :draggable="false"
          @click="
            center = {
              lat: +loc.Location.lattitude,
              lng: +loc.Location.longitude
            }
          "
        ></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Card from '../components/Cards.vue'

export default {
  name: "Favourite",
  components: {
    Card
  },
  data() {
    return {
      options: {
        fullscreenControl: false,
      },
    };
  },
  methods: {
    ...mapActions(["fetchFavourite"]),
  },
  computed: {
    ...mapState(["myFavourite", "center"]),
  },
  created() {
    // console.log("created");
    this.fetchFavourite();
  },
};
</script>

<style>
</style>