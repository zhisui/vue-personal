//  runtime-dom 操作节点和属性

import { createRender } from '@vue/runtime-core'
import { extend } from '@vue/shared'
import { nodeOps } from './nodeOps'
import { patchProps } from './patchProps'

const renderOptionDom = extend({ patchProps }, nodeOps)
export const createApp = (rootComponent, rootProps) => {
  let app = createRender(renderOptionDom).createApp(rootComponent, rootProps)
  let { mount } = app
  app.mount = function (container) {
    // 清空挂载组件本身的内容
    container = nodeOps.querySelector(container)
    container.innerHTML = ''
    mount(container)
  }

  return app
}


