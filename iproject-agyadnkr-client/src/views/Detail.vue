<template>
  <div id="Home" class="w-screen min-h-screen flex flex-row bg-white">
    <div class="overflow-y-auto basis-4/12 h-screen flex flex-col">
    <h1>{{detailLoc.name}}</h1>
    <h1>{{detailLoc.address}}</h1>
    <h1>{{detailLoc.price}}</h1>
    <a :href="detailLoc.mapsUrl">Go to Google Map</a>
      <!-- <Card
      v-for="location in allLocation"
      :key="location.id"
      :location="location"
      ></Card> -->
    </div>
    <div class="basis-8/12 h-screen">
      <GoogleMaps></GoogleMaps>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GoogleMaps from '../components/GoogleMaps.vue'

export default {
  name: 'LocationDetail',
  components: {
    GoogleMaps
  },
  computed: {
    ...mapState(['detailLoc'])
  }
}
</script>
