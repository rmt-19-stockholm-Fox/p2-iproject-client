<template>
  <div>
    <button @click="goToDetail(location.id)" class="w-full h-48 my-2 border flex flex-col">
      <div class="h-1/2 text-xl text-left px-4 pt-4">{{ location.name }}</div>
      <div class="text-md text-left px-4 pb-4">{{ location.address }}</div>
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Card",
  props: ["location"],
  methods: {
    ...mapActions(['detailHandler']),
    goToDetail(locationId) {
      // router.push({
      //   name: "LocationDetail",
      //   params: { locationId: this.location.id },
      // });
      this.detailHandler(locationId);
    },
  },
};
</script>

<style>
</style>