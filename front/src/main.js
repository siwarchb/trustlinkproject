import Vue from 'vue'
import App from './App.vue'
import router from './Routes'
import store from './store/index'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueBarcode from 'vue-barcode';
import VueHtmlToPaper from 'vue-html-to-paper';
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.component('barcode', VueBarcode);


Vue.prototype.moment = moment;

import moment from 'moment';
Vue.use(moment)

import $ from 'jquery'
Vue.use($)
const options = {
  "name": '_blank',
  "specs": [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  "styles": [
    "styles/app.scss"
  ]
}
Vue.use(VueHtmlToPaper, options);


Vue.prototype.moment = moment
Vue.filter('formatDate', function(value) {

  if (value) {
    return moment(String(value)).format("DD/MM/YYYY");
  }
});

Vue.use(Toast);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App), store
}).$mount('#app')
