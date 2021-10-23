
<template>
  <div class="dashboard-container">
    <div class="content" v-for="item, index in data" :key="index">
      <p class="title">
        <FireOutlined :style="{ color: '#FE525E'}" />
        {{item.floor}}
      </p>
      <ul class="ul-wrapper">
         <li class="list-item" v-for="list, idx in item.data" :key="idx">
           <span>{{list.floorName}}余位：</span>
           <span><strong>{{list.remain}}</strong> 个</span>
         </li>
       </ul>
    </div>
   
  </div>
</template>

<script lang="ts">
import { FireOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "App",
  components: { FireOutlined },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup() {

  }
});
</script>

<style scoped>
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

.content .title::before {
  position: absolute;
  bottom: 3px;
  left: -2px;
  content: '';
  height: 4px;
  width: 48px;
  border-radius: 16px;
}

.list-item {
  width: 45%;
  height: 80px;
  display: inline-flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
  margin-bottom: 20px;
  border-radius: 16px;
  background: #FEE6E5;
  color: #FE525E;
}
</style>
