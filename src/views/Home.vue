<template>
	<div class="home-contianer">
		<div class="top-wrapper">
			<DashboardOutlined :style="{fontSize: '35px', color: '#08c'}"></DashboardOutlined>
			<p class="title">实时余位</p>
		</div>
		<div class="body-wrapper">
			<Dashboard></Dashboard>
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

		const state = reactive<any>({
			title: 'home'
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
	background: linear-gradient(
      180deg,
      rgb(0,136,204, 0.6) 0.5%,
      rgb(49 175 243 / 20%) 100%
    )
}

.top-wrapper .title {
	margin: 0;
	color: #08c;
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
	background: #56b2df;
	color: #fff;
	border-radius: 16px;
}
</style>