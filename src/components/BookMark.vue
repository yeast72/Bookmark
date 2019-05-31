<template>
  <div class="app">
    <div v-bind:key="folder.id" v-for="folder in allFolders">
      <BookFolder v-bind:folder="folder"/>
      <BookFolder v-bind:folder="folder"/>
      <BookFolder v-bind:folder="folder"/>
      <BookFolder v-bind:folder="folder"/>
    </div>

    <!-- <div v-bind:key="book._id" v-for="book in allBooks">
      <BookItem v-bind:book="book"/>
      <button @click="deleteBook(book._id)" class="del">x</button>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BookItem from "./BookItem.vue";
import BookFolder from "./BookFolder.vue";

export default {
  name: "BookMark",
  components: { BookItem, BookFolder },
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
h3 {
  margin: 40px 0 0;
}
.del {
  background: #f54646;
  border-radius: 30px;
  width: 20px;
}
.app {
  display: block;
}
</style>
