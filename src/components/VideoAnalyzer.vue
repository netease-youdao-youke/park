<script setup lang="ts">
import { ref, unref } from 'vue';
import video from '/output.mp4';
const videoSrc = ref(video);
const videoRef = ref();
const canvasRef = ref();
const imageRef = ref();

const count = ref(0);

const DETECT_SWITCHER = false;

let token = JSON.parse(localStorage.getItem('baiduToken') || "{}").access_token;

const initToken = async () => {
  if (token) {
    return token;
  } else {
    const result = await fetch('http://localhost:3001/api/oauth/2.0/token?grant_type=client_credentials&client_id=MwsTx2XCcGKhQM1xu4XjxBLI&client_secret=UiNskvdWaalxGYn4NwGpgtoHmV9dHh80', {
      mode: 'cors'
    });
    const jsonRes = await result.json();
    localStorage.setItem('baiduToken', JSON.stringify(jsonRes));
    return jsonRes.access_token;
  }
}

initToken().then(console.log)

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
    let paramUrl = url;
    paramUrl = paramUrl.replace(/\+/g, "%2B");
    paramUrl = paramUrl.replace(/\=/g, "&3D");
    const rawRes = await fetch(`http://localhost:3001/api/rest/2.0/image-classify/v1/vehicle_detect?access_token=${token}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `image=${paramUrl}`
    })
    const jsonRes = await rawRes.json();
    count.value += 1;
    console.log(jsonRes);
  }
};


</script>

<template>
  <video :autoplay="true" controls :src="videoSrc" ref="videoRef" @timeupdate="handleTimeUpdate"></video>
  <canvas ref="canvasRef"></canvas>
  <img ref="imageRef" />
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
