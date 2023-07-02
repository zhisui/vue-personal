import { execa } from 'execa'
import * as fs from 'fs';

// 获取packages里面的文件夹名称数组
const dirs = fs.readdirSync('packages').filter((dir) => {
  return fs.statSync(`packages/${dir}`).isDirectory()
})
console.log(dirs)

// 并行打包

async function runParaller(dirs, itemFn) {
  let results = []
  for (let item of dirs) {
    results.push(itemFn(item))
  }
  return Promise.all(results)
}
// (2)进行打包 并行打包
async function build(target) {
  // execa第一个参数是打包的形式，第二个是一个数组
  // -c 执行rullup配置，环境变量
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], { stdio: "inherit" })//子进程的输出在父进程里边出现
}

runParaller(dirs, build).then(() => {
  console.log('打包成功')
})
