// style = {color: 'red'} => style={background: 'white'}

export const patchStyle = (el,prev, next) => {
   const style = el.style
   if(next == null) {
     el.removeAttribute('style')
   } else {
    //  老的有，新的没有
    if(prev) {
      for(let key in prev) {
         if(next[key] == null) {
          //  清空
          style[key] = ''
         }
      }
    }

    // 新的赋值到style上

    for(let key in next) {
      style[key] = next[key]
    }

   }
}
