<template>
  <div>
    <div>
      <form action="" @submit.prevent="findUser">
        <input type="search" placeholder="Search user ..." v-model="username" />
        <button type="submit">search</button>
      </form>
    </div>
    <div>{{ diaryList }}</div>
    <br /><br />
    <div>{{ userList }}</div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "HomePage",
  data() {
    return {
      username: "",
    };
  },
  computed: {
    ...mapState(["diaryList", "userList"]),
  },
  methods: {
    ...mapActions(["getDiary", "searchUser"]),
    ...mapMutations({
      changeUsername: "CHANGE_USERNAME",
    }),
    findUser() {
      this.changeUsername(this.username);
      this.searchUser();
    },
  },
  created() {
    this.getDiary();
  },
};
</script>

<style></style>
