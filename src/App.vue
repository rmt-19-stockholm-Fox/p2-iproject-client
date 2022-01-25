<template>
  <div>
    <div >
      <navbar ></navbar>
    </div>
    <div>
      <router-link to="/login" />
    </div>
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
