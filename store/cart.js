export const state = () => ({
    itemCount: 0
})

// product name
// product id
// product price
// product review score
// product image url
// size number
// color code
// business name & username


const getDefaultState = () => {
    return {
        products: []
    }
}

const actions = {
    resetCartState (context, state) { context.commit('resetCartState', state) },
    setCartItems (context, payload) { context.commit('setCartItems', payload)},
    setItemCount (context, payload) {context.commit('setItemCount', payload)},
    addItemCount (context, payload) {context.commit('addItemCount', payload)},
    subtractItemCount (context, payload) {context.commit('subtractItemCount', payload)}
}

const getters = {
    GetCartItems: state => state.itemCount
}

const mutations = {
    resetCartState: (state) => Object.assign(state, getDefaultState()),
    setCartItems: (state, data) => {
        state.products = data
    },
    setItemCount: (state, data) => {
        state.itemCount = data
    },
    addItemCount: (state, data) => {
        state.itemCount = state.itemCount + 1
    },
    subtractItemCount: (state) => {
        state.itemCount = state.itemCount <= 1 ? 0 : state.itemCount - 1
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}