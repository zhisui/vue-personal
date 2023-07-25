// import { createDep, Dep } from './dep'
// import { isArray, hasChanged, IfAny, isFunction, isObject } from '@vue/shared'
// import {
//   isProxy,
//   toRaw,
//   isReactive,
//   toReactive,
//   isReadonly,
//   isShallow
// } from './reactive'

// declare const RefSymbol: unique symbol
// export interface Ref<T = any> {
//   value: T
//   /**
//    * Type differentiator only.
//    * We need this to be in public d.ts but don't want it to show up in IDE
//    * autocomplete, so we use a private Symbol instead.
//    */
//   [RefSymbol]: true
// }

// export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
// export function isRef(r: any): r is Ref {
//   return !!(r && r.__v_isRef === true)
// }

// export function ref(value?: unknown) {
//   return createRef(value, false)
// }


// function createRef(rawValue: unknown, shallow: boolean) {
//   if (isRef(rawValue)) {
//     return rawValue
//   }
//   return new RefImpl(rawValue, shallow)
// }

// class RefImpl<T> {
//   private _value: T
//   private _rawValue: T

//   public dep?: Dep = undefined
//   public readonly __v_isRef = true

//   constructor(value: T, public readonly __v_isShallow: boolean) {
//     this._rawValue = __v_isShallow ? value : toRaw(value)
//     this._value = __v_isShallow ? value : toReactive(value)
//   }

//   get value() {
//     trackRefValue(this)
//     return this._value
//   }

//   set value(newVal) {
//     const useDirectValue =
//       this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
//     newVal = useDirectValue ? newVal : toRaw(newVal)
//     if (hasChanged(newVal, this._rawValue)) {
//       this._rawValue = newVal
//       this._value = useDirectValue ? newVal : toReactive(newVal)
//       triggerRefValue(this, newVal)
//     }
//   }
// }
