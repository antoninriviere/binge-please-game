import { WEBGL_ADD_GROUP, WEBGL_CLEAR_GROUP } from 'MutationTypes'
const state = {
    webglGroup: {}
}

const getters = {
    getWebGLGroup: (state) => () => state.webglGroup
}

const mutations = {
    [WEBGL_ADD_GROUP](state, group = { id: '', config: {} })
    {
        state.webglGroup = {
            id: group.id,
            config: group.config
        }
    },
    [WEBGL_CLEAR_GROUP](state)
    {
        state.webglGroup = {}
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
