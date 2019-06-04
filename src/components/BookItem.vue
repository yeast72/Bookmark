<template>
  <li class="bookmark-item" v-bind:class="{'is-complete':bookmark.completed}">
    <div class="bookmark-detail">
      <a v-bind:href="bookmark.url" target="_blank">{{bookmark.title}}</a>
    </div>
    <div class="bookmark-container-button">
      <font-awesome-icon
        class="bookitem-button"
        id="check-button"
        :icon="['fas','check']"
        size="xs"
        @click="markComplete"
      />
      <font-awesome-icon
        class="bookitem-button"
        id="edit-button"
        :icon="['far', 'edit']"
        size="xs"
        @click="editBookmark($event, bookmark)"
      />
      <font-awesome-icon
        class="bookitem-button"
        id="trash-button"
        :icon="['far', 'trash-alt']"
        size="xs"
        @click="deleteBookmarkInFolder({ folderId: folderId, bookId: bookmark._id})"
      />
      <font-awesome-icon
        class="bookitem-button"
        id="star-button"
        :icon="['far', 'star']"
        size="xs"
        v-bind:class="{active: isStared}"
        @click="starBookmark"
      />
    </div>
    <Modal ref="modal">
      <h1 slot="header">Edit bookmark</h1>
      <div slot="body">
        <p>Title</p>
        <input type="text" v-model="bookmark.title" placeholder="Name">
        <p>URL</p>
        <input type="text" v-model="bookmark.url" placeholder="URL">
      </div>
      <template slot="button">
        <button @click="doneEdit(bookmark)">Save</button>
        <button @click="cancelEdit(bookmark)">Cancel</button>
      </template>
    </Modal>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "./Modal/Modal";
export default {
  props: ["bookmark", "folderId"],
  components: { Modal },
  data() {
    return { stared: false, editedBookmark: null };
  },
  computed: {
    isStared() {
      return this.stared;
    }
  },
  methods: {
    ...mapActions(["deleteBookmarkInFolder", "editBookmarkInFolder"]),
    markComplete() {
      this.bookmark.completed = !this.bookmark.completed;
    },
    starBookmark() {
      this.stared = !this.stared;
    },
    editBookmark(evt, bookmark) {
      this.$refs.modal.openModal(evt);
      this.beforeEditCache = { ...bookmark };
      this.editedBookmark = bookmark;
    },
    doneEdit(bookmark) {
      if (!this.editedBookmark) {
        return;
      }
      this.editBookmarkInFolder({
        folderId: this.folderId,
        updBookmark: bookmark
      });
      this.$refs.modal.closeModal();
    },
    cancelEdit(bookmark) {
      this.editedBookmark = null;
      bookmark.title = this.beforeEditCache.title;
      bookmark.url = this.beforeEditCache.url;
      this.$refs.modal.closeModal();
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
.bookmark-item {
  border: 1px solid #979797;
  border-radius: 5px;
  background-color: white;
  padding: 5px;
  cursor: pointer;
}

.bookmark-item:hover .bookitem-button {
  visibility: visible;
}

.bookmark-detail {
  flex: 2;
}
.bookmark-container-button {
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

.bookmark-item {
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


