<template>
  <section class="vh-100" style='background-color: #FFE53B;
background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);
'>
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
          alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form v-on:submit.prevent="loginSubmit">

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" v-model="formLogin.email"/>
            <label class="form-label" for="form3Example3">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" v-model="formLogin.password"/>
            <label class="form-label" for="form3Example4">Password</label>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a v-on:click.prevent='goRegisterPage' href=""
                class="link">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      formLogin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginSubmit () {
      this.$store.dispatch('loginSubmit', this.formLogin)
        .then(data => {
          this.formLogin.email = ''
          this.formLogin.password = ''
          this.$router.push({ path: '/' })
          this.$swal.fire({
            icon: 'success',
            title: 'Login Successfully',
            text: 'Welcome'
          })
        })
        .catch(err => {
          console.log(err)
          this.$swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: `${err}`
          })
        })
    },
    goRegisterPage () {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style>

</style>
