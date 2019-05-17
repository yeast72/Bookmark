<template>
  <div class="hello">
    <h1>Bookmark</h1>
    <div v-bind:key="book._id" v-for="book in allBooks">
      <BookItem v-bind:book="book"/>
      <button @click="deleteBook(book._id)" class="del">x</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BookItem from "./BookItem.vue";

export default {
  name: "BookMark",
  components: { BookItem },
  props: ["books"],
  computed: {
    ...mapGetters(["allBooks"])
  },
  methods: {
    ...mapActions(["fetchBooks", "deleteBook"])
  },
  created() {
    this.fetchBooks();
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
</style>
