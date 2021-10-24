
<template>
  <div class="dashboard-container">
    <div class="content">
      <p class="title">
        <FireOutlined :style="{ color: '#FE525E' }" />
        <span>楼层:</span>
        <span class="floor-num">{{ props.data.floor }}</span>
      </p>
      <ul class="ul-wrapper">
        <li class="list-item" v-for="region, idx in props.data.parkRegionDetails" :key="idx">
          <p class="region-title">{{ region.name }}</p>
          <div class="region-info">
            <div class="region-info-item">总车位：{{ region.carportNum }}</div>
            <div class="region-info-item">剩余车位：{{ region.carportReserveNum }}</div>
            <div class="region-info-item">已锁车位：{{ region.carportReserveNum }}</div>
            <div class="region-info-item">占用位数：{{ region.carportUsedNum }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FireOutlined } from '@ant-design/icons-vue'
import { defineProps } from 'vue';

const props = defineProps<{
  data: {
    floor: number;
    parkRegionDetails: Array<{
      name: string;
      carportNum: number;
      carportReserveNum: number;
      carportUsableNum: number;
      carportUsedNum: number;
    }>
  }
}>();


</script>

<style scoped lang="scss">
.ul-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;
  padding: 0 5%;
}

.content .title {
  position: relative;
  margin-left: 5%;
  font-weight: 600;
}

.floor-num {
  font-size: 30px;
  font-style: italic;
  margin-left: 10px;
}

.content .title::before {
  position: absolute;
  bottom: 3px;
  left: -2px;
  content: "";
  height: 4px;
  width: 48px;
  border-radius: 16px;
}

.list-item {
  width: 45%;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 16px;
  background: #fee6e5;
  color: #fe525e;
  padding: 20px;
  .region-title {
    width: 100%;
  }
  .region-info {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .region-info-item {
      width: 50%;
    }
  }
}
</style>
