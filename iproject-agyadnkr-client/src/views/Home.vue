<template>
  <div id="Home" class="w-screen min-h-screen flex flex-row bg-white">
    <div class="overflow-y-auto basis-4/12 h-screen flex flex-col">
      <Card
      v-for="location in allLocation"
      :key="location.id"
      :location="location"
      ></Card>
    </div>
    <div class="basis-8/12 h-screen">
      <GoogleMaps></GoogleMaps>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from "../components/GoogleMaps.vue";
import Card from "../components/Cards.vue";
import { mapState } from 'vuex'

export default {
  name: "Home",
  components: {
    GoogleMaps,
    Card,
  },
  computed: {
    ...mapState(['allLocation'])
  }
};
</script>
