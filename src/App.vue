<template>
  <div class="comment-bg">
    <div class="content">
      <div class="track"></div>
      <div
        :class="item.status"
        v-for="item in commentList"
        :id="item.id"
        :key="item.id"
        class="runing"
        :style="{ top: item.track.top + 'px' }"
        @animationend="end(item)"
      >
        <img :src="item.img || head_def" alt="" srcset="" />
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { randomRGBA } from "@/tools/common.js";
import head_def from "./assets/head_def.png";
const props = defineProps({});
let list = [
  "哈哈哈哈",
  "微任务是一种异步任务",
  "它的执行顺序在宏任务之后",
  "个事件循环迭代中立即执行。",
  "微任务通常比宏任务更高优先级",
  "因此它们会在当前宏任务执行完毕后立即执行",
  "常见的微任务包括Promise的then和catch方法",
  "回调函数",
  "Promise",
  "事件驱动编程",
  "在事件驱动编程中，你将事件处理程序注册到特定事件上",
  "因此需要小心处理回调地狱和异步错误处理等问题",
  "处理异步操作的结果很有用",
  "常见的异步编程模式和技术：",
  "相关的两个重要概念",
  "宏任务是一种异步任务",
  "它的执行顺序在微任务之后",
  "通常在每个事件循环迭代中只执行一个",
  "宏任务包括整体的JavaScript代码",
  "setTimeout",
  "setInterval",
  "requestAnimationFrame",
  "浏览器中的动画帧任务",
  "宏任务的执行顺序会等待当前的微任务队列执行完毕后",
  "然后从宏任务队列中选择下一个宏任务执行",
  "在面向对象编程中，类继承是一种重要的机制",
  "每个子类只能继承一个父类。这是一种简单且常见的继承方式，用于构建类层次结构",
  "子类可以实现多个接口",
];
let commentList = ref([]);
let trackList = ref([]);
let trackCount = 5;
class Track {
  top = 0;
  disabled = false;
}
class Comment {
  id;
  status = "waiting";
  content = "";
  track;
  color;
  constructor(content) {
    this.id = new Date().getTime();
    this.color = randomRGBA(1);
    this.content = content;
  }
}
function add(index, item) {
  let comment = new Comment(item);
  comment.track = trackList.value[index];
  commentList.value.push(comment);
}
function run() {
  let contentWidth = document
    .querySelector(".content")
    .getBoundingClientRect().width;
  commentList.value.forEach((item) => {
    if (item.status == "waiting") {
      let itemWidth = document
        .getElementById(item.id)
        .getBoundingClientRect().width;
      let delay = (itemWidth / (contentWidth + itemWidth)) * 5 * 1000;
      item.status = "runing";
      item.track.disabled = true;
      setTimeout(() => {
        item.track.disabled = false;
      }, delay);
    }
  });
}
async function end(item) {
  item.status = "end";
  await nextTick();
  const index = commentList.value.indexOf(item);
  if (index > -1) {
    commentList.value.splice(index, 1);
  }
}

async function sendComment(item) {
  for (let index = 0; index < trackCount; index++) {
    if (!trackList.value[index].disabled) {
      add(index, item);
      await nextTick();
      run();
      break;
    }
  }
}
async function init() {
  let index = -1;
  setInterval(() => {
    if (index < list.length) {
      index += 1;
    } else {
      index = -1;
    }
    if (list[index]) {
      sendComment(list[index]);
    }
  }, 500);
}
onMounted(() => {
  let defHeight = document.querySelector(".track").clientHeight;
  for (let index = 0; index < trackCount; index++) {
    let track = new Track();
    track.top = index * defHeight;
    trackList.value.push(track);
  }
  init();
});
</script>
<style lang="scss" scoped>
.start {
  transform: translateX(750px);
}
.end {
  transform: translateX(-100%);
}
@keyframes runing {
  from {
    transform: translateX(750px);
  }
  to {
    transform: translateX(-100%);
  }
}
.runing {
  position: absolute;
  white-space: nowrap;
  animation: runing 5s linear;
  font-size: 24px;
  padding: 10px 24px;
  color: rgba(255, 61, 135, 1);
  background: #ffffff;
  border-radius: 23px 23px 23px 23px;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
}
.track {
  width: 100%;
  height: 86px;
}
.content {
  width: 750px;
  overflow: hidden;
  height: 721px;
  position: relative;
  box-sizing: border-box;
}
.comment-bg {
  width: 100%;
  height: 1240px;
}
</style>
