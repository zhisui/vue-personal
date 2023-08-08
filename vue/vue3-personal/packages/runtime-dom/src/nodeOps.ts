// 操作节点 增删改查 （元素和文本）

export const nodeOps = {
  createElement: (tagName) => document.createElement(tagName),
  remove: (child) => {
    let parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  insert: (child, parent, ancher = null) => {
    parent.insertBefore(child, ancher)
  },
  querySelector: (selector) => document.querySelector(selector),
  createText: (text) => document.createTextNode(text),
  setElementText: (el, text) => (el.textContent = text),
  setText: (node, text) => (node.nodeValue = text),
}
