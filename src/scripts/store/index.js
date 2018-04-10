import Vue from 'vue'
import Vuex from 'vuex'
import Config from 'Config'

import Game from './modules/game'
import Quiz from './modules/quiz'
import WebGL from './modules/webgl'

Vue.use(Vuex)

const debug = Config.environment !== 'production'

export default new Vuex.Store({
    modules: {
        Game,
        Quiz,
        WebGL
    },
    strict: debug
})
