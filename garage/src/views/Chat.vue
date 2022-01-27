<template>
  <div class="max-h-screen">
    <div class="grid justify-items-center pt-10 min-h-screen">
      <div class="w-6/12">
        <div
          class="flex flex-col pt-6 mx-auto ml-56 bg-grey-100 overflow-auto rounded-xs h-4/6 shadow-2xl"
        >
          <!-- <div class="p-4 mb-2 shadow-inner text-lg text-left">
          <div class="font-bold">@test</div>
          <div class="font-semibold text-gray-900">test</div>
        </div> -->
          <div
            class="p-4 mb-2 shadow-inner text-lg"
            v-for="(msg, idx) in messages"
            :key="msg.username + idx"
            :class="[
              msg.username === currentUsername ? 'text-right' : 'text-left',
            ]"
          >
            <div class="font-bold">@{{ msg.username }}</div>
            <div class="font-semibold text-gray-900">{{ msg.message }}</div>
          </div>
        </div>
        <div
          class="ml-56 bg-white overflow-auto rounded-xs h-auto shadow-2xl border-t-2 border-gray-500"
        >
          <textarea
            class="resize-none p-4 h-auto min-w-full"
            placeholder="type your message"
            v-model="message"
            @keyup.enter="sendChat"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Chat",
  data() {
    return {
      currentUsername: localStorage.getItem("username"),
      message: "",
    };
  },
  methods: {
    ...mapActions(["sendChatMsg", "socket_gotMessage"]),
    sendChat() {
      this.sendChatMsg(this.message);
      this.message = "";
    },
  },
  computed: {
    ...mapState(["messages"]),
  },
  created() {
    this.socket_gotMessage();
  },
};
</script>

<style></style>
