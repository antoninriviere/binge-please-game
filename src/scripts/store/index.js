import Vue from 'vue'
import Vuex from 'vuex'
import Config from 'Config'

Vue.use(Vuex)

const debug = Config.environment !== 'production'

export default new Vuex.Store({
    modules: {
    },
    strict: debug
})
