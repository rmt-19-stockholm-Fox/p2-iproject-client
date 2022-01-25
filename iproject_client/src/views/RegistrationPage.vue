<template>
  <div>
    <form action="" @submit.prevent="registrationHandler">
      <input type="text" placeholder="name" v-model="user.name" />
      <input type="text" placeholder="username" v-model="user.username" />
      <input type="text" placeholder="email" v-model="user.email" />
      <input type="password" placeholder="password" v-model="user.password" />
      <input
        type="text"
        placeholder="ex: 628126097xxx"
        v-model="user.phoneNumber"
      />
      <button type="sumbit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "RegistrationPage",
  data() {
    return {
      user: {},
    };
  },
  computed: {
    ...mapState(["registrationStatus"]),
  },
  methods: {
    ...mapMutations({
      changeUserData: "CHANGE_USERDATA",
    }),
    ...mapActions(["registration"]),
    registrationHandler() {
      this.changeUserData(this.user);
      this.registration();
      setTimeout(() => {
        if (this.registrationStatus === true) {
          this.$router.push("/loginpage");
        }
      }, 5000);
    },
  },
};
</script>

<style></style>
