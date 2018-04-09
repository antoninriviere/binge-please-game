import { INCREMENT_SCORE } from 'MutationTypes'

const state = {
    score: 0
}

const getters = {
    getScore: (state) => () => state.score
}

const mutations = {
    [INCREMENT_SCORE](state)
    {
        state.score ++
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
