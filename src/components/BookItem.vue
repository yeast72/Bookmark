<template>
  <li class="bookmark-item" v-bind:class="{'is-complete':bookmark.completed}">
    <div class="bookmark-detail">
      <a v-bind:href="bookmark.url" target="_blank">{{bookmark.title}}</a>
    </div>
    <div class="bookmark-button">
      <font-awesome-icon id="check-button" :icon="['fas','check']" size="xs" @click="markComplete"/>
    </div>
  </li>
</template>

<script>
export default {
  name: "BookItem",
  props: ["bookmark"],
  methods: {
    markComplete() {
      this.bookmark.completed = !this.bookmark.completed;
    },
    deleteBook(bookId) {
      this.deleteBook(bookId);
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
li {
  display: flex;
}
.is-complete {
  text-decoration: line-through;
}
.bookmark-item {
  border: 1px solid #979797;
  border-radius: 5px;
  background-color: white;
  padding: 5px;
  cursor: pointer;
}

.bookmark-item:hover #check-button {
  visibility: visible;
}

.bookmark-detail {
  flex: 2;
}
.bookmark-button {
  flex: 1;
  text-align: right;
  padding-right: 1em;
}

#check-button {
  background-clip: padding-box;
  background-origin: padding-box;
  visibility: hidden;
  border-radius: 3px;
  padding: 5px;
  opacity: 0.6;
  font-size: 20px;
}

#check-button:hover {
  background-color: #f4f5f7;
  opacity: 1;
}
</style>


