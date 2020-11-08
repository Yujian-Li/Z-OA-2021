import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BoostrapVue from 'bootstrap-vue';

Vue.config.productionTip = false;

Vue.use(BoostrapVue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
