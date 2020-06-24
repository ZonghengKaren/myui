<template>
  <div class="dialog">
    <p @click="bindDialog">Dialog</p>
  </div>
</template>

<script>
  export default {
    name: "view-dialog",

    data() {
      return {
        list: []
      }
    },

    mounted() {},

    methods: {
      bindDialog: function(){
        this.$dialog({
          title: "提示",
          content: "这是内容",
          buttons: [
            {
              type: "default",
              label: "取消",
              onClick: null
            },
            {
              type: "primary",
              label: "确定",
              onClick: function(){
                console.log("点我干啥")
              }
            }
          ]
        })
      }
    }
  }
</script>

<style lang="less">
  .dialog {
    text-align: center;
    font-weight: bold;
    p {
      color: red;
    }
  }
</style>
