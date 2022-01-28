<template>
  <div
    id="login"
    class="w-screen min-h-screen flex flex-row bg-white drop-shadow"
  >
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
      <form @submit.prevent="loginSubmit">
        <div class="grid grid-cols-1 mt-8 place-items-center">
          <div class="w-full flex-flex-col mt-8">
            <p
              class="text-left text-xl py-4 mx-20"
              style="font-family: 'Encode Sans', sans-serif; font-weight: 700"
            >
              Username or Email
            </p>
            <input
              v-model="login.user"
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
              v-model="login.password"
              type="password"
              class="w-10/12 h-10 py-6 px-4 text-xl border rounded-md"
              placeholder="Insert password"
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
        <br />
        <br />
        <router-link class="text-xl" to="/register"
          >Don't have account? Register here</router-link
        >
      </form>
      <div class="my-16 mx-auto">
        <GoogleLogin
        class="btn btn-primary self-center"
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
      </div>
      
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
import GoogleLogin from 'vue-google-login';
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    GoogleLogin,
  },
  data() {
    return {
      login: {},
      renderParams: {
        width: 300,
        height: 50,
        longtitle: true,
      },
      params: {
        client_id:
          "369972256827-aabsb84t9ultj32em42jd7ngl1m9g04p.apps.googleusercontent.com",
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions([
      "loginHandler",
      "twitterSignInHandler",
      "loginGoogleHandler",
    ]),
    loginSubmit() {
      this.loginHandler(this.login);
    },

    async onSuccess(googleUser) {
      try {
        this.loginGoogleHandler(googleUser);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


<style>
</style>