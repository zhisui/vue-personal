import { apiCreateAPP } from './apiCreateApp';

export function createRender(renderOptionDom) {
  let render = (vnode, container) => {}
  return {
    createApp: apiCreateAPP(render) //创建虚拟dom
  }
}
