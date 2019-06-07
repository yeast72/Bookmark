<template>
  <li>
    <div :class="{bold: isFolder}" @click="selectedFolder" @dblclick.prevent="toggle">
      {{ folder.name }}
      <span
        v-if="isFolder"
        @click.stop="toggle"
        class="toggle-button"
      >[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <FolderTree
        class="folder"
        @selected-folder="$emit('selected-folder',$event)"
        v-for="(child, index) in folder.children"
        :key="index"
        :folder="child"
      ></FolderTree>
      <!-- <li class="add" @click="$emit('add-item', folder)">+</li> -->
    </ul>
  </li>
</template>

<script>
export default {
  name: "FolderTree",
  props: {
    folder: Object
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    isFolder() {
      return this.folder.children && this.folder.children.length;
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder() {
      if (!this.isFolder) {
        this.$emit("make-folder", this.folder);
        this.isOpen = true;
      }
    },
    selectedFolder() {
      this.$emit("selected-folder", this.folder._id);
    }
  }
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
.toggle-button {
  cursor: pointer;
}
</style>
