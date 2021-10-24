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
import { Modal } from 'ant-design-vue';
export default defineComponent({
  name: 'simulation-into-car',
  setup() {
    const state = reactive({
      spinning: false,
    })
    const router = useRouter();
    
    const handleReconize = () => {
      state.spinning = true;
      const timer = setTimeout(() => {
        clearTimeout(timer)
        state.spinning = false;
        const modal = Modal.success({
          title: () => '识别成功',
          content: () => h('div', {}, [
          h('p', '欢迎京 A88888 号车牌进入园区，'),
          h('p', '正在为您推荐车位，请您稍等...'),
          ]),
        });
        const timer2 = setTimeout(() => {
          modal.destroy();
          clearTimeout(timer2)
          router.push({path: '/parkingLot'})
        }, 500)
      }, 1000)
    }
		
    return {
      ...toRefs(state),
      handleReconize
    }
  }
})
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