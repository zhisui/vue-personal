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
  constructor(public getter, public setter) {
    this.effect = effect(getter, {
      lazy: true,
      sch: () => {
        if (!this._dirty) {
          this._dirty = true
        }
      },
    })
  }

  get value() {
    if (this._dirty) {
      this._value = this.effect()
      this._dirty = false
    }
    return this._value
  }

  set(newValue) {
     this.setter(newValue)
  }
}
