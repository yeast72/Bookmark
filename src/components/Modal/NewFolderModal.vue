<template >
  <Modal :show="show" @close-modal="close">
    <div class="modal-header">
      <h3>New Folder</h3>
    </div>

    <div class="modal-body">
      <label class="form-label">
        Name
        <input
          type="text"
          v-model="name"
          placeholder="New bookmark title..."
          @keyup.enter="saveFolder(name)"
        >
        <span v-if="nameError" class="error-validation">Invalid name</span>
      </label>
    </div>

    <div class="modal-footer text-right">
      <button class="modal-default-button" @click="saveFolder(name)">Save</button>
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
    saveFolder(newName) {
      this.checkForm();
      if (!this.haveError) {
        this.$emit("add-folder", { name: newName });
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