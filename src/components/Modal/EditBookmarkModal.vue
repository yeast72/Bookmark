<template>
  <Modal :show="show" @close-modal="close">
    <div class="modal-header">
      <h3>New Bookmark</h3>
    </div>

    <div class="modal-body">
      <label class="form-label">
        Title
        <input type="text" v-model="bookmark.title" placeholder="New bookmark title...">
      </label>
      <label class="form-label">
        URL
        <input type="text" v-model="bookmark.url" placeholder="New bookmark URL">
      </label>
    </div>

    <div class="modal-footer text-right">
      <button class="modal-default-button" @click="saveBookmark(bookmark.title,bookmark.url)">Save</button>
      <button @click="close">Cancel</button>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";
export default {
  components: { Modal },
  data() {
    return {
      title: "",
      url: ""
    };
  },
  props: ["show", "bookmark"],
  methods: {
    close() {
      this.$emit("close-modal");
      this.title = "";
      this.url = "";
    },
    saveBookmark(newTitle, newURL) {
      const newBook = { ...this.bookmark, title: newTitle, url: newURL };
      this.$emit("edit-bookmark", newBook);
      this.close();
    }
  }
};
</script>