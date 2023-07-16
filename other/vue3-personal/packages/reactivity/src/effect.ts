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
    if (!effectStack.includes(effect)) { //保证唯一性
      try {
        effectStack.push(effect)
        activeEffect = effect
        fn() //执行用户的方法
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

// 收集effect  在获取数据的时候出发get 收集effect
export function Track(target, type, key) {
  //对应的key
}
