<template>
	<div class="simulation-into-car">
		<a-spin :spinning="spinning">
			<a-button @click="handleReconize">模拟车辆进入</a-button>
		</a-spin>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, h } from "vue";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { textToAudio, getRegion } from "../api";

export default defineComponent({
	name: "simulation-into-car",
	setup() {
		const state = reactive({
			spinning: false,
		});
		const router = useRouter();

		const TTA = async () => {
			const audio = new Audio();
			const text = "欢迎员工车辆京A8 8 8 8 8号车牌进入园区正在为您推荐车位请您稍等";
			const res = await textToAudio(text);
			audio.src = res;
			audio.oncanplay = () => {
				audio.play();
			};
			// 监听音频播放结束
			audio.addEventListener(
				"ended",
				async function () {
					const params = {
						parkLocationId: "1",
						plate: "da",
						carType: "car",
					};

					// 获取车位推荐
					const regionRes = await getRegion(params);
					const timer2 = setTimeout(() => {
						clearTimeout(timer2);
						modal.update({
							title: "推荐成功",
							content: `已为您推荐${regionRes.data.name}的车位，即将为您导航`,
						});

						const timer3 = setTimeout(() => {
							modal.destroy();
							clearTimeout(timer3);
							router.push({
								path: "/parkingLot",
								query: {
									name: regionRes.data.name,
								},
							});
						}, 1500);
					}, 1500);
				},
				false
			);
			const modal = Modal.success({
				title: () => "识别成功",
				content: () =>
					h("div", {}, [
						h("p", "欢迎京 A88888 号车牌进入园区，"),
						h("p", "正在为您推荐车位，请您稍等..."),
					]),
			});
		};

		const handleReconize = () => {
			state.spinning = true;
			const timer = setTimeout(() => {
				clearTimeout(timer);
				state.spinning = false;
				TTA();
			}, 1000);
		};

		return {
			...toRefs(state),
			handleReconize,
		};
	},
});
</script>

<style lang="scss">
.simulation-into-car {
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
}

@media (max-width: 767px) {
	.ant-modal-wrap {
		.ant-modal {
			max-width: calc(100vw - 60px);
		}
	}
}

.ant-modal-wrap {
	.ant-modal-confirm-btns {
		display: none;
	}
}
</style>
