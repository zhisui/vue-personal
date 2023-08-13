import {
  isArray,
  isFunction,
  isObject,
  isString,
  ShapeFlags,
} from '@vue/shared'

export const createVNode = (type, props, children = null) => {
  let shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : isFunction(type)
    ? ShapeFlags.FUNCTIONAL_COMPONENT
    : 0
  //需要区分是组件还是元素
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

export function normalizeChildren(vnode, children: unknown) {
  let type = 0
  if (children == null) {
    children = null
  } else if (isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN
  } else {
    type = ShapeFlags.TEXT_CHILDREN
  }
  vnode.shapeFlag |= type
}
