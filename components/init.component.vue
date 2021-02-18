<template>
	<div>

	</div>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex';
import { GET_ANONYMOUS_ID } from '~/graphql/customer';

export default {
    name: 'INITCOMPONENT',
        data: function() {
      return {
		anonymousId: "",
		isLoggedIn: false
      }
	},
    computed: {
		...mapGetters({
			'GetLoginStatus': 'customer/GetLoginStatus',
			'GetAnonymousId': 'customer/GetAnonymousId'
		}),
		LoginStatus () {
			this.isLoggedIn = this.GetLoginStatus
		}
    },
    methods: {
		...mapActions({
			'GetAnonymousIdFromApi': 'customer/GetAnonymousIdFromApi',
			'setAnonymousId': 'customer/setAnonymousId'
		}),
		setAnonymousId: async function () {

			let getAnonymousIdFromStorage = localStorage.getItem('CUDUA_ANONYMOUS_ID');	

			if (getAnonymousIdFromStorage == undefined || getAnonymousIdFromStorage.length < 1) {

				let getId = await this.$apollo.query({
					query: GET_ANONYMOUS_ID
				})

				let result = getId.data.GetAnonymousId;
				if (result.success) {
					// commit and save to local storage and store
					this.$store.dispatch('customer/setAnonymousId', result.anonymousId);
					this.anonymousId = result.anonymousId;
					localStorage.setItem('CUDUA_ANONYMOUS_ID', this.anonymousId)

				} else {
					this.$initiateNotification('error', "Network error", getId.message);
				}

			} else {
				this.anonymousId = getAnonymousIdFromStorage;
				this.$store.dispatch('customer/setAnonymousId', this.anonymousId);
			}
		}
	},
    created: async function () {

		if (process.browser) {
			this.LoginStatus
			// if user is not logged in, create anonymous id
			if (this.isLoggedIn == false) this.setAnonymousId()
		}

    }
}
</script>

<style>

</style>