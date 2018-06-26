import { INCREMENT_SCORE, SET_CURRENT_TIME, SET_PLACE } from 'MutationTypes'

const state = {
    score: 0,
    currentTime: 0,
    place: 0
}

const getters = {
    getScore: (state) => () => state.score,
    getPlace: (state) => () => state.place
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
    },
    [SET_PLACE](state, place)
    {
        state.place = place
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
