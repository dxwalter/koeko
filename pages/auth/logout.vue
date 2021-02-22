<template>
  
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'LOGOUT',
    data: function () {
        return {
            refresh: 0
        }
    },
    methods: {

        resetCustomerState: async function() {
            await this.$store.dispatch('student/resetStudentState');  
            this.$store.dispatch('student/setCustomerData', {
                isLoggedIn: false
            });
            return this.$router.push('/')
        } 
    },
    created: async function () {
        if (process.browser) {
            this.resetCustomerState()
        }
    }
}
</script>

<style>

</style>