import { isObject } from '@vue/shared'
import { reactive, readonly } from './reactive'

// 一个控制属性是否是只读的，一个控制是否的是深层对想
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key: string | symbol, receiver: object) {
    const res = Reflect.get(target, key, receiver)

    if (!isReadonly) {
      // 依赖收集
    }

    if (shallow) {
      return res
    }

    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}

const get = /*#__PURE__*/ createGetter()
const shallowGet = /*#__PURE__*/ createGetter(false, true)
const readonlyGet = /*#__PURE__*/ createGetter(true)
const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true)

export const reactiveHandlers = {
  get,
}
export const readonlyHandlers = {
  get: shallowGet,
}
export const shallowReadonlyHandlers = {
  get: readonlyGet,
}
export const shallowReactiveHandlers = {
  get: shallowReadonlyGet,
}
