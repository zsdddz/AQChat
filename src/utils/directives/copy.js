/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-06-20 09:36:50
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-20 09:43:35
 * @Description: 
 */
import { ElMessage } from "element-plus"
const copys = (el, binding) => {
  //ondblclick
  el.onclick = () => {
    if (navigator.clipboard) {
      //创建一个range对象
      const range = document.createRange()
      //使 Range 包含某个节点及其内容。
      range.selectNode(el)
      //   用户选择的文本范围
      const selection = window.getSelection()
      if (selection.rangeCount > 0) selection.removeAllRanges()
      //选中
      selection.addRange(range)
      //复制
      navigator.clipboard.writeText(binding.value)
      ElMessage({
        message: '已复制到粘贴板！',
        type: 'success',
      })
    } else {
      // 创建输入框
      var textarea = document.createElement('textarea')
      document.body.appendChild(textarea)
      // 隐藏此输入框
      textarea.style.position = 'absolute'
      textarea.style.top = '-9999'
      // 赋值
      textarea.value = binding.value
      // 选中
      textarea.select()
      // 复制
      document.execCommand('copy', true)
      ElMessage({
        message: '已复制到粘贴板！',
        type: 'success',
      })
    }
  }
}
export default copys

