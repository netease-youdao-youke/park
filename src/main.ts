import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ant from "./plugin/ant";
import './reset.css';

createApp(App).use(router).use(ant).mount('#app')
