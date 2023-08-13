import { ShapeFlags } from '@vue/shared'
import { apiCreateAPP } from './apiCreateApp'

export function createRender(renderOptionDom) {

  const mountComponent = (vnode, container) => {
    // 组件的渲染流程
    // 1.先有一个组件的实例对象，reder(proxy)
    // 2. 解析数据到这个实例对象中
    // 3.创建dffect让render函数执行

  }
  // 组件的创建
  const processComponent = (n1, n2, container) => {
    if(n1 == null ) { //初次渲染
      mountComponent(n2, container)
    } else  { //更新处理

    }

  }
  const patch = (n1, n2, container) => {
    // 针对不同的类型 1、组件 2.元素
    let { shapeFlag } = n2
    if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
      // 组件
      processComponent(n1, n2, container)
    } else if (shapeFlag & shapeFlag.ELEMENT) {
      console.log('元素')
    }
  }
  let render = (vnode, container) => {
    console.log(vnode, 'vnode虚拟dom是什么')
    patch(null, vnode, container) //1.旧的节点，2.新得节点，当前位置
  }
  return {
    createApp: apiCreateAPP(render), //创建虚拟dom
  }
}
