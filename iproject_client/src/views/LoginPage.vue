<template>
  <div>
    <form action="" @submit.prevent="loginHandler">
      <input type="text" placeholder="email" v-model="user.email" />
      <input type="password" placeholder="password" v-model="user.password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    ...mapMutations({
      changeUserData: "CHANGE_USERDATA",
    }),
    ...mapActions(["login"]),
    loginHandler() {
      this.changeUserData(this.user);
      this.login();
    },
  },
};
</script>

<style></style>
