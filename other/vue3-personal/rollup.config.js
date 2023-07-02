//通过prollup进行打包

// (1)引入相关依赖
import  ts  from "rollup-plugin-typescript2"; //解析ts
import json from '@rollup/plugin-json'
import resolvePlugin from '@rollup/plugin-node-resolve'//解析第三方插件
import path from 'node:path' //处理路径
import { fileURLToPath } from 'url'

const __filenameNew = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filenameNew)


// (1)获取文件总路径
const packagesDir = path.resolve(__dirname, 'packages')
//获取文件路径下需要打包的包
const packageDir = path.resolve(packagesDir, process.env.TARGET)
console.log('test',packageDir)
