<template>
<div class="wraper vh-100" style='background-color: #FFDEE9;
background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
'>
  <div class="container p-3">
      <form v-on:submit.prevent='postTravel'>
      <div class="mb-3">
          <input type="text" class="form-control" placeholder="name" v-model='formTravelPost.name'>
      </div>
      <div class="mb-3">
          <input type="text" class="form-control" placeholder="summary" v-model='formTravelPost.summary'>
      </div>
      <div class="mb-3">
          <input type="date" class="form-control" placeholder="date" v-model='formTravelPost.date'>
      </div>
      <div class="mb-3">
          <input type="text" class="form-control" placeholder="imageUrl" v-model='formTravelPost.imageUrl'>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      formTravelPost: {
        name: '',
        summary: '',
        date: '',
        imageUrl: ''
      }
    }
  },
  methods: {
    postTravel () {
      this.$store.dispatch('postTravel', this.formTravelPost)
        .then(data => {
          this.$swal.fire({
            icon: 'success',
            title: 'Successfuly create post'
          })
          this.$router.push({ path: '/' })
        })
        .catch(err => {
          this.$swal.fire({
            icon: 'error',
            text: `${err.response.data.message}`
          })
        })
    }
  }
}
</script>

<style>

</style>
