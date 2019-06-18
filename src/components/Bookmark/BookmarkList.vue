<template>
  <div v-if="haveBookmark" class="bookmarklist-box">
    <ul>
      <BookmarkItem
        :key="index"
        v-for="(bookmarkId, index) in bookmarks"
        :bookmark="getBookmarkById(bookmarkId)"
        @remove-bookmark-child="$emit('remove-bookmark-child', $event)"
      />
    </ul>
  </div>
  <div v-else>
    <p>please, add bookmark first</p>
  </div>
</template>

<script>
import BookmarkItem from "./BookmarkItem";
import { mapGetters } from "vuex";

export default {
  props: {
    bookmarks: Array
  },
  components: { BookmarkItem },
  computed: {
    ...mapGetters(["getBookmarkById"]),
    haveBookmark() {
      return this.bookmarks.length > 0;
    }
  },
  methods: {}
};
</script>

<style scoped>
.bookmarklist-box {
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
}
li {
  list-style-type: none;
}
</style>
