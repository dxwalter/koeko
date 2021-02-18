const state = () => ({
    userToken: "",
    fullname: "",
    email: "",
    phone: "",
    userId: "",
    displayPicture: "",
    reviewScore: 0,
    review: [],
    address: {
        number: "",
        street: "",
        community: "",
        state: "",
        busStop: "",
    },
    anonymousId: "",
    isLoggedIn: false,
    emailNotification: 1,
    newNotificationCount: 0,
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
        reviewScore: "",
        review: [],
        address: {
            number: "",
            street: "",
            community: "",
            state: "",
            busStop: "",
        },
        anonymousId: "",
        isLoggedIn: false,
        emailNotification: 1,
        newNotificationCount: 0,
        oneSignalId: ""
	}
}

const actions = {
    resetCustomerState (context, state) { context.commit('resetCustomerState', state)},
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
        if (dataObject.reviewScore != undefined) state.reviewScore = dataObject.reviewScore
        if (dataObject.emailNotification != undefined) state.emailNotification = dataObject.emailNotification

        if (dataObject.address != undefined) {
            state.address.busStop = dataObject.address.busStop
            state.address.number = dataObject.address.number
            state.address.street = dataObject.address.street
            state.address.community = dataObject.address.community
            state.address.state = dataObject.address.state
        }

    },
    setNotificationCount: (state, count) => {
        state.newNotificationCount = count
    },
    resetCustomerState: (state) => Object.assign(state, getDefaultState())
}

export default {
    state,
    getters,
    actions,
    mutations
}