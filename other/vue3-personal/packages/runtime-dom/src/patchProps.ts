// 操作属性
import { patchAttr } from '../../runtime-dom/src/modules/attr'
import { patchClass } from '../../runtime-dom/src/modules/class'
import { patchEvent } from '../../runtime-dom/src/modules/event'
import { patchStyle } from '../../runtime-dom/src/modules/style'
export const patchProps = (el, key, prevValue, nextValue) => {
  switch (key) {
    case 'class':
      patchClass(el, nextValue)

      break
    case 'style':
      patchStyle(el, prevValue, nextValue)
      break

    default:
      //判断是不是事件
      if (/^on[a-z].test(key)/) {
        patchEvent(el, key, nextValue)
      } else {
        patchAttr(el, key, nextValue)
      }
      break
  }
}
