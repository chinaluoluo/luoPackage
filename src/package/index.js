const components = []
const context = require.context('./src', true, /index\.js$/)
context.keys().forEach(component => {
  const componentExport = context(component).default
  components.push(componentExport)
})
// 定义install方法，使用Vue.use时注册所有组件
const install = Vue => {
  if (install.installed) {
    return
  }
  components.forEach(com => {
    Vue.component(com.name, com)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  ...components
}
