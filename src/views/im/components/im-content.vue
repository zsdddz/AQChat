<template>
  <div class="im-content">
    <header class="head">
      <span class="name">房间号：xsk5451217212</span>
    </header>
    <!--聊天内容-->
    <div class="content-win">
      <el-scrollbar style="max-height: 100%" ref="contentScrollbar">
        <template v-for="(item, index) in msgList" :key="index">
          <div v-if="item.sendId == userInfo.userId">
            <div class="mine-block">
              <div
                v-if="item.type == 0"
                class="block"
                v-html="item.content"
              ></div>
              <img
                v-else-if="item.type == 1"
                class="send-image"
                v-bind:src="item.content"
                preview="1"
              />
              <video
                v-else-if="item.type == 2"
                class="send-video"
                width="320"
                height="240"
                controls
              >
                <source :src="item.content" type="video/mp4" />
                您的浏览器不支持 HTML5 video 标签。
              </video>
              <audio class="send-video" v-else-if="item.type == 3" controls>
                <source :src="item.content" type="audio/mpeg" />
                您的浏览器不支持该音频格式。
              </audio>

              <div class="mine-avatar" v-html="userInfo.userAvatar">
              </div>
            </div>
            <div style="clear: both"></div>
          </div>
          <div v-else>
            <div class="reciver-block">
              <div class="reciver-avatar" v-html="item.userAvatar">
              </div>
              <div
                v-if="item.type == 0"
                class="block"
                v-html="item.content"
              ></div>
              <img
                v-else-if="item.type == 1"
                class="send-image"
                v-bind:src="item.content"
                preview="1"
              />
              <video
                class="send-video"
                v-else-if="item.type == 2"
                width="320"
                height="240"
                controls
              >
                <source :src="item.content" type="video/mp4" />
                您的浏览器不支持 HTML5 video 标签。
              </video>
              <audio class="send-video" v-else-if="item.type == 3" controls>
                <source :src="item.content" type="audio/mpeg" />
                您的浏览器不支持该音频格式。
              </audio>
            </div>
            <div style="clear: both"></div>
          </div>
        </template>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import useAppStore from "@/store/modules/app";

const appStore = useAppStore()
const userInfo = appStore.userInfo

