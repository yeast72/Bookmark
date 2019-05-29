<template>
  <div class="dropdown">
    <div class="dropdown-header" v-bind:class="{ active: isActive }" v-on:click="onClickHandle">
      <div class="dropdown-title">{{folder.name}}</div>
      <div class="dropdown-button">
        <font-awesome-icon icon="caret-down"/>
      </div>
    </div>

    <div class="dropdown-list">
      <div v-bind:key="bookmark.id" v-for="bookmark in folder.bookmarks">
        <ul v-bind:style="{maxHeight:listsHeight}">
          <BookItem v-bind:bookmark="bookmark"></BookItem>
        </ul>
      </div>
    </div>
    <AddBook></AddBook>
  </div>
</template>

<script>
import BookItem from "./BookItem";
import AddBook from "./AddBook";

export default {
  name: "BookFolder",
  props: ["folder"],
  components: { BookItem, AddBook },
  data() {
    return {
      boomarks: "",
      isActive: false,
      listsHeight: 0,
      listHeight: 40
    };
  },
  methods: {
    onClickHandle() {
      this.isActive = !this.isActive;
      this.listsHeight = this.isActive ? 4 * this.listHeight + "px" : 0 + "px";
    }
  }
};
</script>

<style scoped>
h1 {
  color: aqua;
}
.dropdown {
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  border: 1px whitesmoke solid;
  width: 50ch;
  border-radius: 10px;
  background-color: wheat;
}

.dropdown-header {
  display: flex;
  cursor: pointer;
  flex-direction: row;
  padding: 10px;
}

.dropdown-title {
  flex: 2;
}

.dropdown-button {
  flex: 1;
  text-align: right;
}

.dropdown-list {
  display: flex;
  flex-direction: column;
}

ul {
  max-height: 0;
  overflow: hidden;
  margin: 5px 10px;
  transition: max-height 0.2s ease-out;
}
</style>
