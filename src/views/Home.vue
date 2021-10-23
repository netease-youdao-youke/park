<template>
	<div class="home-contianer">
		<div class="top-wrapper">
			<DashboardOutlined :style="{fontSize: '35px', color: '#fff'}"></DashboardOutlined>
			<p class="title">实时余位</p>
		</div>
		<div class="body-wrapper">
			<Dashboard :data="dataList"></Dashboard>
		</div>
		<div class="footer-wrapper">
			<div class="recommed-btn">车位推荐</div>
		</div>
	</div>
</template>

<script lang="ts">
import { DashboardOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, toRefs } from "vue";
import Dashboard from '../components/Dashboard.vue';

export default defineComponent({
  name: "App",
  components: { Dashboard, DashboardOutlined },
  setup() {
	// mock
	const dataList: any[] = [
		{
			floor: '负一层',
			data: [
				{
					floorName: 'A座',
					remain: 234
				},
				{
					floorName: 'B座',
					remain: 1234
				},
				{
					floorName: 'C座',
					remain: 2321
				},
				{
					floorName: 'D座',
					remain: 123
				}
			]
		},
		{
			floor: '负二层',
			data: [
				{
					floorName: 'A座',
					remain: 12
				},
				{
					floorName: 'B座',
					remain: 3213
				},
				{
					floorName: 'C座',
					remain: 3
				},
				{
					floorName: 'D座',
					remain: 4
				}
			]
		}
	]

	const state = reactive<any>({
		dataList: dataList
	})

    return {
		...toRefs(state)
    };
  }
});
</script>
<style>
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
	padding-top: 15px;
	height: calc(100vh - 95px);
  	overflow-y: scroll;
}

.recommed-btn {
	position: fixed;
	bottom: 10px;
	left: 35%;
	z-index: 100;
	width: 30%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	background: #fe525e;
	color: #fff;
	border-radius: 16px;
}
</style>