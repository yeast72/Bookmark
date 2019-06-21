<template>
  <Modal :show="show" @close-modal="close">
    <div class="modal-header">
      <h3>New Bookmark</h3>
    </div>

    <div class="modal-body">
      <div>
        Title:
        <input type="text" v-model="title" placeholder="New bookmark title...">
        <span v-if="titleError" class="error-validation">Error</span>
      </div>
      <div>
        URL:
        <input type="text" v-model="url" placeholder="New bookmark URL">
        <span v-if="urlError" class="error-validation">Error</span>
      </div>
    </div>

    <div class="modal-footer text-right">
      <button class="modal-default-button" @click="save">Save</button>
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
    save() {
      this.checkForm();
      if (!this.haveError) {
        let newBookmark = {
          title: this.title,
          url: this.url,
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