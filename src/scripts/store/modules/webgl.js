import { WEBGL_ADD_GROUP, WEBGL_CLEAR_GROUP } from 'MutationTypes'
const state = {
    webglGroup: ''
}

const getters = {
    getWebGLGroup: (state) => () => state.webglGroup
}

const mutations = {
    [WEBGL_ADD_GROUP](state, group)
    {
        state.webglGroup = group
    },
    [WEBGL_CLEAR_GROUP](state)
    {
        console.log('clear state')
        state.webglGroup = ''
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
