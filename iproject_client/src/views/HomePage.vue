<template>
  <div>
    <div class="bg-white min-h-screen">
      <navbar></navbar>
      <div class="flex justify-end px-10">
        <input
          type="text"
          class="text-sm border-2 border-slate-300 h-8 w-auto pr-8 pl-5 rounded-full z-0 focus:shadow focus:outline-none"
          placeholder="Search title..."
          v-model="title"
          @keyup.enter="searchTitle"
        />
      </div>

      <div class="flex justify-center flex-row flex-wrap space-x-4">
        <div
          class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 fill-blue-200 bg-slate-50 transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-330 rounded"
          v-for="diary in diaryList"
          :key="diary.id"
        >
          <div class="flex justify-center md:justify-end -mt-16">
            <img
              class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
              :src="diary.imageUrl"
            />
          </div>
          <div>
            <h2 class="text-gray-800 text-3xl font-semibold">
              {{ diary.title }}
            </h2>
            <p class="mt-2 text-gray-600">
              {{ diary.story }}
            </p>
          </div>
          <div class="flex justify-end mt-4">
            <a
              href=""
              class="text-sm font-medium text-indigo-500"
              @click="seeDetail(diary.id)"
            >
              SEE DETAIL
            </a>
          </div>
        </div>
      </div>
      <div>{{ userList }}</div>
      <br />
      <button @click="chatButtonHandler">chat</button>
    </div>
    <div>
      <div class="p-20">
        <div class="group inline-block relative">
          <button
            class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <span class="mr-1">Dropdown</span>
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </button>
          <ul class="absolute hidden text-gray-700 pt-1 group-hover:block">
            <li class="">
              <a
                class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >One</a
              >
            </li>
            <li class="">
              <a
                class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >Two</a
              >
            </li>
            <li class="">
              <a
                class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
                >Three is the magic number</a
              >
            </li>
          </ul>
        </div>
      </div>
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
    seeDetail(diaryId) {
      this.$router.push(`/editpage/${diaryId}`);
    },
  },
  created() {
    this.getDiary();
  },
};
</script>

<style></style>
