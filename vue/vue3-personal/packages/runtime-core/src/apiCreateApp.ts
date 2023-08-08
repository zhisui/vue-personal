import { createVNode } from './vnode'

// 创建vNode
export function apiCreateAPP(render) {
  return function createApp(rootComponent, rootProps) {
    let app = {
      //添加相关的属性
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      mount(container) {
        //挂载的节点位置
        let vnode = createVNode(rootComponent, rootProps)

        render(vnode, container)
        app._container = container
      },
    }

    return app
  }
}
