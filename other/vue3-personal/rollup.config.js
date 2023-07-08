//通过prollup进行打包

// (1)引入相关依赖
import ts from 'rollup-plugin-typescript2' //解析ts
import json from '@rollup/plugin-json'
import resolvePlugin from '@rollup/plugin-node-resolve' //解析第三方插件
import path from 'path' //处理路径

// (1)获取文件总路径
const packagesDir = path.resolve(__dirname, 'packages')
console.log(packagesDir,'packagesDir')
//获取文件路径下需要打包的包
const packageDir = path.resolve(packagesDir, process.env.TARGET)
// //获取每个包的项目配置
const resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))

const packageOptions = pkg.buildOptions || {}
// 拿到包名
const name =  path.basename(packageDir)

const outputConfigs = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: `es`,
  },

  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`,
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`,
  },
}

const options = pkg.buildOptions
function createConfig(format, output) {
  // 生成rollup配置
  return {
    input: resolve('src/index.ts'),
    output: {
      ...output,
      // sourcemap: true,
      name: options.name
    },
    plugins: [
      json(),
      ts({
        //解析ts
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      }),
      resolvePlugin(),
    ],
  }
}

export default options.formats.map((format) =>{
  return  createConfig(format, outputConfigs[format])

})

