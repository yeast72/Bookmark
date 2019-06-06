<template>
  <Modal :show="show" @close-modal="close">
    <div class="modal-header">
      <h3>New Bookmark</h3>
    </div>

    <div class="modal-body">
      <label class="form-label">
        Title
        <input type="text" placeholder="New bookmark title...">
      </label>
      <label class="form-label">
        URL
        <input type="text" placeholder="New bookmark URL">
      </label>
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
      url: ""
    };
  },
  props: ["show"],
  methods: {
    close() {
      this.$emit("close-modal");
      this.title = "";
      this.url = "";
    },
    save() {}
  }
};
</script>