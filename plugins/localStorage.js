import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  createPersistedState({
    key: 'cudua-store',
  })(store)
}