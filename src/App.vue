<template>
  <div id="app" class="app-container">
    <Header class="header-container"/>
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

.header-container {
  display: flex;
  position: relative;
}

.bookmarks-container {
  display: flex;
  height: 100%;
  position: relative;
}

.app-container {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  -webkit-align-content: stretch;
  align-content: stretch;
}
html,
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  height: 100%;
  margin: 0;
}
</style>
