<template>
  <div class="app" @contextmenu.prevent="$refs.menu.open($event)">
    <FolderTree @show-bookmark="showBookmark" :rootFolder="getRootFolder" class="folder-container"></FolderTree>
    <div class="bookmarklist-container">
      <h1>BookmarkList</h1>
      <div class="button-container">
        <button @click="openAddBookmarkModal">Add bookmark</button>
        <button @click="openAddFolderModal">Add Folder</button>
      </div>

      <BookmarkList :bookmarks="currentFolder.bookmarks"></BookmarkList>
    </div>

    <!-- <div v-bind:key="folder.id" v-for="folder in allFolders">
      <BookFolder v-bind:folder="folder"/>
    </div>-->
    <div>
      <ContextMenu ref="menu">
        <ContextMenuItem @click.native="$refs.menu.menuAction('ADD_BOOK')">Add Bookmark</ContextMenuItem>
        <ContextMenuItem @click.native="$refs.menu.menuAction('ADD_FOLDER')">Add Folder</ContextMenuItem>
      </ContextMenu>
    </div>
    <NewBookmarkModal :show="showNewBookmarkModal" @close-modal="showNewBookmarkModal = false"></NewBookmarkModal>
    <NewFolderModal
      :show="showNewFolderModal"
      @add-folder="addNewFolder($event, currentFolder._id)"
      @close-modal="showNewFolderModal = false"
    ></NewFolderModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ContextMenu from "./ContextMenu/ContextMenu";
import ContextMenuItem from "./ContextMenu/ContextMenuItem";
import NewBookmarkModal from "./Modal/NewBookmarkModal";
import NewFolderModal from "./Modal/NewFolderModal";
import FolderTree from "./Folder/FolderTree";
import BookmarkList from "./BookmarkList";

export default {
  name: "BookMark",
  data() {
    return {
      showNewBookmarkModal: false,
      showNewFolderModal: false,
      selectedFolderId: ""
    };
  },
  components: {
    FolderTree,
    ContextMenu,
    ContextMenuItem,
    NewBookmarkModal,
    NewFolderModal,
    BookmarkList
  },
  computed: {
    ...mapGetters(["getFolderById", "getRootFolder", "getAllFolders"]),
    currentFolder() {
      return this.selectedFolderId === ""
        ? this.getRootFolder
        : this.selectedFolderId;
    }
  },
  methods: {
    ...mapActions([
      "fetchBooks",
      "deleteBook",
      "fetchFolders",
      "addFolder",
      "createFolder"
    ]),
    openAddFolderModal() {
      this.showNewFolderModal = true;
    },
    openAddBookmarkModal() {
      this.showNewBookmarkModal = true;
    },
    showBookmark(selectedFolderId) {
      this.selectedFolderId = this.getFolderById(selectedFolderId);
    },
    addNewFolder(newFolder, folderId) {
      let newFolderId = Object.keys(this.getAllFolders).length;
      const folder = {
        ...newFolder,
        _id: newFolderId
      };

      this.createFolder(folder);
      console.log("folderId from bookmarks components: " + folderId);
      this.addFolder({ folderId: newFolderId, parentId: folderId });
    }
  },
  created() {
    this.fetchBooks();
    this.fetchFolders();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
  display: flex;
  flex-direction: row;
  background-color: rgb(175, 130, 47);
  padding: 20px 10px;
}
.folder-container {
  display: flex;
  flex-direction: column;
  flex: 2;
}
.bookmarklist-container {
  display: flex;
  flex-direction: column;
  flex: 3;
}
</style>