console.log(userInfo);
const currentRoomId = ref(0);
const msgList = ref([
  {
    sendId:"aquser_1785189682892640256",
    type:0,
    content:"测试",
    id:1,
    userAvatar:"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 231 231\"><path d=\"M33.83,33.83a115.5,115.5,0,1,1,0,163.34,115.49,115.49,0,0,1,0-163.34Z\" style=\"fill:#0DC15C;\"/><path d=\"m115.5 51.75a63.75 63.75 0 0 0-10.5 126.63v14.09a115.5 115.5 0 0 0-53.729 19.027 115.5 115.5 0 0 0 128.46 0 115.5 115.5 0 0 0-53.729-19.029v-14.084a63.75 63.75 0 0 0 53.25-62.881 63.75 63.75 0 0 0-63.65-63.75 63.75 63.75 0 0 0-0.09961 0z\" style=\"fill:#f2c280;\"/><path d=\"m141.74 195a114.93 114.93 0 0 1 37.912 16.45l0.07 0.05c-1.17 0.79-2.3601 1.55-3.5601 2.29a115.55 115.55 0 0 1-120.95 0.21q-2.0001-1.23-4.0002-2.54a114.79 114.79 0 0 1 38.002-16.5 116.21 116.21 0 0 1 15.791-2.49v-14.57c1.32 0.22 2.6501 0.39 4.0002 0.51 2.0001 0.19 4.0002 0.28 6.1202 0.29a64.333 64.33 0 0 0 8.8804-0.62c0.67003-0.09 1.3401-0.2 2.0001-0.31v14.69a118 118 0 0 1 15.741 2.54z\" style=\"fill:#000;\"/><path d=\"m79.292 212a3.4601 3.46 0 0 0 3.8902 5.07 3.3801 3.38 0 0 0 2.1001-1.61 3.4701 3.47 0 0 0-1.2801-4.72 3.4201 3.42 0 0 0-2.6201-0.34 3.5101 3.51 0 0 0-2.0901 1.6zm60.122 0.46a3.4901 3.49 0 0 0 1.21 4.7h0.06a3.4601 3.46 0 0 0 4.7202-1.27l0.07-0.13a3.4601 3.46 0 0 0-1.34-4.6 3.4601 3.46 0 0 0-2.5801-0.32 3.5301 3.53 0 0 0-2.1001 1.61zm9.8004 5.7 5.8602 5.87c-1.39 0.5-2.7901 1-4.2102 1.44l-4.4802-4.47a7.5203 7.52 0 0 1-1.9401 0.81 7.8303 7.83 0 0 1-6.0002-0.79 7.8703 7.87 0 0 1-2.9201-10.69v-0.07a7.8903 7.89 0 0 1 10.77-2.88l0.12 0.07a7.8603 7.86 0 0 1 2.7901 10.62v0.07zm-37.701-2.36-9.5004 9.51v4.9c-1.35-0.16-2.6801-0.33-4.0002-0.54v-6l0.58002-0.58 10.1-10.09a7.8703 7.87 0 1 1 2.8401 2.86zm7.3203-5.91a3.4601 3.46 0 1 0-1.6101 2.1 3.3801 3.38 0 0 0 1.6101-2.1zm-29.741 7.82 3.0901 3.1 0.59002 0.59v7.36c-1.3401-0.26-2.6801-0.55-4.0002-0.87v-4.84l-2.5101-2.51a7.5203 7.52 0 0 1-1.9401 0.81 7.8803 7.88 0 1 1 1.9101-14.43 7.8703 7.87 0 0 1 2.8901 10.75z\" style=\"fill:#fff;\"/><path d=\"m115.5 51.75c-38.702 5.3101-54.215 18.038-59.863 35.101\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m115.5 51.75c-7.8393 3.6337-5.5974 16.583-14.341 23.452\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m111.35 48.614c-22.634-6.9181-42.457-3.1988-55.733 2.5105\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m115.47 54.008c0.1965-6.7774-0.1436-26.309 0.05-38.184\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m68.874 28.177c34.115-3.382 41.987 13.321 45.17 19.602\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m116.49 48.69c2.8876-6.3019 10.358-21.518 43.469-22.326\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m116.92 51.766c1.5094 6.3991 3.4988 15.595 10.088 23.058\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m113.81 51.532c22.03-7.8674 46.709-7.3614 59.444-2.0465\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m114.53 52.278c36.226 4.8583 52.414 17.092 59.373 33.347\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m55.637 86.851c-4.1213 12.452-2.9877 27.213-1.777 43.084\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m55.614 51.124c-13.422 5.5019-21.908 16.409-24.712 28.774-1.8322 8.4632-1.9809 18.156-1.6096 28.486\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m173.26 49.486c24.917 10.399 26.707 36.537 27.209 59.62\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m173.9 85.625c5.4042 12.625 5.2413 27.675 4.5745 43.58\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m53.86 129.93c1.293 16.951 2.6738 35.169-2.1664 53.193\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m29.292 108.38c0.6173 17.177 2.6722 36.119 0.8158 54.108\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m200.47 109.11c0.3586 18.529-1.2751 36.94 1.9231 48.985\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m178.48 129.2c-0.7279 17.362-2.0563 35.743 2.6011 53.099\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m170.25 100c1.69 9.62-4.79 29.23-22.4 29.23-6.81 0-15-3.66-20.23-10-4.34-5.33-7.56-12.87-6.2-19.45 1.63-7.89 7.07-11.45 14.67-12.92a68.16 68.16 0 0 1 12.52-1c10.77 0 19.78 3.61 21.64 14.22z\" style=\"fill:#c4ffe4;stroke-width:3.99px;stroke:#000;\"/><path d=\"m60.75 100c-1.69 9.62 4.79 29.23 22.4 29.23 6.81 0 15-3.66 20.23-10 4.34-5.33 7.56-12.87 6.2-19.45-1.63-7.89-7.07-11.45-14.67-12.92a68.16 68.16 0 0 0-12.52-1c-10.77 0-19.78 3.61-21.64 14.22z\" style=\"fill:#c4ffe4;stroke-width:3.99px;stroke:#000;\"/><line x1=\"100.2\" x2=\"130.8\" y1=\"87.92\" y2=\"87.92\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3.99px;stroke:#000;\"/><path d=\"m109.87 101.73c0-2.59 2.52-4.69 5.63-4.69s5.63 2.1 5.63 4.69\" style=\"fill:none;stroke-width:3.99px;stroke:#000;\"/><path d=\"m94.19 136.84h42.632a3.7801 3.78 0 0 1 3.7802 3.78v3.22a15.231 15.23 0 0 1-15.211 15.16h-19.781a15.251 15.25 0 0 1-15.221-15.16v-3.22a3.8002 3.8 0 0 1 3.7802-3.78z\" style=\"fill:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;\"/><path d=\"m130.96 136.84v21.16m-30.911-21.16v21.16m10.34-21.16v22.16m10.31-22.2v22.2\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;\"/></svg>"
  },
  {
    sendId:"aquser_1784864961571459073",
    type:0,
    content:"测试2",
    id:2,
    userAvatar:"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 231 231\"><path d=\"M33.83,33.83a115.5,115.5,0,1,1,0,163.34,115.49,115.49,0,0,1,0-163.34Z\" style=\"fill:#0DC15C;\"/><path d=\"m115.5 51.75a63.75 63.75 0 0 0-10.5 126.63v14.09a115.5 115.5 0 0 0-53.729 19.027 115.5 115.5 0 0 0 128.46 0 115.5 115.5 0 0 0-53.729-19.029v-14.084a63.75 63.75 0 0 0 53.25-62.881 63.75 63.75 0 0 0-63.65-63.75 63.75 63.75 0 0 0-0.09961 0z\" style=\"fill:#f2c280;\"/><path d=\"m141.74 195a114.93 114.93 0 0 1 37.912 16.45l0.07 0.05c-1.17 0.79-2.3601 1.55-3.5601 2.29a115.55 115.55 0 0 1-120.95 0.21q-2.0001-1.23-4.0002-2.54a114.79 114.79 0 0 1 38.002-16.5 116.21 116.21 0 0 1 15.791-2.49v-14.57c1.32 0.22 2.6501 0.39 4.0002 0.51 2.0001 0.19 4.0002 0.28 6.1202 0.29a64.333 64.33 0 0 0 8.8804-0.62c0.67003-0.09 1.3401-0.2 2.0001-0.31v14.69a118 118 0 0 1 15.741 2.54z\" style=\"fill:#000;\"/><path d=\"m79.292 212a3.4601 3.46 0 0 0 3.8902 5.07 3.3801 3.38 0 0 0 2.1001-1.61 3.4701 3.47 0 0 0-1.2801-4.72 3.4201 3.42 0 0 0-2.6201-0.34 3.5101 3.51 0 0 0-2.0901 1.6zm60.122 0.46a3.4901 3.49 0 0 0 1.21 4.7h0.06a3.4601 3.46 0 0 0 4.7202-1.27l0.07-0.13a3.4601 3.46 0 0 0-1.34-4.6 3.4601 3.46 0 0 0-2.5801-0.32 3.5301 3.53 0 0 0-2.1001 1.61zm9.8004 5.7 5.8602 5.87c-1.39 0.5-2.7901 1-4.2102 1.44l-4.4802-4.47a7.5203 7.52 0 0 1-1.9401 0.81 7.8303 7.83 0 0 1-6.0002-0.79 7.8703 7.87 0 0 1-2.9201-10.69v-0.07a7.8903 7.89 0 0 1 10.77-2.88l0.12 0.07a7.8603 7.86 0 0 1 2.7901 10.62v0.07zm-37.701-2.36-9.5004 9.51v4.9c-1.35-0.16-2.6801-0.33-4.0002-0.54v-6l0.58002-0.58 10.1-10.09a7.8703 7.87 0 1 1 2.8401 2.86zm7.3203-5.91a3.4601 3.46 0 1 0-1.6101 2.1 3.3801 3.38 0 0 0 1.6101-2.1zm-29.741 7.82 3.0901 3.1 0.59002 0.59v7.36c-1.3401-0.26-2.6801-0.55-4.0002-0.87v-4.84l-2.5101-2.51a7.5203 7.52 0 0 1-1.9401 0.81 7.8803 7.88 0 1 1 1.9101-14.43 7.8703 7.87 0 0 1 2.8901 10.75z\" style=\"fill:#fff;\"/><path d=\"m115.5 51.75c-38.702 5.3101-54.215 18.038-59.863 35.101\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m115.5 51.75c-7.8393 3.6337-5.5974 16.583-14.341 23.452\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m111.35 48.614c-22.634-6.9181-42.457-3.1988-55.733 2.5105\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m115.47 54.008c0.1965-6.7774-0.1436-26.309 0.05-38.184\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m68.874 28.177c34.115-3.382 41.987 13.321 45.17 19.602\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m116.49 48.69c2.8876-6.3019 10.358-21.518 43.469-22.326\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m116.92 51.766c1.5094 6.3991 3.4988 15.595 10.088 23.058\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m113.81 51.532c22.03-7.8674 46.709-7.3614 59.444-2.0465\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m114.53 52.278c36.226 4.8583 52.414 17.092 59.373 33.347\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m55.637 86.851c-4.1213 12.452-2.9877 27.213-1.777 43.084\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m55.614 51.124c-13.422 5.5019-21.908 16.409-24.712 28.774-1.8322 8.4632-1.9809 18.156-1.6096 28.486\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m173.26 49.486c24.917 10.399 26.707 36.537 27.209 59.62\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m173.9 85.625c5.4042 12.625 5.2413 27.675 4.5745 43.58\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m53.86 129.93c1.293 16.951 2.6738 35.169-2.1664 53.193\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m29.292 108.38c0.6173 17.177 2.6722 36.119 0.8158 54.108\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m200.47 109.11c0.3586 18.529-1.2751 36.94 1.9231 48.985\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m178.48 129.2c-0.7279 17.362-2.0563 35.743 2.6011 53.099\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m170.25 100c1.69 9.62-4.79 29.23-22.4 29.23-6.81 0-15-3.66-20.23-10-4.34-5.33-7.56-12.87-6.2-19.45 1.63-7.89 7.07-11.45 14.67-12.92a68.16 68.16 0 0 1 12.52-1c10.77 0 19.78 3.61 21.64 14.22z\" style=\"fill:#c4ffe4;stroke-width:3.99px;stroke:#000;\"/><path d=\"m60.75 100c-1.69 9.62 4.79 29.23 22.4 29.23 6.81 0 15-3.66 20.23-10 4.34-5.33 7.56-12.87 6.2-19.45-1.63-7.89-7.07-11.45-14.67-12.92a68.16 68.16 0 0 0-12.52-1c-10.77 0-19.78 3.61-21.64 14.22z\" style=\"fill:#c4ffe4;stroke-width:3.99px;stroke:#000;\"/><line x1=\"100.2\" x2=\"130.8\" y1=\"87.92\" y2=\"87.92\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3.99px;stroke:#000;\"/><path d=\"m109.87 101.73c0-2.59 2.52-4.69 5.63-4.69s5.63 2.1 5.63 4.69\" style=\"fill:none;stroke-width:3.99px;stroke:#000;\"/><path d=\"m94.19 136.84h42.632a3.7801 3.78 0 0 1 3.7802 3.78v3.22a15.231 15.23 0 0 1-15.211 15.16h-19.781a15.251 15.25 0 0 1-15.221-15.16v-3.22a3.8002 3.8 0 0 1 3.7802-3.78z\" style=\"fill:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;\"/><path d=\"m130.96 136.84v21.16m-30.911-21.16v21.16m10.34-21.16v22.16m10.31-22.2v22.2\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;\"/></svg>"
  },
  {
    sendId:"aquser_1784864961571459072",
    type:1,
    content:"https://img0.baidu.com/it/u=509115914,1050232329&fm=253&fmt=auto&app=138&f=JPEG?w=753&h=500",
    id:3,
    userAvatar:"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 231 231\"><path d=\"M33.83,33.83a115.5,115.5,0,1,1,0,163.34,115.49,115.49,0,0,1,0-163.34Z\" style=\"fill:#0DC15C;\"/><path d=\"m115.5 51.75a63.75 63.75 0 0 0-10.5 126.63v14.09a115.5 115.5 0 0 0-53.729 19.027 115.5 115.5 0 0 0 128.46 0 115.5 115.5 0 0 0-53.729-19.029v-14.084a63.75 63.75 0 0 0 53.25-62.881 63.75 63.75 0 0 0-63.65-63.75 63.75 63.75 0 0 0-0.09961 0z\" style=\"fill:#f2c280;\"/><path d=\"m141.74 195a114.93 114.93 0 0 1 37.912 16.45l0.07 0.05c-1.17 0.79-2.3601 1.55-3.5601 2.29a115.55 115.55 0 0 1-120.95 0.21q-2.0001-1.23-4.0002-2.54a114.79 114.79 0 0 1 38.002-16.5 116.21 116.21 0 0 1 15.791-2.49v-14.57c1.32 0.22 2.6501 0.39 4.0002 0.51 2.0001 0.19 4.0002 0.28 6.1202 0.29a64.333 64.33 0 0 0 8.8804-0.62c0.67003-0.09 1.3401-0.2 2.0001-0.31v14.69a118 118 0 0 1 15.741 2.54z\" style=\"fill:#000;\"/><path d=\"m79.292 212a3.4601 3.46 0 0 0 3.8902 5.07 3.3801 3.38 0 0 0 2.1001-1.61 3.4701 3.47 0 0 0-1.2801-4.72 3.4201 3.42 0 0 0-2.6201-0.34 3.5101 3.51 0 0 0-2.0901 1.6zm60.122 0.46a3.4901 3.49 0 0 0 1.21 4.7h0.06a3.4601 3.46 0 0 0 4.7202-1.27l0.07-0.13a3.4601 3.46 0 0 0-1.34-4.6 3.4601 3.46 0 0 0-2.5801-0.32 3.5301 3.53 0 0 0-2.1001 1.61zm9.8004 5.7 5.8602 5.87c-1.39 0.5-2.7901 1-4.2102 1.44l-4.4802-4.47a7.5203 7.52 0 0 1-1.9401 0.81 7.8303 7.83 0 0 1-6.0002-0.79 7.8703 7.87 0 0 1-2.9201-10.69v-0.07a7.8903 7.89 0 0 1 10.77-2.88l0.12 0.07a7.8603 7.86 0 0 1 2.7901 10.62v0.07zm-37.701-2.36-9.5004 9.51v4.9c-1.35-0.16-2.6801-0.33-4.0002-0.54v-6l0.58002-0.58 10.1-10.09a7.8703 7.87 0 1 1 2.8401 2.86zm7.3203-5.91a3.4601 3.46 0 1 0-1.6101 2.1 3.3801 3.38 0 0 0 1.6101-2.1zm-29.741 7.82 3.0901 3.1 0.59002 0.59v7.36c-1.3401-0.26-2.6801-0.55-4.0002-0.87v-4.84l-2.5101-2.51a7.5203 7.52 0 0 1-1.9401 0.81 7.8803 7.88 0 1 1 1.9101-14.43 7.8703 7.87 0 0 1 2.8901 10.75z\" style=\"fill:#fff;\"/><path d=\"m115.5 51.75c-38.702 5.3101-54.215 18.038-59.863 35.101\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m115.5 51.75c-7.8393 3.6337-5.5974 16.583-14.341 23.452\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m111.35 48.614c-22.634-6.9181-42.457-3.1988-55.733 2.5105\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m115.47 54.008c0.1965-6.7774-0.1436-26.309 0.05-38.184\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m68.874 28.177c34.115-3.382 41.987 13.321 45.17 19.602\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m116.49 48.69c2.8876-6.3019 10.358-21.518 43.469-22.326\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m116.92 51.766c1.5094 6.3991 3.4988 15.595 10.088 23.058\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m113.81 51.532c22.03-7.8674 46.709-7.3614 59.444-2.0465\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m114.53 52.278c36.226 4.8583 52.414 17.092 59.373 33.347\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:#004E4C;\"/><path d=\"m55.637 86.851c-4.1213 12.452-2.9877 27.213-1.777 43.084\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m55.614 51.124c-13.422 5.5019-21.908 16.409-24.712 28.774-1.8322 8.4632-1.9809 18.156-1.6096 28.486\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m173.26 49.486c24.917 10.399 26.707 36.537 27.209 59.62\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m173.9 85.625c5.4042 12.625 5.2413 27.675 4.5745 43.58\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m53.86 129.93c1.293 16.951 2.6738 35.169-2.1664 53.193\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m29.292 108.38c0.6173 17.177 2.6722 36.119 0.8158 54.108\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m200.47 109.11c0.3586 18.529-1.2751 36.94 1.9231 48.985\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m178.48 129.2c-0.7279 17.362-2.0563 35.743 2.6011 53.099\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:12;stroke:none;\"/><path d=\"m170.25 100c1.69 9.62-4.79 29.23-22.4 29.23-6.81 0-15-3.66-20.23-10-4.34-5.33-7.56-12.87-6.2-19.45 1.63-7.89 7.07-11.45 14.67-12.92a68.16 68.16 0 0 1 12.52-1c10.77 0 19.78 3.61 21.64 14.22z\" style=\"fill:#c4ffe4;stroke-width:3.99px;stroke:#000;\"/><path d=\"m60.75 100c-1.69 9.62 4.79 29.23 22.4 29.23 6.81 0 15-3.66 20.23-10 4.34-5.33 7.56-12.87 6.2-19.45-1.63-7.89-7.07-11.45-14.67-12.92a68.16 68.16 0 0 0-12.52-1c-10.77 0-19.78 3.61-21.64 14.22z\" style=\"fill:#c4ffe4;stroke-width:3.99px;stroke:#000;\"/><line x1=\"100.2\" x2=\"130.8\" y1=\"87.92\" y2=\"87.92\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3.99px;stroke:#000;\"/><path d=\"m109.87 101.73c0-2.59 2.52-4.69 5.63-4.69s5.63 2.1 5.63 4.69\" style=\"fill:none;stroke-width:3.99px;stroke:#000;\"/><path d=\"m94.19 136.84h42.632a3.7801 3.78 0 0 1 3.7802 3.78v3.22a15.231 15.23 0 0 1-15.211 15.16h-19.781a15.251 15.25 0 0 1-15.221-15.16v-3.22a3.8002 3.8 0 0 1 3.7802-3.78z\" style=\"fill:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;\"/><path d=\"m130.96 136.84v21.16m-30.911-21.16v21.16m10.34-21.16v22.16m10.31-22.2v22.2\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;stroke:#000;\"/></svg>"
  }
])

