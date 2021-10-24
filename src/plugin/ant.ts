import { ConfigProvider, Button, Spin, Alert } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";


const ant = {
  install(Vue: any): void {
    Vue.component(ConfigProvider.name, ConfigProvider);
    Vue.component(Button.name, Button);
    Vue.component(Spin.name, Spin);
    Vue.component(Alert.name, Alert);
  }
};
export default ant;