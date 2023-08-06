import { TrackOpTypes, TriggerOpTypes } from './operations'
// import { EffectScope, recordEffectScope } from './effectScope'

export type DebuggerEvent = {
  effect: ReactiveEffect
} & DebuggerEventExtraInfo

export type DebuggerEventExtraInfo = {
  target: object
  type: TrackOpTypes | TriggerOpTypes
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
export type EffectScheduler = (...args: any[]) => any
export interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

export interface ReactiveEffectOptions extends DebuggerOptions {
  lazy?: boolean
  scheduler?: EffectScheduler
  // scope?: EffectScope
  allowRecurse?: boolean
  onStop?: () => void
}

export class ReactiveEffect<T = any> {}

export const effect = (fn, obj: any = {}) => {
  const effect = creatReactEffect(fn, obj)
  if (!obj.lazy) {
    effect()
  }
  return effect
}

let uid
let activeEffect
const effectStack = [] //这个是解决监听函数中再次调用effect时，里层不会收集外层监听函数的依赖，外层也不会收集到里层的依赖
const creatReactEffect = (fn, obj) => {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      //保证唯一性
      try {
        effectStack.push(effect)
        activeEffect = effect
        return fn() //执行用户的方法
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.id = uid++ //区别effect
  effect.isEffect = true // 区别effect是不是响应式的effect
  effect.raw = fn //保存用户的方法
  effect.option = fn //保存用户的属性

  return effect
}

let targetMap = new WeakMap() //以target为key， Map(target属性值为key => Set(effect)) 为value
// 收集effect  在获取数据的时候出发get 收集effect
export function Track(target, type, key) {
  //key和effect一一对应
  let depMap = targetMap.get(target)
  if (!depMap) {
    //没有
    targetMap.set(target, (depMap = new Map()))
  }
  // 有
  let depSet = depMap.get(key)
  if (!depSet) {
    depMap.set(key, (depSet = new Set()))
  }

  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect)
  }
  console.log(targetMap, 'targetMap')
}

export function trigger(target, type, key?, newValue?, oldValue?) {
  const depsMap = targetMap.get(target)
  let effectSet = new Set()

  const add = (effectAdd) => {
    if (effectAdd) {
      effectAdd.forEach((effect) => {
        effectSet.add(effect)
      })
    }
  }

  add(depsMap.get(key)) //这里是去重赋值一样的情况
  effectSet.forEach((effect: any) => {
    if (effect.options.sch) {
      // computed中_dirty = true
      effect.options.sch(effect)
    } else {
      effect()
    }
  })
}
