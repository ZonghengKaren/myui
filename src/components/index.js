import Vue from 'vue'
import ZhDialog from './dialog'

const components = {
  ZhDialog
}

Object.keys(components).forEach(name => {
  Vue.component(name, components[name])
})

export default components
