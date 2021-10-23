import { ConfigProvider } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";


const ant = {
  install(Vue: any): void {
    Vue.component(ConfigProvider.name, ConfigProvider);
  }
};
export default ant;