import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

Vue.config.productionTip = false
Vue.use(ElementUI, {locale})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const firebaseConfig = {
  apiKey: "************************",
  authDomain: "*****************.firebaseapp.com",
  projectId: "************************",
  storageBucket: "************************.appspot.com",
  messagingSenderId: "*****************",
  appId: "**************************",
  measurementId: "*********************"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
