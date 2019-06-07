<template>
  <div id="app">
    <Header/>
    <Bookmarks class="bookmarks-container"/>
  </div>
</template>

<script>
import Bookmarks from "./components/Bookmarks";
import Header from "./components/layout/Header";

export default {
  name: "app",
  components: {
    Bookmarks,
    Header
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.bookmarks-container {
  height: 100%;
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
