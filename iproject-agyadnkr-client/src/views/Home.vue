<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <GoogleMaps />
  </div>
</template>

<script>
// @ is an alias to /src
import GoogleMaps from '../components/GoogleMaps.vue'
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    GoogleMaps
  },
};
</script>
