<template>
  <div @touchmove.prevent>
    <zh-mask
      v-if="opacity > 0"
      :transparent="false"
      :style="{opacity}"
    />
    <div
      :class="classes"
      v-if="opacity > 0"
      :style="{opacity}"
    >
      <slot
        :title="title"
        :content="content"
        :buttons="buttons"
      >
        <div v-if="title" class="dialog__hd">
          <p class="dialog__title"><strong>{{ title }}</strong></p>
        </div>
        <div class="dialog__bd">
          <slot name="content" :content="content">
            <div v-html="content" />
          </slot>
        </div>
        <div class="dialog__ft">
          <a
            v-for="(button, index) in buttons"
            :key="index"
            href="javascript:;"
            :class="'dialog__btn dialog__btn_' + button.type"
            @click="handleClickButton(index, $event)"
          >
            {{ button.label }}
          </a>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import Animate from '../mixins/animate'
import ZhMask from '../mask'

export default {
  name: 'zh-dialog',

  mixins: [Animate],

  props: {
    visible: {
      type: Boolean,
      default: true
    },

    // 是否使用动画
    useAnimate: Boolean,

    skin: String,

    // 标题
    title: String,

    content: {
      type: String,
      default: ''
    },

    buttons: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      opacity: this.visible ? 1 : 0
    }
  },

  components: {
    'zh-mask': ZhMask
  },

  computed: {
    classes() {
      const classes = ['dialog']
      if (this.skin) {
        classes.push(`skin_${this.skin}`)
      }
      return classes
    }
  },

  watch: {
    visible(val) {
      this.toggleVisible(val)
    }
  },

  methods: {
    handleClickButton(index, event) {
      const button = this.buttons[index]

      // 回调函数返回true不往下执行
      if (button.onClick && button.onClick(event)) {
        return
      }

      // 隐藏
      this.toggleVisible(false)
    },

    toggleVisible(visible) {
      // 区分是否使用动画
      if (this.useAnimate) {
        this.startTweenFade(visible)
      } else {
        this.opacity = visible ? 1 : 0
      }
    }
  }
}
</script>

<style lang="less">
  .dialog {
    position: fixed;
    z-index: 500;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
  .dialog__hd {
    padding: 1.3em 2.5em 0.5em;
  }
  .dialog__title {
    font-weight: 400;
    font-size: 18px;
  }
  .dialog__bd {
    padding: 0 2.5em 0.8em;
    min-height: 40px;
    font-size: 15px;
    line-height: 1.6;
    word-wrap: break-word;
    word-break: break-all;
    color: #999999;
    &:first-child {
      padding: 2.7em 2.5em 1.7em;
      color:  #353535;
    }
  }
  .dialog__ft {
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: flex;
    &:after {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d5d5d6;
      color: #d5d5d6;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }
  .dialog__btn {
    display: block;
    flex: 1;
    color: #03d779;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    &:active {
      background-color:  #eeeeee;
    }

    position: relative;
    &:after {
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      bottom: 0;
      border-left: 1px solid #d5d5d6;
      color: #d5d5d6;
      transform-origin: 0 0;
      transform: scaleX(0.5);
    }
    &:first-child {
      &:after {
        display: none;
      }
    }
  }
  .dialog__btn_default {
    color: #353535;
  }
  .dialog__btn_primary {
    color: #03d779;
  }

  .skin_android {
    .dialog {
      text-align: left;
      box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
    }
    .dialog__title {
      font-size: 21px;
    }
    .dialog__hd {
      text-align: left;
    }
    .dialog__bd {
      color: #999999;
      padding: 0.25em 2.5em 2em;
      font-size: 17px;
      text-align: left;
      &:first-child {
        padding: 1.6em 2.5em 2em;
        color: #353535;
      }
    }
    .dialog__ft {
      display: block;
      text-align: right;
      line-height: 42px;
      font-size: 16px;
      padding: 0 2.5em 0.7em;
      &:after {
        display: none;
      }
    }
    .dialog__btn {
      display: inline-block;
      vertical-align: top;
      padding: 0 0.8em;
      &:after {
        display: none;
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.06);
      }
      &:visited {
        background-color: rgba(0, 0, 0, 0.06);
      }
      &:last-child {
        margin-right: -0.8em;
      }
    }
    .dialog__btn_default {
      color: #808080;
    }
  }

  @media screen and (min-width: 1024px) {
    .dialog {
      width: 35%;
    }
  }
</style>
