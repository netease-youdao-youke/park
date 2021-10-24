
<script  setup lang="ts">

import exampleVideo from '/output.mp4';
import { ref, unref } from 'vue';
import { analyzeImage, initToken, reportVehicle, setToken } from '../api';

type VehicleInfo = {
  type: 'car' | 'carplate',
  location: {
    left: number;
    top: number;
    height: number;
    width: number;
  },
  probability: number
}

const count = ref(0);
const videoSrc = ref(exampleVideo);
const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();

const DETECT_SWITCHER = false;

const TOEKN_KEY = 'baiduToken';
const TOKEN_INFO = JSON.parse(localStorage.getItem(TOEKN_KEY) || "{}")
let token = TOKEN_INFO.access_token;
let expires = TOKEN_INFO.expires;
if (!token || expires >= Date.now()) {
  const res = await initToken();
  res.expires = Date.now() + res.expires_in;
  token = res.access_token;
  localStorage.setItem(TOEKN_KEY, JSON.stringify(res));
};
setToken(token);

const drawVehicles = (infoArr: VehicleInfo[]) => {
  const realCanvas = unref(canvasRef);
  if (!realCanvas) {
    return;
  }
  const ctx = realCanvas.getContext('2d');
  if (!ctx) {
    return;
  }
  ctx.strokeStyle = "#66ff66"
  ctx.lineWidth = 5;
  for (let i = 0; i < infoArr.length; i++) {
    const curVihicle = infoArr[i];
    if (curVihicle.type !== 'car') {
      continue;
    }
    const { location } = curVihicle;
    const { left, top, width, height } = location;
    ctx.rect(left, top, width, height);
    ctx.stroke();
  }
}

let lastTimeStamp = ref<null | number>(null);
const handleTimeUpdate = async (e: Event) => {
  const curTimeStamp = (e.timeStamp / 1000 | 0);
  const realCanvas = unref(canvasRef);
  const realVideo = unref(videoRef);
  const realLastTimeStamp = unref(lastTimeStamp);
  if (!realCanvas || !realVideo) {
    return;
  }
  if (curTimeStamp % 10 === 0 && realLastTimeStamp !== curTimeStamp) {
    realCanvas.height = realVideo.videoHeight ?? 0;
    realCanvas.width = realVideo.videoWidth ?? 0;
    lastTimeStamp.value = curTimeStamp;
    const ctx = realCanvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, realCanvas.width, realCanvas.height);
    ctx.drawImage(realVideo, 0, 0, realVideo.videoWidth ?? 0, realVideo.videoHeight ?? 0);
    const url = realCanvas.toDataURL("image/jpeg", 1.0);
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
    await reportVehicle(analyzeData);
    drawVehicles(analyzeData.vehicle_info);
  }
};

</script>


<template>
  <div class="presentation">
    <video
      id="presentation-video"
      :autoplay="true"
      controls
      :src="videoSrc"
      ref="videoRef"
      @timeupdate="handleTimeUpdate"
    ></video>
    <canvas id="presentation-canvas" ref="canvasRef"></canvas>
  </div>
</template>


<style scoped lang="scss">
.presentation {
  max-width: 100vw;
  overflow: hidden;
  #presentation-video {
    width: 100%;
  }
  #presentation-canvas {
    width: 100%;
  }
}
</style>