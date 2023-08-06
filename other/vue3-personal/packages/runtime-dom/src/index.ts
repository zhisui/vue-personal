//  runtime-dom 操作节点和属性

import { extend } from '@vue/shared'
import { nodeOps } from './nodeOps'
import { patchProps } from './patchProps'

const renderOptionDom = extend({ patchProps }, nodeOps)

export { renderOptionDom }
