<template>
  <Modal :show="show" @close-modal="close">
    <div class="modal-header">
      <h3>New Folder</h3>
    </div>

    <div class="modal-body">
      <label class="form-label">
        Name
        <input type="text" v-model="name" placeholder="New bookmark title...">
        <span v-if="nameError" class="error-validation">Error</span>
      </label>
    </div>

    <div class="modal-footer text-right">
      <button
        class="modal-default-button"
        @click="save({name: name, bookmarksId: [], _id: '321321312312', childFolderId: []})"
      >Save</button>
      <button class="modal-default-button" @click="close">Cancel</button>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";
export default {
  components: { Modal },
  data() {
    return {
      name: "",
      nameError: false
    };
  },
  computed: {
    haveError() {
      return this.nameError;
    }
  },
  props: {
    show: Boolean
  },
  methods: {
    checkForm() {
      this.nameError = false;
      if (!this.name) {
        this.nameError = true;
      }
    },
    close() {
      this.$emit("close-modal");
      this.name = "";
    },
    save(folder) {
      this.checkForm();
      if (!this.haveError) {
        this.$emit("add-folder", folder);
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