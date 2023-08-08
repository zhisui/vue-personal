export const createVNode = (type, props, children = null) => {
  let shapeFlag //需要区分是组件还是元素
  const vnode = {
    _v_isNode: true,
    type, // 类型是组件还是元素
    props,
    children,
    key: props && props.key, //diff会用到key值
    el: null, //真实的元素和vnode对应
    shapeFlag,
  }

  return vnode
}
