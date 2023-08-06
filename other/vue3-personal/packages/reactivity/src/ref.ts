import { hasChanged, isArray } from '@vue/shared'
import { Track, trigger } from './effect'
import { TrackOpTypes, TriggerOpTypes } from './operations'

export function ref(target) {
  return createRef(target)
}

export function shallowRf(target) {
  return createRef(target, true)
}

class RefImpl { //感觉这地方没考虑target是对象的情况
  // 属性
  public __v_isRef = true
  public _value
  constructor(public rawValue, public shallow) {
    this._value = rawValue
  }
  get value() {
    //收集依赖track

    Track(this, TrackOpTypes.GET, 'value')
    return this._value
  }
  set value(newValue) {
    //触发更新trigger
    if (hasChanged(newValue, this._value)) {
      console.log(newValue, '执行没有')
      this._value = newValue
      this.rawValue = newValue
      trigger(this, TriggerOpTypes.SET, 'value', newValue)
    }
    this._value = newValue
  }
}

function createRef(rawValue, shallow = false) {
  // 创建ref对象
  return new RefImpl(rawValue, shallow)
}

export function  toRef(target,key) {
  return new  ObjectRefImpl(target, key)
}

class ObjectRefImpl{
  public __v_isRfe = true
  constructor(public target, public key) {

  }

  get value() {
    return this.target[this.key]
  }

  set value(newValue) {
   this.target[this.key] = newValue
  }
}


// 实现toRefs
export function toRefs(target) {
  // 遍历
  let ret = isArray(target)? new Array(target.length): {}
  for(let key in target) {
    ret[key] = toRef(target, key)
  }
  return ret
}
