<template>
  <div>
    <div>
      <navbar></navbar>
    </div>
    <div>
    </div>

    <div></div>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  computed: {
    
  },
};
</script>

<style></style>
