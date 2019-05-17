<template>
  <div>
    <form @submit="onSubmit">
      <input v-model="title" type="text" name="name" placeholder="Add book...">
      <input type="submit" value="Submit" class="btn">
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddBook",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapActions(["addBook"]),
    onSubmit(e) {
      e.preventDefault();
      const newBook = {
        title: this.title,
        url: "medium",
        completed: false
      };
      this.addBook(newBook);
      this.title = "";
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
