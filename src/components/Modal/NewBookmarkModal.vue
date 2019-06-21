<template>
  <Modal :show="show" @close-modal="close">
    <div class="modal-header">
      <h3>New Bookmark</h3>
    </div>

    <div class="modal-body">
      <div>
        Title:
        <input
          type="text"
          v-model="title"
          placeholder="New bookmark title..."
          @keyup.enter="saveBookmark(title, url)"
        >
        <span v-if="titleError" class="error-validation">Invalid title</span>
      </div>
      <div>
        URL:
        <input
          type="text"
          v-model="url"
          placeholder="New bookmark URL"
          @keyup.enter="saveBookmark(title, url)"
        >
        <span v-if="urlError" class="error-validation">Invalid URL</span>
      </div>
    </div>

    <div class="modal-footer text-right">
      <button class="modal-default-button" @click="saveBookmark(title, url)">Save</button>
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
      url: "",
      titleError: false,
      urlError: false
    };
  },
  props: {
    show: Boolean
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
      if (!this.title) {
        this.titleError = true;
      }
      if (!this.url) {
        this.urlError = true;
      }
    },
    close() {
      this.$emit("close-modal");
      this.title = "";
      this.url = "";
      this.titleError = false;
      this.urlError = false;
    },
    saveBookmark(newName, nameUrl) {
      this.checkForm();

      if (!this.haveError) {
        if (!nameUrl.includes("http://") && !nameUrl.includes("https://")) {
          nameUrl = `http://${nameUrl}`;
        }
        let newBookmark = {
          title: newName,
          url: nameUrl,
          completed: false,
          stared: false
        };
        this.$emit("add-bookmark", newBookmark);
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