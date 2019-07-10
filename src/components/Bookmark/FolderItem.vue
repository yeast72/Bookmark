<template>
  <div>
    <font-awesome-icon
      class="foldernode-button"
      id="check-button"
      :icon="['far','folder']"
      size="xs"
    />
    <span class="folder-name">{{ folder.name }}</span>
    {{ this.folder.name }}
  </div>
</template>

<script>
export default {
  props: {
    folder: Object
  }
};
</script>