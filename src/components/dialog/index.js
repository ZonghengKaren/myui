import Vue from 'vue'
import ZhDialog from './Dialog.vue'

const DialogClass = Vue.extend(ZhDialog)
DialogClass.prototype.close = function() {
  this.visible = false
}

/**
 * 弹出Dialog
 * @param {Object} options 配置
 */
const showDialog = (options = {}) => {
  // 为了动画
  options.visible = false

  // 创建Dialog
  const dialog = new DialogClass({
    el: document.createElement('div'),
    propsData: options
  })
  document.body.appendChild(dialog.$el)

  // 同样为了动画
  Vue.nextTick(() => (dialog.visible = true))

  // 返回
  return dialog
}

// 注册$dialog
Vue.prototype.$dialog = showDialog

/**
 * 注册$alert
 * @param {String} message 内容
 * @param {String|Function} title 标题
 * @param {Function} onClick 点击回调
 */
Vue.prototype.$alert = function(message, title, onClick) {
  // 如果标题不是字符串，参数位置前移
  if (typeof title !== 'string') {
    onClick = title
  }

  // 配置项
  const options = {
    title: typeof title === 'string' ? title : '提示',
    content: message,
    buttons: [
      {
        type: 'primary',
        label: '确定',
        onClick
      }
    ]
  }
  return showDialog(options)
}

/**
 * 注册$confirm
 * @param {String} message 内容
 * @param {String|Function} title 标题
 * @param {Function} onConfirm 确认回调
 * @param {Function} onCancel 取消回调
 */
Vue.prototype.$confirm = function(message, title, onConfirm, onCancel) {
  // 如果标题不是字符串，参数位置前移
  if (typeof title !== 'string') {
    onCancel = onConfirm
    onConfirm = title
    title = undefined
  }

  // 配置项
  const options = {
    title: typeof title === 'string' ? title : '提示',
    content: message,
    buttons: [
      {
        type: 'default',
        label: '取消',
        onClick: onCancel
      },
      {
        type: 'primary',
        label: '确定',
        onClick: onConfirm
      }
    ]
  }
  return showDialog(options)
}

export default ZhDialog
