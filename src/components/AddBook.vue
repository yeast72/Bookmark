<template>
  <div>
    <form @submit="onSubmit">
      <input v-model="title" type="text" name="title" placeholder="Add bookmark title...">
      <input v-model="url" type="text" name="url" placeholder="Add bookmark url...">
      <input type="submit" value="Submit" class="btn">
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddBook",
  props: ["folderId"],
  data() {
    return {
      title: "",
      url: ""
    };
  },
  methods: {
    ...mapActions(["addBookmarkToFolder"]),

    onSubmit(e) {
      e.preventDefault();
      const newBook = {
        _id: 3,
        title: this.title,
        url: this.url,
        completed: false
      };
      this.addBookmarkToFolder({ folderId: this.folderId, book: newBook });
      this.title = "";
      this.url = "";
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
}

.btn {
  border-block: 1px solid #4b4b4b;
  font: #fff9f9;
}
</style>
