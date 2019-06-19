<template>
  <li>
    <div class="folder-container" :class="{active: isSelected}">
      <div class="folder-name-container" @click="selectedFolder" @dblclick.prevent="toggle">
        <font-awesome-icon
          v-if="isFolder"
          @click.stop="toggle"
          class="foldernode-button"
          :rotation="rotationValue"
          :icon="['fas','caret-down']"
          size="xs"
          :class="{active: isOpen}"
        />
        <font-awesome-icon
          class="foldernode-button"
          id="check-button"
          :icon="['far','folder']"
          size="xs"
        />
        <span class="folder-name">{{ folder.name }}</span>
      </div>
      <div v-if="!isRoot" class="folder-button-container">
        <font-awesome-icon
          title="delete folder"
          class="foldernode-button"
          id="trash-button"
          :icon="['far', 'trash-alt']"
          size="xs"
          @click="deleteFolderHandle(folder._id)"
        />
        <font-awesome-icon
          title="rename"
          class="foldernode-button"
          id="edit-button"
          :icon="['far', 'edit']"
          size="xs"
          @click="editFolderHandle(folder)"
        />
      </div>
    </div>

    <ul v-show="isOpen" v-if="isFolder">
      <FolderNode
        class="folder"
        :selectedFolderId="selectedFolderId"
        @delete-folder="$emit('delete-folder', $event)"
        @selected-folder="$emit('selected-folder',$event)"
        v-for="(id) in folder.childFolderId"
        :key="id"
        :folder="getFolderById(id)"
      ></FolderNode>
    </ul>
    <EditFolderModal
      @close-modal="cancelEdit(folder)"
      @edit-folder="doneEdit($event)"
      :show="showEditFolderModal"
      :folder="folder"
    ></EditFolderModal>
  </li>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EditFolderModal from "../Modal/EditFolderModal";

export default {
  name: "FolderNode",
  components: { EditFolderModal },
  props: {
    folder: Object,
    selectedFolderId: String,
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showEditFolderModal: false,
      isOpen: false
    };
  },
  computed: {
    ...mapGetters(["getFolderById"]),
    isFolder() {
      return this.folder.childFolderId && this.folder.childFolderId.length;
    },
    rotationValue() {
      return this.isOpen ? null : "270";
    },
    isSelected() {
      return this.folder._id.toString() === this.selectedFolderId.toString();
    }
  },
  methods: {
    ...mapActions(["updateFolder"]),
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
    },
    deleteFolderHandle(folderId) {
      this.$emit("delete-folder", folderId);
    },
    editFolderHandle(folder) {
      this.showEditFolderModal = true;
      this.beforeEditCache = { ...folder };
      this.editedFolder = folder;
    },
    cancelEdit(folder) {
      this.editedFolder = null;
      folder.name = this.beforeEditCache.name;
      this.showEditFolderModal = false;
    },
    doneEdit(folder) {
      if (!this.editedFolder) {
        return;
      }
      console.log(folder);
      this.updateFolder({
        folderId: this.folder._id,
        folder: folder
      });
      this.showEditFolderModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.folder-container {
  display: flex;
  &.active {
    background-color: rgb(197, 197, 255);
  }
}
.folder-name-container {
  flex: 1;
  & .folder-name {
    font-weight: bold;
  }
}
.folder-button-container {
  flex: 1;
  opacity: 0.8;
}

.foldernode-button {
  padding: 0 0.5em;
  font-size: 20px;
  opacity: 0.8;
}

li {
  list-style-type: none;
  padding-left: 1em;
  margin-left: 0.5em;
}
ul {
  padding-left: 1em;
  margin-left: 0.5em;
}
</style>
