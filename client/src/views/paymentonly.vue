<template>
  <div class=""></div>
</template>

<script>
export default {
  name: 'paymentonly',
  created () {
    console.log('this is payment')
    this.$route.push({ path: '/' })
  }
}
</script>

<style>

</style>
