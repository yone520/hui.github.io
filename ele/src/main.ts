import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import locale from 'element-plus/lib/locale/lang/zh-cn';

createApp(App).use(ElementPlus, { locale }).mount('#app')
