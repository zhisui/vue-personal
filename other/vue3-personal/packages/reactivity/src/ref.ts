import { hasChanged } from '@vue/shared'
import { Track, trigger } from './effect'
import { TrackOpTypes, TriggerOpTypes } from './operations'

export function ref(target) {
  return createRef(target)
}

export function shallowRf(target) {
  return createRef(target, true)
}

class RefImpl {
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
