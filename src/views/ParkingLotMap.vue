<template>
  <div ref="mapContainer" id="ooomap-container"></div>
</template>
<script setup lang="ts">
import '../../public/ooomap.min.js';
import { ref, onMounted } from 'vue';
const mapContainer = ref<HTMLDivElement>();
const OOOMap = ref<any>();

onMounted(() => {
  const map = new om.Map({
    container: mapContainer.value,
    appID: '14de8a19371f047fb9d00af3a60ca718',
    verifyUrl: 'https://www.ooomap.com/ooomap-verify/check/48c633d795c8f019b7f4bea83e991b48'
  });
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
})



</script>
<style lang="scss">
#ooomap-container{
  width: 100vw;
  height: 720px;
}
</style>