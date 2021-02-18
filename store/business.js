export const state = () => ({
	businessId: "",
	businessName: "",
	username: "",
	logo: "",
	coverPhoto: "",
	description: "",
	reviewScore: 0,
	address: {
        number: "",
        street: "",
        community: "",
        lga: "",
        state: "",
		country: "",
		busStop: "",
		
	},
	contact: {
		email: "",
		phone: [],
		whatsapp: {
			status: "",
			phone: ""
		}
	},
	businessCategories: [],
	reviewsArray: [],
	newNotificationCount: 0,
	newOrderCount: 0,
	subscription: {
		id: "",
		start: "",
		end: "",
		type: ""
	},
	inviteId: "",
	paystackPublicKey: "",
	instagramKey: "",
	instagramUserId: ""
});

const getDefaultState = () => {
	return {
		businessId: "",
		businessName: "",
		username: "",
		logo: "",
		coverPhoto: "",
		description: "",
		reviewScore: 0,
		address: {
			number: "",
			street: "",
			community: "",
			lga: "",
			state: "",
			country: "",
			busStop: "",
		},
		contact: {
			email: "",
			phone: [],
			whatsapp: {
				status: "",
				phone: ""
			}
		},
		businessCategories: [],
		reviewsArray: [],
		newNotificationCount: 0,
		newOrderCount: 0,
		subscription: {
			id: "",
			start: "",
			end: "",
			type: ""
		},
		inviteId: "",
		paystackPublicKey: "",
		instagramKey: "",
		instagramUserId: ""
	}
}


export const actions = {
	resetBusinessState (context, state) { context.commit('resetBusinessState', state) },
	setBusinessData (context, payload) { context.commit("setBusinessData", payload) },
	setBusinessContact (context, payload) { context.commit("setBusinessContact", payload) },
	setBusinessAddress (context, payload) { context.commit("setBusinessAddress", payload) },
	setBusinessCategories (context, payload) { context.commit("setBusinessCategories", payload) },
	setNotificationData (context, payload) { context.commit("setNotificationCount", payload )},

	setBusinessReviews (context, payload) {context.commit("setBusinessReviews", payload)},

	setSubscription(context, payload) {context.commit('setSubscription', payload)},

	setInviteBusinessId(context, payload) {context.commit('setInviteBusinessId', payload)},

	setInstagramkey(context, payload) {context.commit('setInstagramkey', payload)},
	setInstagramUserId(context, payload) {context.commit('setInstagramUserId', payload)}
}

export const getters = {
	GetBusinessStatus: state => state.businessId,
	GetBusinessDetails: state => state
}

export const mutations = {
	setBusinessData: (state, dataObject) => {
		if (dataObject.businessId != undefined) state.businessId = dataObject.businessId
		if (dataObject.businessName != undefined) state.businessName = dataObject.businessName
		if (dataObject.username != undefined) state.username = dataObject.username
		if (dataObject.logo != undefined) { state.logo = dataObject.logo }
		if (dataObject.coverPhoto != undefined) state.coverPhoto = dataObject.coverPhoto
		if (dataObject.description != undefined) state.description = dataObject.description
		if (dataObject.reviewScore != undefined) state.reviewScore = dataObject.reviewScore
		if (dataObject.paystackPublicKey != undefined) state.paystackPublicKey = dataObject.paystackPublicKey
	},
	setBusinessAddress: (state, dataObject) => {
		if (dataObject.number != undefined) state.address.number = dataObject.number
		if (dataObject.street != undefined) state.address.street = dataObject.street
		if (dataObject.community != undefined) state.address.community = dataObject.community
		if (dataObject.lga != undefined) state.address.lga = dataObject.lga
		if (dataObject.state != undefined) state.address.state = dataObject.state
		if (dataObject.country != undefined) state.address.country = dataObject.country
		if (dataObject.busStop != undefined) state.address.busStop = dataObject.busStop
	},
	setBusinessContact: (state, dataObject) => {
		if (dataObject.email != undefined) state.contact.email = dataObject.email
		if (dataObject.phone != undefined) {
			if (dataObject.phone.length > 0) {
				state.contact.phone = []
				let newPhoneArray = [];
				dataObject.phone.forEach(element => {
					newPhoneArray.push(element.trim())
				});

				state.contact.phone = newPhoneArray
			}
		}
		
		if (dataObject.whatsapp != undefined) {
			if (dataObject.whatsapp.phone != undefined) {
				state.contact.whatsapp.phone = dataObject.whatsapp.phone.trim()
				state.contact.whatsapp.status = dataObject.whatsapp.status
			}
		}
	},
	setBusinessCategories: (state, dataObject) => {
		if (dataObject.length > 0) {
			
			let categories = []

			for (const [index, data] of dataObject.entries()) {
				categories[index] = {
					categoryId: data.categoryId,
					categoryName: data.categoryName,
					hide: data.hide,
					itemId: data.itemId,
					subcategories: []
				};

				for (let subcategoryData of data.subcategories) {
					categories[index].subcategories.push({
						hide: subcategoryData.hide,
						itemId: subcategoryData.itemId,
						subcategoryId: subcategoryData.subcategoryId,
						subcategoryName: subcategoryData.subcategoryName,
					});				
				}
			}

			state.businessCategories = categories

		}
	},
	setNotificationCount: (state, dataObject) => {
		if (dataObject.newNotificationCount != undefined) state.newNotificationCount = dataObject.newNotificationCount
		if (dataObject.newOrderCount != undefined) state.newOrderCount = dataObject.newOrderCount
	},

	setBusinessReviews: (state, dataObject) => {
		if (dataObject.totalReviewScore != undefined) state.reviewScore = dataObject.totalReviewScore;

		if (dataObject.review != undefined) state.reviewsArray = dataObject.review
	},

	setSubscription: (state, payload) => {
		if (payload.id != undefined) state.subscription.id = payload.id
		if (payload.start != undefined) state.subscription.start = payload.start
		if (payload.end != undefined) state.subscription.end = payload.end
		if (payload.type != undefined) state.subscription.type = payload.type
	},

	setInviteBusinessId: (state, payload) => {
		state.inviteId = payload
	},

	setInstagramkey: (state, payload) => {
		state.instagramKey = payload
	},

	setInstagramUserId: (state, payload) => {
		state.instagramUserId = payload
	},

	resetBusinessState: (state) => Object.assign(state, getDefaultState())
}

export default {
    state,
    getters,
    actions,
    mutations
}