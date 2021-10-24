
<script  setup lang="ts">
// import exampleVideo from '/output.mp4';
import { ref, unref, onMounted, onUnmounted } from 'vue';
import { analyzeImage, getParkingDetail, initToken, reportVehicle, setBaiduOpenToken, setToken, textToAudio } from '../api';
import Dashboard from '../components/Dashboard.vue';
import { DashboardOutlined } from '@ant-design/icons-vue';


type VehicleInfo = {
	type: "car" | "carplate";
	location: {
		left: number;
		top: number;
		height: number;
		width: number;
	};
	probability: number;
};

const count = ref(0);
const title = ref("杭州网易地下车库A2停车信息")
const parkingData = ref();
const loopTimer = ref(0);

const videoSrc = ref(exampleVideo);
const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();



const DETECT_SWITCHER = false;

const AI_TOEKN_KEY = "baiduAIToken";
const OPEN_TOKEN_KEY = "baiduOpenToken";

const TOKEN_INFO = JSON.parse(localStorage.getItem(AI_TOEKN_KEY) || "{}");
let token = TOKEN_INFO.access_token;
let expires = TOKEN_INFO.expires;
if (!token || expires <= Date.now()) {
	const res = await initToken();
	res.expires = Date.now() + res.expires_in;
	token = res.access_token;
	localStorage.setItem(AI_TOEKN_KEY, JSON.stringify(res));
}
setToken(token);

const OPEN_TOKEN_INFO = JSON.parse(localStorage.getItem(OPEN_TOKEN_KEY) || "{}");
let openToken = OPEN_TOKEN_INFO.access_token;
let open_expires = OPEN_TOKEN_INFO.expires;
if (!openToken || open_expires <= Date.now()) {
	const res = await initToken();
	res.expires = Date.now() + res.expires_in;
	openToken = res.access_token;
	localStorage.setItem(OPEN_TOKEN_KEY, JSON.stringify(res));
}
setBaiduOpenToken(openToken);

const drawVehicles = (infoArr: VehicleInfo[]) => {
	const realCanvas = unref(canvasRef);
	if (!realCanvas) {
		return;
	}
	const ctx = realCanvas.getContext("2d");
	if (!ctx) {
		return;
	}
	ctx.strokeStyle = "#66ff66";
	ctx.lineWidth = 5;
	for (let i = 0; i < infoArr.length; i++) {
		const curVihicle = infoArr[i];
		if (curVihicle.type !== "car") {
			continue;
		}
		const { location } = curVihicle;
		const { left, top, width, height } = location;
		ctx.rect(left, top, width, height);
		ctx.stroke();
	}
};

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
    return;
    const analyzeData = await analyzeImage({
      image: imageBase64,
    });
    count.value += 1;
    console.log(analyzeData);
    drawVehicles(analyzeData.vehicle_info);
    await reportVehicle({
      ...analyzeData,
      cameraId: 'aaa',
    });
  }
};

const TTA = async () => {
	const audio = new Audio();
	const res = await textToAudio("欢迎网易员工Netease");
	console.log(res);
	audio.src = res;
	audio.oncanplay = () => {
		audio.play();
	};
};

const updateParkingInfo = async () => {
  const res = await getParkingDetail({ parkLocationId: 1 });
  console.log(res);
  parkingData.value = res.data.parkFloorDetails;
}
onMounted(() => {
  // TTA();
});

onMounted(() => {
  loopTimer.value = window.setInterval(updateParkingInfo, 1000);
});

onUnmounted(() => {
  window.clearInterval(loopTimer.value);
});

</script>

<template>
  <div class="presentation">
    <div class="left-part">
      <div class="top-wrapper">
        <DashboardOutlined :style="{ fontSize: '35px', color: '#fff' }"></DashboardOutlined>
        <p class="title">实时余位</p>
      </div>
      <div class="body-wrapper">
        <Dashboard :data="item" v-for="item in parkingData" :key="item.floor"></Dashboard>
      </div>
    </div>
    <div class="right-part">
      <div class="page-title">{{ title }}</div>
      <p class="part-title">实时视频信息</p>
      <video
        id="presentation-video"
        :autoplay="true"
        controls
        :src="videoSrc"
        ref="videoRef"
        @timeupdate="handleTimeUpdate"
      ></video>
      <p class="part-title">实时车辆检测(10 秒/次)</p>
      <canvas id="presentation-canvas" ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">
.presentation {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  .left-part {
    flex-grow: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    .top-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 80px;
      background: #fe525e;
    }

    .top-wrapper .title {
      margin: 0;
      color: #fff;
    }

    .body-wrapper {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
    }
  }

  .right-part {
    min-width: 200px;
    width: 40%;
    height: 100%;
    .page-title {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;
      width: 100%;
      padding: 15px;
      background: #fe525e;
      color: #fff;
      text-align: center;
      margin: 0;
      padding: 0;
      font-weight: bold;
    }
    .part-title {
      text-indent: 50px;
      font-weight: bold;
      margin: 0;
      font-size: 16px;
    }
    #presentation-video {
      width: 100%;
      height: 40%;
      object-fit: contain;
    }
    #presentation-canvas {
      width: 100%;
      height: 40%;
      object-fit: contain;
    }
  }
}
</style>
