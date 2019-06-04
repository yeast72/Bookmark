<template>
  <div class="app" @contextmenu.prevent="$refs.menu.open($event)">
    <div v-bind:key="folder.id" v-for="folder in allFolders">
      <BookFolder v-bind:folder="folder"/>
    </div>
    <div>
      <ContextMenu ref="menu">
        <ContextMenuItem @click.native="$refs.menu.menuAction('ADD_BOOK')">Add Bookmark</ContextMenuItem>
        <ContextMenuItem @click.native="$refs.menu.menuAction('ADD_FOLDER')">Add Folder</ContextMenuItem>
      </ContextMenu>
    </div>
    <!-- <div v-bind:key="book._id" v-for="book in allBooks">
      <BookItem v-bind:book="book"/>
      <button @click="deleteBook(book._id)" class="del">x</button>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BookFolder from "./BookFolder.vue";
import ContextMenu from "./ContextMenu/ContextMenu";
import ContextMenuItem from "./ContextMenu/ContextMenuItem";

export default {
  name: "BookMark",
  data() {
    return {};
  },
  components: { BookFolder, ContextMenu, ContextMenuItem },
  computed: {
    ...mapGetters(["allBooks", "allFolders"])
  },
  methods: {
    ...mapActions(["fetchBooks", "deleteBook", "fetchFolders"])
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
  background-color: rgb(175, 130, 47);
  padding: 20px 10px;
}
</style>
