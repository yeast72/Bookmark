<template>
  <div class="app" v-if="rootFolder">
    <FolderTree
      @show-bookmark="showBookmark"
      @delete-folder="deleteFolderHandler"
      :selectedFolderId="currentFolder._id"
      :rootFolder="rootFolder"
      class="folder-container"
    ></FolderTree>
    <div class="bookmarklist-container">
      <div class="button-container">
        <h1>{{ currentFolder.name }}</h1>
        <button @click="openAddBookmarkModal">Add bookmark</button>
        <button @click="openAddFolderModal">Add Folder</button>
      </div>
      <BookmarkList
        :bookmarks="currentFolder.bookmarksId"
        @remove-bookmark-child="removeBookmarkChild({folderId: currentFolder._id, bookmarkId: $event})"
      ></BookmarkList>
    </div>
    <NewBookmarkModal
      :show="showNewBookmarkModal"
      @add-bookmark="addBookmark($event, currentFolder._id)"
      @close-modal="showNewBookmarkModal = false"
    ></NewBookmarkModal>
    <NewFolderModal
      :show="showNewFolderModal"
      @add-folder="addNewFolder($event, currentFolder._id)"
      @close-modal="showNewFolderModal = false"
    ></NewFolderModal>
  </div>
  <div class="app" v-else>
    <h1>Loading....</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewBookmarkModal from "./Modal/NewBookmarkModal";
import NewFolderModal from "./Modal/NewFolderModal";
import FolderTree from "./Folder/FolderTree";
import BookmarkList from "./Bookmark/BookmarkList";
import { deleteFolder as DELETE_FOLDER_API } from "../../api/folder_api";

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
    NewBookmarkModal,
    NewFolderModal,
    BookmarkList
  },
  computed: {
    ...mapGetters([
      "getFolderById",
      "getRootFolderId",
      "getAllFolders",
      "getBookmarksLength",
      "getParentFolderById"
    ]),
    currentFolder() {
      return this.selectedFolderId === ""
        ? this.rootFolder
        : this.getFolderById(this.selectedFolderId);
    },
    rootFolder() {
      return this.getFolderById(this.getRootFolderId);
    }
  },
  mounted() {
    this.fetchBookmarks();
    this.fetchFolders();
    this.fetchUser("yeast");
  },
  methods: {
    ...mapActions([
      "fetchBookmarks",
      "fetchUser",
      "deleteBook",
      "fetchFolders",
      "addFolder",
      "addBookmarkToFolder",
      "removeBookmarkChild",
      "updateFolder",
      "deleteFolder"
    ]),
    openAddFolderModal() {
      this.showNewFolderModal = true;
    },

    openAddBookmarkModal() {
      this.showNewBookmarkModal = true;
    },

    showBookmark(selectedFolderId) {
      this.selectedFolderId = selectedFolderId;
    },

    async addNewFolder(newFolder, folderId) {
      await this.addFolder({ folder: newFolder, parentId: folderId });
      this.updateFolderToServer();
    },

    updateFolderToServer() {
      this.updateFolder({
        folderId: this.currentFolder._id,
        folder: this.currentFolder
      });
    },

    async addBookmark(newBookmark, folderId) {
      const bookmark = {
        ...newBookmark,
        _id: this.getBookmarksLength
      };
      await this.addBookmarkToFolder({
        bookmark: bookmark,
        folderId: folderId
      });
      this.updateFolderToServer();
    },
    async deleteFolderHandler(folderId) {
      const parentId = this.getParentFolderById(folderId);
      this.deleteFolder(folderId);
      await DELETE_FOLDER_API(folderId);
      // await this.loadData();
      this.selectedFolderId = parentId;
    },
    loadData() {
      this.fetchUser("yeast");
      this.fetchFolders();
      this.fetchBookmarks();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
  display: flex;
  flex-direction: row;
  background-color: antiquewhite;
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
