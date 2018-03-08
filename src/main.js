import Vue from 'vue'
import App from './scripts/application'

Vue.config.productionTip = false

import './scripts/mixins/core-event-hub'

new Vue(App).$mount('#app')
