<template>
  <div>
    <div
      class="bg-gradient-to-b from-sky-400 to-sky-200bg-gradient-to-b from-sky-400 to-sky-200 min-h-screen"
    >
      <navbar></navbar>
      <div>
        <input
          type="search"
          placeholder="Search title ..."
          v-model="title"
          @keyup.enter="searchTitle"
        />
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
      title: "",
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
      changeTitle: "CHANGE_TITLE",
    }),
    searchTitle() {
      this.changeTitle(this.title);
      this.getDiary();
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
