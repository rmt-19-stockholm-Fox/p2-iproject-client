<template>
  <div>
    <h1>create</h1>
    <form action="" @submit.prevent="createDiary">
      <input
        type="text"
        name="title"
        placeholder="Title"
        v-model="diary.title"
      />
      <input
        type="text"
        name="story"
        placeholder="Story"
        v-model="diary.story"
      />
      <input
        type="textarea"
        name="ImageUrl"
        placeholder="Image Url"
        v-model="diary.imageUrl"
      />
      <select name="TagId" id="" v-model="diary.TagId">
        <option :value="tag.id" v-for="tag in getTag" :key="tag.id">
          {{ tag.name }}
        </option>
      </select>
      <button>Post Diary</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "CreateDiary",
  data() {
    return {
      diary: {},
    };
  },
  computed: {
    ...mapState(["getTag", "newDiaryStatus"]),
  },
  methods: {
    ...mapActions(["newDiary", "fetchTag"]),
    ...mapMutations({
      changeNewDiary: "CHANGE_NEWDIARY",
    }),
    async createDiary() {
      this.changeNewDiary(this.diary);
      await this.newDiary();
      if (this.newDiaryStatus === true) {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.fetchTag();
  },
};
</script>

<style></style>
