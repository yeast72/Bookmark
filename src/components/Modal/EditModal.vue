<template>
  <div class="edit-modal">
    <p>Edit</p>
    <p>Title</p>
    <input type="text" name="title" placeholder="Add title bookmarks" v-bind:value="bookmark.title">
    <p>URL</p>
    <input type="text" name="url" placeholder="Add url bookmarks" v-bind:value="bookmark.url">
    <button>Save</button>
    <button @click="$emit('onClickCancalHandler','')">Cancal</button>
  </div>
</template>

<script>
export default {
  name: "EditModal",
  props: ["bookmark"]
};
</script>

<style scoped>
</style>
