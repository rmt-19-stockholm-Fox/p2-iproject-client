<template>
  <div id="BlueButton">
    <button class="rounded-full py-5 px-12 bg-blue-500 hover:bg-blue-600
    text-2xl text-slate-100" style="font-family: 'Encode Sans', sans-serif; font-weight: 400">
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "BlueButton",
  props: ["text"],
};
</script>

<style>
</style>