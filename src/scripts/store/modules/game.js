import { INCREMENT_SCORE, SET_CURRENT_TIME } from 'MutationTypes'

const state = {
    score: 0,
    currentTime: 0
}

const getters = {
    getScore: (state) => () => state.score
}

const mutations = {
    [INCREMENT_SCORE](state, increment)
    {
        console.log('increment score', increment)
        state.score += increment
    },
    [SET_CURRENT_TIME](state, time)
    {
        state.currentTime = time
    }
}

const actions = {

}

export default {
    state,
    getters,
    mutations,
    actions
}
