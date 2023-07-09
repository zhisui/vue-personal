import { isObject } from '@vue/shared'
import {
  reactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
  shallowReactiveHandlers,
} from './baseHandlers'

const reactiveMap = new WeakMap()
const readOnlyMap = new WeakMap()

function createReactiveObject(target, isReadOnly, baseHandlers) {
  if (!isObject(target)) {
    return target
  }
  //优化，避免多次对对象进行代理处理
  const proxymap = isReadOnly ? readOnlyMap : reactiveMap
  const proxyEs = proxymap.get(target)
  if (proxyEs) {
    //如果存在直接返回，不进行第二次代理处理
    return proxyEs
  }
  const proxy = new Proxy(target, baseHandlers)
  proxymap.set(target, proxy)
  return proxy
}

export function reactive(target) {
  return createReactiveObject(target, false, reactiveHandlers)
}
export function shallowReactive(target) {
  return createReactiveObject(target, true, shallowReactiveHandlers)
}

export function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers)
}

export function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers)
}
