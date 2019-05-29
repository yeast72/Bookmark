<template>
  <div id="app">
    <Header/>
    <BookMark/>
  </div>
</template>

<script>
import BookMark from "./components/BookMark";
import Header from "./components/layout/Header";
import AddBook from "./components/AddBook";

export default {
  name: "app",
  components: {
    BookMark,
    Header,
    AddBook
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
</style>
