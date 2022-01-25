<template>
  <div class="flex items-center min-h-screen bg-gray-50">
    <div class="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      <div class="flex flex-col md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            class="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
            alt="img"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <div class="flex justify-center">
              <img
                class="w-96"
                src="..\assets\tipsytip-logos_transparent.png"
                alt=""
              />
            </div>
            <h1 class="mb-4 text-2xl font-bold text-center text-gray-700">
              {{ title }}
            </h1>
            <div>
              <label class="block font-medium text-sm"> Email </label>
              <input
                v-model="credential.email"
                type="email"
                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder=""
              />
            </div>

            <div v-show="registerPage">
              <label class="block  font-medium mt-4 text-sm"> Username </label>
              <input
                v-model="credential.username"
                type="email"
                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder=""
              />
            </div>

            <div>
              <label class="block font-medium mt-4 text-sm"> Password </label>
              <input
                v-model="credential.password"
                class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder=""
                type="password"
              />
            </div>

            <button
            @click="buttonLoginRegister"
              class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              href="#"
            >
              {{ buttonName }}
            </button>

            <div class="text-sm font-medium leading-5 text-center my-4">
              <h4>OR</h4>
            </div>

            <div>
              <button
                @click="changeToRegister"
                v-show="!registerPage"
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500"
              >
                Sign Up
              </button>
            </div>
            <div>
              <button
                @click="changeToLogin"
                v-show="registerPage"
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500"
              >
                Sign In
              </button>
            </div>

            <hr class="my-8" />

            <div class="flex items-center justify-center gap-4">
              <button
                class="flex items-center justify-center w-full px-4 py-2 text-sm text-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="w-4 h-4 mr-2"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="b">
                    <use xlink:href="#a" overflow="visible" />
                  </clipPath>
                  <path
                    clip-path="url(#b)"
                    fill="#FBBC05"
                    d="M0 37V11l17 13z"
                  />
                  <path
                    clip-path="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  />
                  <path
                    clip-path="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clip-path="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  /></svg
                >Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "LoginRegis",
  data() {
    return {
      title: "Sign In to Your Account",
      buttonName: "Sign In",
      credential: {
        email: "",
        username: "",
        password: "",
      },
      registerPage: false,
    };
  },
  methods: {
    ...mapActions(['doRegister', 'doLogin']),
    changeToRegister() {
      this.title = "Sign Up An Account";
      this.buttonName = "Sign Up";
      this.registerPage = true;
      this.$router.push("/register");
    },

    changeToLogin() {
      this.title = "Sign In to Your Account";
      this.buttonName = "Sign In";
      this.registerPage = false;
      this.$router.push("/login");
    },

    async buttonLoginRegister() {
      if (this.registerPage) {
        await this.doRegister(this.credential);
        this.changeToLogin()
      } else if(!this.registerPage) {
        await this.doLogin(this.credential);
        this.$router.push('/')

      }
    }
  },
};
</script>

<style></style>
