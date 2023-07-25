import { isFunction } from '@vue/shared'
import { effect } from './effect'

export function computed(getterOrOption) {
  let getter
  let setter
  if (isFunction(getterOrOption)) {
    getter = getterOrOption
    setter = () => {
      console.warn('computed value must be readonly')
    }
  } else {
    getter = getterOrOption.get
    setter = getterOrOption.set
  }
  return new ComputedRefImpl(getter, setter)
}

class ComputedRefImpl {
  public _dirty = true //默认在获取的时候才执行
  public _value
  public effect
  constructor(getter, setter) {

    this.effect = effect(getter, {
      lazy: true,
    })
  }

  get value() {
    console.log('执行没有');
    if (this._dirty) {
      this._value = this.effect()
      console.log(this._value, ' this._value')
    }
    return this._value
  }
}
