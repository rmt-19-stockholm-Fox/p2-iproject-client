<template>
  <div id="app">
    
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
export default {
  components:{
    Navbar
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  background-image: url('./assets/Wallpaper.jpg');
  background-size: cover;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}

</style>
