<template>
  <transition name="modal">
    <div class="modal-mask" v-if="isShow" @click="shake">
      <div class="modal-container" :class="{shake: animation}" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";

export default {
  props: ["show"],
  data() {
    return {
      animation: false
    };
  },
  computed: {
    isShow() {
      return this.show;
    }
  },
  methods: {
    async shake() {
      if (this.animation) {
        this.animation = false;
        await Vue.nextTick();
      }
      this.animation = true;
      // this.animation = null;
    },
    close() {
      this.animation = false;
      this.$emit("close-modal");
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (this.isShow && e.keyCode == 27) {
        this.close();
      }
    });
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  min-width: 300px;
  max-width: 500px;
  margin: 40px auto 0;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.text-right {
  text-align: right;
}

.form-label {
  display: block;
  margin-bottom: 1em;
}

.form-label > .form-control {
  margin-top: 0.5em;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5em 1em;
  line-height: 1.5;
  border: 1px solid #ddd;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.shake {
  animation: shake 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10% {
    transform: translate3d(-1px, 0, 0);
  }

  35% {
    transform: translate3d(2px, 0, 0);
  }

  75% {
    transform: translate3d(-4px, 0, 0);
  }

  90% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