</script>

<style lang="less" scoped>
.im-content {
  height: 100%;
  width: 100%;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
  background: @im-list-bg;
  box-shadow: inset 5px 5px 4px @im-content-shadow1,
              inset -5px -5px 4px @im-content-shadow2;
  .content-win {
    width: 100%;
    height: 60%;
    .block {
      width: auto;
      height: auto;
      padding: 0px 15px;
      line-height: 10px;
      font-size: 16px;
      border-radius: 10px;
      position: relative;
      max-width: 350px;
      text-align: left;
      word-wrap: break-word;
    }
    .send-video {
      margin: 0 10px;
    }
    .mine-block {
      float: right;
      margin: 20px 0;
      display: flex;
      position: relative;
      font-size: 16px;
      .mine-image-load {
        position: absolute;
        left: -50px;
        top: 50%;
        transform: translateY(-50%);
      }
      .mine-load {
        position: absolute;
        left: -50px;
        top: 50%;
        transform: translateY(-50%);
      }
      .send-image {
        border-radius: 11px;
        max-width: 200px;
        overflow: hidden;
        max-height: 200px;
        width: 200px;
        height: auto;
        margin-right: 10px;
        cursor: pointer;
        background-color: #fff;
      }

      .block {
        // background: @primary-bgcolor4;
        // color: @primary-txcolor;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        margin-right: 10px;
        float: right;
        word-wrap: break-word;
      }

      .mine-avatar {
        width: 45px;
        height: 45px;
        float: right;
        margin-right: 15px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }

    .reciver-block {
      float: left;
      margin: 20px 0;
      display: flex;
      position: relative;
      .send-image {
        border-radius: 11px;
        max-width: 200px;
        overflow: hidden;
        max-height: 200px;
        width: 200px;
        height: auto;
        margin-left: 10px;
        cursor: pointer;
        background-color: #fff;
      }
      .reciver-avatar {
        width: 45px;
        height: 45px;
        margin-left: 15px;
        float: left;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .block {
        // background: @primary-bgcolor5;
        // color: @primary-txcolor3;
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
        margin-left: 10px;
        float: left;
        word-wrap: break-word;
      }
    }

    .other-block {
      display: flex;
      position: relative;
      padding: 10px;
      // background: @primary-bgcolor6;
      // color: @primary-txcolor4;
      border-radius: 15px;
      max-width: 400px;
      margin: 0 auto;
      margin-top: 10px;
      margin-bottom: 10px;
      span {
        display: inline-block;
        margin: 0 auto;
      }
    }
  }
  .head {
    height: 10%;
    padding: 0 20px;
    display: flex;
    width: 100%;
    align-items: center;
    .name {
      color: @txt-color;
      font-size: 16px;
      width: 100%;
      text-align: center;
    }
  }
  
}
</style>