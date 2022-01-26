<template>
  <div>
    <div
      class="bg-gradient-to-b from-sky-400 to-sky-200 bg-gradient-to-b from-sky-400 to-sky-200 h-screen"
    >
      <navbar></navbar>
      <div>
        <form action="" @submit.prevent="findUser">
          <input
            type="search"
            placeholder="Search user ..."
            v-model="username"
          />
          <button type="submit">search</button>
        </form>
      </div>
      <div>{{ diaryList }}</div>
      <br /><br />
      <div>{{ userList }}</div>
      <br />
      <button @click="chatButtonHandler">chat</button>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "HomePage",
  data() {
    return {
      username: "",
      usernameToServer: localStorage.getItem("userName"),
    };
  },
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["diaryList", "userList"]),
  },
  methods: {
    ...mapActions(["getDiary", "searchUser", "setUsername"]),
    ...mapMutations({
      changeUsername: "CHANGE_USERNAME",
    }),
    findUser() {
      this.changeUsername(this.username);
      this.searchUser();
    },
    chatButtonHandler() {
      this.setUsername(this.usernameToServer);
      this.$router.push("/chatpage");
    },
  },
  created() {
    this.getDiary();
  },
};
</script>

<style></style>
