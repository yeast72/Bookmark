<template>
  <div id="app">
    <Header/>
    <BookMark/>
  </div>
</template>

<script>
import BookMark from "./components/BookMark";
import Header from "./components/layout/Header";

export default {
  name: "app",
  components: {
    BookMark,
    Header
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  display: block;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  width: 100%;
  height: 100%;
}
</style>
