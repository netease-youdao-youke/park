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

		const TTA = async (data: any) => {
			const audio = new Audio();
			const text = `欢迎员工车辆进入园区,已为您推荐${data.data.name}车位, 即将为您导航`;
			const res = await textToAudio(text);
			let modal: any = null;
			audio.src = res;
			audio.oncanplay = () => {
				audio.play();
				modal = Modal.success({
					title: () => "识别成功",
					content: () =>
						h("div", {}, [
							h("p", "欢迎员工车辆京 A88888 号车牌进入园区，"),
							h("p", `已为您推荐${data.data.name}车位即将为您导航`),
						]),
				});
			};
			// 监听音频播放结束
			audio.addEventListener(
				"ended",
				async function () {
					const timer2 = setTimeout(() => {
						clearTimeout(timer2);
						modal.destroy();
						router.push({
							path: "/parkingLot",
							query: {
								name: data.data.name,
							},
						});
					}, 1000);
				},
				false
			);
		};

		const handleReconize = () => {
			state.spinning = true;
			const timer = setTimeout(async () => {
				clearTimeout(timer);
				state.spinning = false;
				const params = {
					parkLocationId: "1",
					plate: "da",
					carType: "car",
				};
				const regionRes = await getRegion(params);
				TTA(regionRes);
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
