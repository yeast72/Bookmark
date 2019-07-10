<template>
  <div v-if="haveItem" class="bookmarklist-box">
    <ul>
      <BookmarkItem
        :key="bookmarkId"
        v-for="bookmarkId in bookmarks"
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
import FolderItem from "./FolderItem";
import { mapGetters } from "vuex";

export default {
  props: {
    bookmarks: Array,
    folders: Array
  },
  components: { BookmarkItem, FolderItem },
  computed: {
    ...mapGetters(["getBookmarkById", "getFolderById"]),
    haveItem() {
      return this.bookmarks.length || this.folders.length;
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
