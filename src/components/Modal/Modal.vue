<template>
  <div class="modal" id="myModal" ref="modal" v-if="isVisible" @click="onModalClick($event)">
    <div class="modal-content">
      <slot @onClickCancalHandler="onModalClick"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      opened: false
    };
  },
  computed: {
    isVisible() {
      return this.opened;
    }
  },
  methods: {
    open(event) {
      this.opened = true;
    },
    closeModal() {
      console.log("Okay");
      this.opened = false;
    },
    onModalClick(event) {
      if (event.target == this.$refs.modal) {
        this.opened = false;
      }
    }
  }
};
</script>

<style scoped>
.modal {
  /* display: none; Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
