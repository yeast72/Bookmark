<template>
  <div>
    <h1>Folders</h1>
    <div :key="folder._id" v-for="folder in folders">
      <FolderTree class="folder" @selected-folder="showBookmark($event)" :folder="folder"></FolderTree>
    </div>
  </div>
</template>

<script>
import FolderTree from "./FolderTree";
export default {
  props: {
    folders: Array
  },
  components: { FolderTree },
  methods: {
    showBookmark(selectedFolderId) {
      this.$emit("show-bookmark", selectedFolderId);
    }
  }
};
</script>

<style scoped>
.folder {
  cursor: pointer;
  user-select: none;
}
</style>
