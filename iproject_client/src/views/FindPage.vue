<template>
  <div>
    <navbar></navbar>
    <div class="flex items-center justify-center py-32 space-x-4">
      <div
        class="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs"
        v-for="user in userList"
        :key="user.id"
      >
        <img
          class="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          alt="user"
        />
        <h1 class="text-lg text-gray-700">{{ user.username }}</h1>
        <h3 class="text-sm text-gray-400">{{ user.name }}</h3>
        <h3 class="text-xs text-gray-400 font-light pb-4">{{ user.email }}</h3>
        <router-link
          to="/chatpage"
          v-if="currentUserId != user.id"
          class="text-sm bg-blue-300 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
        >
          Chat
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Navbar from "../components/Navbar.vue";
export default {
  name: "FindPage",
  data() {
    return {
      currentUserId: localStorage.getItem("userId"),
    };
  },
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["userList", "friendList"]),
  },
  methods: {
    ...mapActions(["searchUser", "getFriendList"]),
  },
  created() {
    this.getFriendList();
  },
};
</script>

<style></style>
