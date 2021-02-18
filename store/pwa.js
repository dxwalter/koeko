const state = () => ({
    timeToUpdate: 0,
    timeToInstall: 0
})

const getDefaultState = () => {
    return {
        timeToUpdate: 0,
        timeToInstall: 0
    }
}

const actions = {
    resetPwaState (context, state) { context.commit('resetPwaState', state)},
    setTimeToUpdate (context, payload) { context.commit('setTimeToUpdate',  payload)},
    setTimeToInstall (context, payload) { context.commit('setTimeToInstall',  payload)}
}

const getters = {
    GetPwaTimeStamp: state => state
}

const mutations = {
    setTimeToUpdate: (state, timeStamp) => { state.timeToUpdate = timeStamp},
    setTimeToInstall: (state, timeStamp) => { state.timeToInstall = timeStamp},
    resetPwaState: (state) => Object.assign(state, getDefaultState())
}

export default {
    state,
    getters,
    actions,
    mutations
}