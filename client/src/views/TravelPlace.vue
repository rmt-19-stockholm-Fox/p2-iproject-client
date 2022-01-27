<template>
<div class="wraper vh-100" style='background-color: #FFDEE9;
background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
'>
  <div class="container">
      <table class="table">
        <thead>
            <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Location Url</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for='travel in travelPlaces' v-bind:key='travel.name'>
            <td>{{ travel.name }}</td>
            <td>{{ categoryFormatter(travel.categories) }}</td>
            <td><a :href='generateMaps(travel.lat, travel.lng)'>https://www.google.co.id/maps/@{{ travel.lat }},{{ travel.lng }},15z</a></td>
            </tr>
        </tbody>
      </table>
  </div>
</div>
</template>

<script>
export default {
  name: 'TravelPlace',
  created () {
    this.$store.dispatch('fetchTravelPlace')
  },
  computed: {
    travelPlaces () {
      return this.$store.state.travelPlaces
    }
  },
  methods: {
    generateMaps (lat, lng) {
      return `https://www.google.co.id/maps/@${lat},${lng},15z`
    },
    categoryFormatter (category) {
      return category.join(', ')
    }
  }
}
</script>

<style>

</style>
