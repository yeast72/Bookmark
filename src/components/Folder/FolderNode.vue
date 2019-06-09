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
      <FolderNode
        class="folder"
        @selected-folder="$emit('selected-folder',$event)"
        v-for="(id, index) in folder.childFolderId"
        :key="index"
        :folder="getFolderById(id)"
      ></FolderNode>
      <!-- <li class="add" @click="$emit('add-item', folder)">+</li> -->
    </ul>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FolderNode",
  props: {
    folder: Object
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    ...mapGetters(["getFolderById"]),
    isFolder() {
      return this.folder.childFolderId && this.folder.childFolderId.length;
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
