<template>
  <div id="register" class="w-screen min-h-screen flex flex-row bg-white drop-shadow">
    <div
      class="
        basis-4/12
        h-screen
        flex flex-col
        m-12
        border
        rounded-3xl
        drop-shadow-xl
      "
    >
      <div class="my-24">
        <p
          class="text-6xl px-12"
          style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
        >
          Register
        </p>
      </div>
      <form @submit.prevent="registerSubmit">
        <div class="grid grid-cols-1 mt-4 place-items-center">
          <div class="w-full flex-flex-col mt-8">
            <p
              class="text-left text-xl py-4 mx-20"
              style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
            >
              Username
            </p>
            <input
              v-model="register.username"
              type="text"
              class="w-10/12 h-10 py-6 px-4 text-xl border rounded-md"
              placeholder="Insert username/email"
            />
          </div>
          <div class="w-full flex-flex-col mt-8">
            <p
              class="text-left text-xl py-4 mx-20"
              style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
            >
              Email
            </p>
            <input
              v-model="register.email"
              type="text"
              class="w-10/12 h-10 py-6 px-4 text-xl border rounded-md"
              placeholder="Insert username/email"
            />
          </div>
          <div class="w-full flex-flex-col mt-8">
            <p
              class="text-left text-xl py-4 mx-20"
              style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
            >
              Password
            </p>
            <input
              v-model="register.password"
              type="password"
              class="w-10/12 h-10 py-6 px-4 text-xl border rounded-md"
              placeholder="Input username/password"
            />
          </div>
        </div>
        <button
          class="
            w-10/12
            rounded-full
            mt-16
            py-5
            px-12
            bg-blue-500
            hover:bg-blue-600
            text-2xl text-slate-100
          "
          style="font-family: 'Encode Sans', sans-serif; font-weight: 400"
        >
          Register
        </button>
        <br> <br>
        <router-link class="text-xl" to="/login">Already have account? Login here</router-link>
      </form>
    </div>
    <div class="basis-8/12 h-screen">
      <img
        src="https://previews.123rf.com/images/goodstudio/goodstudio1704/goodstudio170400185/76190214-hand-drawn-modern-bathroom-and-toilet-interior-design-collection-colorful-vector-sketch-illustration.jpg"
        alt="Where's the Toilet?"
        class="h-screen w-full object-contain"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return{
      register: {}
    }
  },
  methods: {
    ...mapActions(['registerHandler']),
    registerSubmit() {
      this.registerHandler(this.register)
    }
  }
}
</script>

<style>

</style>