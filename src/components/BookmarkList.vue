<template>
  <div>
    <h1>BookmarkList</h1>
    <div :key="bookmark._id" v-for="bookmark in bookmarks">
      <BookmarkItem :bookmark="bookmark"></BookmarkItem>
    </div>
  </div>
</template>

<script>
import BookmarkItem from "./BookmarkItem";
export default {
  props: {
    bookmarks: Array
  },
  components: { BookmarkItem }
};
</script>

<style scoped>
</style>
