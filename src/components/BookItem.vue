<template>
  <div class="book-item" v-bind:class="{'is-complete':book.completed}">
    <p>
      <input type="checkbox" v-on:change="markComplete">
      <a v-bind:href="book.url" target="_blank">{{book.title}}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "BookItem",
  props: ["book"],
  methods: {
    markComplete() {
      this.book.completed = !this.book.completed;
    },
    deleteBook(bookId) {
      this.deleteBook(bookId);
    }
  }
};
</script>

<style scoped>
.book-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}

.is-complete {
  text-decoration: line-through;
}
</style>


