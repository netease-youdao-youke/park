
<script  setup lang="ts">

import exampleVideo from '/output.mp4';
import { ref, unref } from 'vue';
import { analyzeImage, initToken } from '../api';

const count = ref(0);
const videoSrc = ref(exampleVideo);
const videoRef = ref();
const canvasRef = ref();
const imageRef = ref();

const DETECT_SWITCHER = false;

const TOEKN_KEY = 'baiduToken';
let token = JSON.parse(localStorage.getItem(TOEKN_KEY) || "{}").access_token;
if (!token) {
  const res = await initToken();
  token = res.access_token;
  localStorage.setItem(TOEKN_KEY, JSON.stringify(res));
};

let lastTimeStamp: null | number = null;
const handleTimeUpdate = async (e: Event) => {
  const curTimeStamp = (e.timeStamp / 1000 | 0);
  const realCanvas = unref(canvasRef);
  const realVideo = unref(videoRef);
  const realImg = unref(imageRef);
  if (curTimeStamp % 10 === 0 && lastTimeStamp !== curTimeStamp) {
    realCanvas.height = realVideo.videoHeight ?? 0;
    realCanvas.width = realVideo.videoWidth ?? 0;
    lastTimeStamp = curTimeStamp;
    const ctx = realCanvas.getContext('2d');
    ctx.drawImage(realVideo, 0, 0, realVideo.videoWidth ?? 0, realVideo.videoHeight ?? 0);
    const url = realCanvas.toDataURL("image/jpeg", 1.0);
    realImg.src = url;
    if (!DETECT_SWITCHER) {
      console.warn('detect vehicle switcher close');
    }
    if (unref(count) >= 1) {
      console.warn('over api limitation');
      return;
    }
    let imageBase64 = url.replace(/\+/g, "%2B").replace(/\=/g, "&3D");
    const analyzeData = await analyzeImage({
      image: imageBase64,
    });
    count.value += 1;
    console.log(analyzeData);
  }
};
console.log('111')

</script>


<template>
  <div class="presentation">
    <video
      class
      :autoplay="true"
      controls
      :src="videoSrc"
      ref="videoRef"
      @timeupdate="handleTimeUpdate"
    ></video>
    <canvas ref="canvasRef"></canvas>
    <img ref="imageRef" />
  </div>
</template>


<style scoped lang="scss">
.presentation {
  max-width: 100vw;
  overflow: hidden;
  #presentation-video {
    width: 100%;
  }
}
</style>