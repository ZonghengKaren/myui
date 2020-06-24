<template>
  <div :class="classes" v-on="$listeners"/>
</template>

<script>
export default {
  name: 'zh-mask',
  props: {
    // 是否透明 默认:true
    transparent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return this.transparent ? 'zh-mask_transparent' : 'zh-mask'
    }
  }
}
</script>

<style lang="less">
  .zh-mask {
    position: fixed;
    z-index: 200;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .zh-mask_transparent {
    position: fixed;
    z-index: 210;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

</style>
