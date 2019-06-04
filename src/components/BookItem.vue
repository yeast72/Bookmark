<template>
  <li class="bookmark-item" v-bind:class="{'is-complete':bookmark.completed}">
    <div class="bookmark-detail">
      <a v-bind:href="bookmark.url" target="_blank">{{bookmark.title}}</a>
    </div>
    <div class="bookmark-container-button">
      <font-awesome-icon
        class="bookitem-button"
        id="check-button"
        :icon="['fas','check']"
        size="xs"
        @click="markComplete"
      />
      <font-awesome-icon
        class="bookitem-button"
        id="edit-button"
        :icon="['far', 'edit']"
        size="xs"
        @click="$refs.modal.open($event)"
      />
      <font-awesome-icon
        class="bookitem-button"
        id="trash-button"
        :icon="['far', 'trash-alt']"
        size="xs"
        @click="$emit('deleteBookmarkInFolder', bookmark._id)"
      />
      <font-awesome-icon
        class="bookitem-button"
        id="star-button"
        :icon="['far', 'star']"
        size="xs"
        v-bind:class="{active: isStared}"
        @click="starBookmark"
      />
    </div>
    <Modal ref="modal">
      <EditModal v-bind:bookmark="bookmark"></EditModal>
    </Modal>
  </li>
</template>

<script>
import Modal from "../components/Modal/Modal";
import EditModal from "../components/Modal/EditModal";

export default {
  name: "BookItem",
  props: ["bookmark"],
  components: { Modal, EditModal },
  data() {
    return { stared: false };
  },
  computed: {
    isStared() {
      return this.stared;
    }
  },
  methods: {
    onClickEditButton() {},
    markComplete() {
      this.bookmark.completed = !this.bookmark.completed;
    },
    deleteBook(bookId) {
      this.deleteBook(bookId);
    },
    starBookmark() {
      this.stared = !this.stared;
      console.log(this.stared);
    }
  }
};
</script>

<style lang="scss" scoped>
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

.bookmark-item:hover .bookitem-button {
  visibility: visible;
}

.bookmark-detail {
  flex: 2;
}
.bookmark-container-button {
  flex: 1;
  text-align: right;
  padding-right: 1em;
}

.bookitem-button {
  background-clip: padding-box;
  background-origin: padding-box;
  visibility: hidden;
  border-radius: 3px;
  padding: 5px;
  opacity: 0.6;
  font-size: 20px;
}

.bookmark-item {
  &:hover {
    opacity: 1;
  }
  .active {
    visibility: visible;
    opacity: 1;
  }
}

#check-button:hover {
  background-color: #f4f5f7;
  opacity: 1;
}

#edit-button:hover {
  background-color: #f4f5f7;
  opacity: 1;
}

#trash-button:hover {
  background-color: #f4f5f7;
  opacity: 1;
}

#star-button {
  &:hover {
    background-color: #f4f5f7;
    opacity: 1;
  }
  &.active {
    color: rgb(219, 223, 28);
  }
}
</style>


