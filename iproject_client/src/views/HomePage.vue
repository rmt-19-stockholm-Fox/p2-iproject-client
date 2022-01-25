<template>
  <div>
    <div>{{ diaryList }}</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "HomePage",
  computed: {
    ...mapState(["diaryList"]),
  },
  methods: {
    ...mapActions(["getDiary"]),
  },
  created() {
    this.getDiary();
  },
};
</script>

<style></style>
