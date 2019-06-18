<template>
  <Modal :show="show" @close-modal="close">
    <div class="modal-header">
      <h3>New Folder</h3>
    </div>

    <div class="modal-body">
      <label class="form-label">
        Name
        <input type="text" v-model="folder.name" placeholder="New bookmark title...">
      </label>
    </div>

    <div class="modal-footer text-right">
      <button class="modal-default-button" @click="save({name:folder.name,...folder})">Save</button>
      <button class="modal-default-button" @click="close">Cancel</button>
    </div>
  </Modal>
</template>

<script>
import Modal from "./Modal";
export default {
  components: { Modal },
  props: {
    show: Boolean,
    folder: Object
  },
  methods: {
    close() {
      this.$emit("close-modal");
    },
    save(folder) {
      this.$emit("edit-folder", folder);
      this.close();
    }
  }
};
</script>