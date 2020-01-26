<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">
      <font-awesome-icon
        v-if="icon"
        :icon="icon"
      />
      <slot />
    </h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group mr-2">
        <slot name="toolbar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseContentTitle',
  props: {
    icon: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
