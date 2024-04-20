<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:59:49
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-20 19:16:37
 * @Description: Lottie组件
-->
<template>
  <div ref="lottieBox" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import lottie from "lottie-web";
import { onMounted, ref } from "vue";
const props = defineProps({
  src: {
    type: Object,
    default: () => {},
  },
  path: {
    type: String,
    default: "",
  },
  loop: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
});
const lottieBox = ref(null);
onMounted(() => {
  if (lottieBox.value) {
    const animation = lottie.loadAnimation({
      container: lottieBox.value,
      renderer: "svg", // 渲染方式:svg：支持交互、不会失帧、canvas、html：支持3D，支持交互
      loop: props.loop, // 循环播放，默认：true
      autoplay: props.autoplay, // 自动播放 ，默认true
      path: props.path, //网络路径
      animationData: Object.keys(props.src).length == 0 ? "" : props.src, //本地路径，优先级更高
    });
  }
});
</script>

