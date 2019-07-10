<template>
  <Modal :show="show" @close-modal="close">
    <div class="modal-header">
      <h3>New Bookmark</h3>
    </div>

    <div class="modal-body">
      <div class="form-label">
        Title :
        <input
          type="text"
          v-model="bookmark.title"
          placeholder="New bookmark title..."
          @keyup.enter="saveBookmark(bookmark.title,bookmark.url)"
        >
        <span v-if="titleError" class="error-validation">Invalid title</span>
      </div>
      <div class="form-label">
        URL :
        <input
          type="text"
          v-model="bookmark.url"
          placeholder="New bookmark URL"
          @keyup.enter="saveBookmark(bookmark.title,bookmark.url)"
        >
        <span v-if="urlError" class="error-validation">Invalid URL</span>
      </div>
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
      titleError: false,
      urlError: false
    };
  },
  props: {
    show: Boolean,
    bookmark: Object
  },
  computed: {
    haveError() {
      return this.titleError || this.urlError;
    }
  },
  methods: {
    checkForm() {
      this.titleError = false;
      this.urlError = false;
      if (!this.bookmark.title) {
        this.titleError = true;
      }
      if (!this.bookmark.url) {
        this.urlError = true;
      }
    },
    close() {
      this.titleError = false;
      this.urlError = false;
      this.$emit("close-modal");
    },
    saveBookmark(newTitle, newURL) {
      this.checkForm();
      if (!this.haveError) {
        if (!newURL.includes("http://") && !newURL.includes("https://")) {
          newURL = `http://${newURL}`;
        }
        const newBook = { ...this.bookmark, title: newTitle, url: newURL };
        this.$emit("edit-bookmark", newBook);
        this.close();
      }
    }
  }
};
</script>

<style scoped>
.error-validation {
  color: red;
}
</style>
