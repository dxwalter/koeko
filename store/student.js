const state = () => ({
    userToken: "",
    fullname: "",
    email: "",
    phone: "",
    userId: "",
    displayPicture: "",
    isLoggedIn: false,
    oneSignalId: ""

});

const getDefaultState = () => {
	return {
        userToken: "",
        fullname: "",
        email: "",
        phone: "",
        userId: "",
        displayPicture: "",
        isLoggedIn: false,
        oneSignalId: ""
	}
}

const actions = {
    resetStudentState (context, state) { context.commit('resetStudentState', state)},
    setAnonymousId (context, payload) { context.commit('setAnonymousId',  payload)},
    setCustomerData (context, payload) { context.commit('setCustomerData', payload)},
    changeLoginStatus (context, payload) { context.commit('changeLoginStatus', payload) },
    setNotificationCount (context, payload) { context.commit('setNotificationCount', payload) }
}


const getters = {
    GetAnonymousId: state => state.anonymousId,
    GetLoginStatus: state => state.isLoggedIn,
    GetCustomerDetails: state => state,
 }


const mutations = {
    setAnonymousId: (state, id) => { state.anonymousId = id},
    changeLoginStatus: (state, status) => { state.isLoggedIn = status },
    setCustomerData: (state, dataObject) => {
        if (dataObject.fullname != undefined) state.fullname = dataObject.fullname
        if (dataObject.email != undefined) state.email = dataObject.email
        if (dataObject.userId != undefined) state.userId = dataObject.userId
        if (dataObject.userToken != undefined) state.userToken = dataObject.userToken
        if (dataObject.phone != undefined) state.phone = dataObject.phone
        if (dataObject.displayPicture != undefined) state.displayPicture = dataObject.displayPicture
    },
    setNotificationCount: (state, count) => {
        state.newNotificationCount = count
    },
    resetStudentState: (state) => Object.assign(state, getDefaultState())
}

export default {
    state,
    getters,
    actions,
    mutations
}