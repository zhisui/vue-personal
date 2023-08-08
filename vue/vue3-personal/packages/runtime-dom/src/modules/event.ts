// 给元素缓存一个绑定的事件
// 如果缓存中没有，并且value有值，需要绑定方法并将其缓存
// 以前绑定过的 需要删除，缓存也要删除

// 两个都有，直接改变invoker 中的value 指向最新的事件

export const patchEvent = (el, key, value) => {
  // 缓存
  const invokers = el.vei || (el._vei = {})
  const exists = invokers[key]
  if (exists && value) {
    //新旧里面都有事件，则将缓存中的事件用新的事件代替
    exists.value = value
  } else {
    //如果缓存没有
    const eventName = key.slice(1).toLowerCase()
    if (value) {
      //新的有
      let invoker = (invokers[eventName] = creatInvoker(value))
      el.addEventListener(eventName, invoker)
    } else {
      //新的没有 以前的删除掉
      el.removeEventListener(eventName, exists)
      invokers[eventName] = null //清除缓存
    }
  }
}

function creatInvoker(value) {
  const invoker = (e) => {
    invoker.value(e)
  }
  // 将以前的方法指向最新的
  invoker.value = value

  return invoker
}
