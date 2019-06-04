<template>
  <div
    v-on-clickaway="close"
    ref="menuContext"
    class="context-menu"
    v-show="isVisible"
    v-bind:style="{top:top, left:left}"
  >
    <ul>
      <slot/>
    </ul>
  </div>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";
import Vue from "vue";

export default {
  name: "ContextMenu",
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      opened: false,
      contextData: {},
      top: "0px",
      left: "0px"
    };
  },
  computed: {
    isVisible() {
      return this.opened;
    }
  },
  methods: {
    setMenu(top, left) {
      let largestHeight =
        window.innerHeight - this.$refs.menuContext.offsetHeight - 25;
      let largestWidth =
        window.innerWidth - this.$refs.menuContext.offsetWidth - 25;

      if (top > largestHeight) top = largestHeight;

      if (left > largestWidth) left = largestWidth;

      this.top = top + "px";
      this.left = left + "px";
    },
    open(evt) {
      this.opened = true;
      Vue.nextTick(
        function() {
          this.$refs.menuContext.focus();
          this.setMenu(evt.y, evt.x);
        }.bind(this)
      );
      evt.stopPropagation();
      evt.preventDefault();
    },
    close() {
      this.opened = false;
      this.contextData = null;
    },
    menuAction(menuType) {
      this.opened = false;
      switch (menuType) {
        case "ADD_BOOK":
          console.log("ADD_BOOK");
          break;
        case "ADD_FOLDER":
          console.log("ADD_FOLDER");
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  z-index: 999;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 #eee;

  &:focus {
    outline: none;
  }

  ul {
    padding: 0px;
    margin: 0px;
  }
}
</style>
