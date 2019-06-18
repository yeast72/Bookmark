<template>
  <div>
    <ul>
      <FolderNode
        class="folder"
        :key="rootFolder._id"
        :selectedFolderId="selectedFolderId"
        @selected-folder="showBookmark($event)"
        :isRoot="true"
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
    rootFolder: Object,
    selectedFolderId: String
  },
  data() {
    return { editedFolder: null };
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
