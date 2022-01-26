<template>
  <div id="login" class="w-screen min-h-screen flex flex-row bg-white drop-shadow">
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
          Login
        </p>
      </div>
      <form>
        <div class="grid grid-cols-1 mt-8 place-items-center">
          <div class="w-full flex-flex-col mt-8">
            <p
              class="text-left text-xl py-4 mx-20"
              style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
            >
              Username or Password
            </p>
            <input
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
          Login
        </button>
        <br> <br>
        <router-link class="text-xl" to="/register">Don't have account? Register here</router-link>
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
// import { mapState } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      login: {}
    }
  },
  computed: {},
};
</script>


<style>
</style>