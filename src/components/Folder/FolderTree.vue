<template>
  <div>
    <h1>Folders</h1>
    <ul>
      <FolderNode
        class="folder"
        :key="rootFolder._id"
        @selected-folder="showBookmark($event)"
        :folder="rootFolder"
      ></FolderNode>
    </ul>
    <!-- <div :key="folder._id" v-for="folder in rootFolder.childFolderId"></div> -->
  </div>
</template>

<script>
import FolderNode from "./FolderNode";
export default {
  props: {
    rootFolder: Object
  },
  components: { FolderNode },
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
