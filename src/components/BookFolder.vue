<template>
  <div class="dropdown">
    <div class="dropdown-header" v-bind:class="{ active: isActive }" v-on:click="onClickHandle">
      <div class="dropdown-title">{{folder.name}}</div>
      <div class="dropdown-button">
        <font-awesome-icon icon="caret-down" :rotation="iconRotation"/>
      </div>
    </div>

    <div v-show="isActive" class="dropdown-list">
      <div v-bind:key="bookmark._id" v-for="bookmark in folder.bookmarks">
        <ul>
          <BookItem
            v-bind:folderId="folder._id"
            v-bind:bookmark="bookmark"
            @deleteBookmarkInFolder="deleteBookmark"
          />
        </ul>
      </div>
    </div>
    <AddBook v-bind:folderId="folder._id"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BookItem from "./BookItem";
import AddBook from "./AddBook";

export default {
  name: "BookFolder",
  props: ["folder"],
  components: { BookItem, AddBook },
  data() {
    return {
      isActive: false,
      listsHeight: 0,
      listHeight: 50
    };
  },
  computed: {
    iconRotation() {
      return this.isActive ? null : "270";
    }
    // calculetedListsHeight() {
    //   return this.isActive
    //     ? this.listHeight * this.folder.bookmarks.length + "px"
    //     : 0 + "px";
    // }
  },
  methods: {
    ...mapActions(["deleteBookmarkInFolder", "fetchFolders"]),
    onClickHandle() {
      this.isActive = !this.isActive;
    },
    deleteBookmark(bookId) {
      this.deleteBookmarkInFolder({
        folderId: this.folder._id,
        bookId: bookId
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: aqua;
}
.dropdown {
  display: flex;
  flex-direction: column;
  border: 1px whitesmoke solid;
  border-radius: 10px;
  background-color: wheat;
}

.dropdown-header {
  display: flex;
  cursor: pointer;
  flex-direction: row;
  padding: 10px;
}

.dropdown-title {
  flex: 2;
}

.dropdown-button {
  flex: 1;
  text-align: right;
}

.dropdown-list {
  display: flex;
  flex-direction: column;
}

ul {
  margin: 5px 10px;
  transition: max-height 0.2s ease-out;
}
</style>
