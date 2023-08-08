import { isObject, extend, isArray, isIntegerKey, hasOwn } from '@vue/shared'
import { reactive, readonly } from './reactive'
import { TrackOpTypes,TriggerOpTypes } from './operations'
import { Track,trigger } from './effect'

// 一个控制属性是否是只读的，一个控制是否的是深层对想
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key: string | symbol, receiver: object) {
    const res = Reflect.get(target, key, receiver)

    if (!isReadonly) {
      // 依赖收集，等数据变化后更新视图
      //收集effect
      Track(target, TrackOpTypes.GET, key)
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

// set
function createSetter(shallow = false) {
  return function set(target, key, value, receiver) {
    const oldValue = target[key]
    const result = Reflect.set(target, key, value, receiver)
    // 判断响应式的数据是数组还是对象，如果是对象的话是添加还是修改
    let hasKey = isArray(target) && isIntegerKey(key)? Number(key) < target.length : hasOwn(target, key)
    if(!hasKey) {
      // 新增的情况
      trigger(target, TriggerOpTypes.ADD, key, value)

    }else {  // 修改的情况
     //处理新的值和原来值一样的情况
     trigger(target, TriggerOpTypes.SET, key, value, oldValue)

    }

    return result
  }
}

let readOnlyObj = {
  set: (target, key) => {
    console.warn(`set ${target} on key ${key} failed`)
  },
}

const set = /*#__PURE__*/ createSetter()
const shallowSet = /*#__PURE__*/ createSetter(true)

export const reactiveHandlers = {
  get,
  set,
}

export const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet,
}

export const readonlyHandlers = extend(
  {
    get: readonlyGet,
  },
  readOnlyObj
)

export const shallowReadonlyHandlers = extend(
  {
    get: shallowReadonlyGet,
  },
  { readOnlyObj }
)
