<template>
  <div ref="mapContainer" id="ooomap-container"></div>
  <div id="goPresentation" @click="handleGoPresentation">跳转后台</div>
</template>
<script setup lang="ts">
import '../../public/ooomap.min.js';
import '../../public/comp_floors.js';
import { ref, onMounted, onUnmounted } from 'vue';
import { getParkingDetail } from '../api';
import { useRouter } from 'vue-router';

const router = useRouter();

const mapContainer = ref<HTMLDivElement>();
const OOOMap = ref<any>();
const timer = ref(0);

const handleGoPresentation = () => {
  router.push({
    path: "/presentation",
  });
}

onMounted(() => {
  const map = new om.Map({
    container: mapContainer.value,
    viewMode: "2d",
    viewAngle: 0,
    appID: '14de8a19371f047fb9d00af3a60ca718',
    verifyUrl: 'https://www.ooomap.com/ooomap-verify/check/48c633d795c8f019b7f4bea83e991b48'
  });
  var floorsComp = new Comp_floors({
    // 必填, 组件的容器, Dom对象
    target: document.body,

    // 此组件的 props 均为可选属性, 可不填
    props: {
      hasOutdoor: true,
      style: "left: 10px;bottom: 60px",
    },
  });
  floorsComp.bind(map);
  map.on('ready', () => {
    console.log('ooomap is ready');
  })
  map.on('pick', (node) => {
    console.log('ooomap click', node);
  })
  OOOMap.value = map;
  window.addEventListener('resize', () => {
    map.view.resize();
  })
  timer.value = window.setInterval(async () => {
    console.log(await getParkingDetail({ parkLocationId: 1 }));
  }, 1000);
  setTimeout(() => {
    document.querySelectorAll(".floorWrap .theContainer div")[0].click();
  }, 1000);
})

onUnmounted(() => {
  window.clearInterval(timer.value);
})



</script>
<style lang="scss">
#ooomap-container {
  width: 100vw;
  height: 720px;
}
#goPresentation {
  position: fixed;
  right: 5%;
  top: 5%;
  cursor: default;
  color: white;
}
</style>