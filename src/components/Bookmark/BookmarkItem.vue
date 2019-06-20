<template>
  <li v-if="bookmark" class="bookmarkitem" v-bind:class="{'is-complete':bookmark.completed}">
    <div class="bookmarkitem-detail-container">
      <a class="bookmarkitem-detail-title" :href="bookmark.url" target="_blank">
        {{bookmark.title}}
        <span class="bookmarkitem-detail-url">-{{bookmark.url}}</span>
      </a>
    </div>
    <div class="bookmarkitem-button-container">
      <font-awesome-icon
        class="bookitem-button"
        id="check-button"
        :icon="['fas','check']"
        size="xs"
        @click="markComplete(bookmark)"
      />
      <font-awesome-icon
        class="bookitem-button"
        id="edit-button"
        :icon="['far', 'edit']"
        size="xs"
        @click="editBookmarkHandle(bookmark)"
      />
      <font-awesome-icon
        class="bookitem-button"
        id="trash-button"
        :icon="['far', 'trash-alt']"
        size="xs"
        @click="deleteBookmarkHandle(bookmark)"
      />
      <font-awesome-icon
        class="bookitem-button"
        id="star-button"
        :icon="['far', 'star']"
        size="xs"
        v-bind:class="{active: bookmark.stared}"
        @click="starBookmark(bookmark)"
      />
    </div>
    <EditBookmarkModal
      @close-modal="cancelEdit(bookmark)"
      @edit-bookmark="doneEdit($event)"
      v-bind:show="showEditBookmarkModal"
      v-bind:bookmark="bookmark"
    ></EditBookmarkModal>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import EditBookmarkModal from "../Modal/EditBookmarkModal";

export default {
  props: {
    bookmark: Object
  },
  components: { EditBookmarkModal },
  data() {
    return {
      showEditBookmarkModal: false,
      editedBookmark: null
    };
  },
  computed: {
    isStared() {
      return this.bookmark.stared;
    }
  },
  methods: {
    ...mapActions(["deleteBookmark", "updateBookmark", "removeBookmarkChild"]),
    markComplete(bookmark) {
      bookmark.completed = !bookmark.completed;
      this.updateBookmark({
        bookmarkId: bookmark._id,
        bookmark: bookmark
      });
    },
    deleteBookmarkHandle(bookmark) {
      this.$emit("remove-bookmark-child", bookmark._id);
      this.deleteBookmark(bookmark._id);
    },
    starBookmark(bookmark) {
      bookmark.stared = !bookmark.stared;
      this.updateBookmark({
        bookmarkId: bookmark._id,
        bookmark: bookmark
      });
    },
    editBookmarkHandle(bookmark) {
      this.showEditBookmarkModal = true;
      this.beforeEditCache = { ...bookmark };
      this.editedBookmark = bookmark;
    },
    doneEdit(bookmark) {
      if (!this.editedBookmark) {
        return;
      }
      this.updateBookmark({
        bookmarkId: this.bookmark._id,
        bookmark: bookmark
      });
      this.showEditBookmarkModal = false;
    },
    cancelEdit(bookmark) {
      this.editedBookmark = null;
      bookmark.title = this.beforeEditCache.title;
      bookmark.url = this.beforeEditCache.url;
      this.showEditBookmarkModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}
li {
  display: flex;
}
.is-complete {
  text-decoration: line-through;
}
.bookmarkitem {
  border: 1px solid #979797;
  border-radius: 5px;
  background-color: white;
  padding: 5px;
  cursor: pointer;
}

.bookmarkitem:hover {
  & .bookitem-button {
    visibility: visible;
  }
}

.bookmarkitem-detail-container {
  margin: auto;
}

.bookmarkitem-detail-url {
  padding-left: 1em;
  color: #979797;
}

.bookmarkitem-detail-title {
}

.bookmarkitem-button-container {
  flex: 1;
  text-align: right;
  padding-right: 1em;
}

.bookitem-button {
  background-clip: padding-box;
  background-origin: padding-box;
  visibility: hidden;
  border-radius: 3px;
  padding: 5px;
  opacity: 0.6;
  font-size: 20px;
}

.bookmarkitem {
  &:hover {
    opacity: 1;
  }
  .active {
    visibility: visible;
    opacity: 1;
  }
}

#check-button:hover {
  background-color: #f4f5f7;
  opacity: 1;
}

#edit-button:hover {
  background-color: #f4f5f7;
  opacity: 1;
}

#trash-button:hover {
  background-color: #f4f5f7;
  opacity: 1;
}

#star-button {
  &:hover {
    background-color: #f4f5f7;
    opacity: 1;
  }
  &.active {
    color: rgb(219, 223, 28);
  }
}
</style>
