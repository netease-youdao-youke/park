<template>
  <a-config-provider :locale="locale">
    <suspense>
      <router-view></router-view>
    </suspense>
  </a-config-provider>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default defineComponent({
  name: "App",
  setup() {
    return {
      locale: zhCN
    };
  }
});
</script>