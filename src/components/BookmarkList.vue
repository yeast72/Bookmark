<template>
  <div>
    <div :key="index" v-for="(bookmarkId, index) in bookmarks">
      <BookmarkItem :bookmark="getBookmarkById(bookmarkId)"></BookmarkItem>
    </div>
  </div>
</template>

<script>
import BookmarkItem from "./BookmarkItem";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    bookmarks: Array
  },
  components: { BookmarkItem },
  computed: {
    ...mapGetters(["getBookmarkById"])
  },
  methods: {}
};
</script>

<style scoped>
</style>
