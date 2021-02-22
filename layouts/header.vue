<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <n-link to="/" class="navbar-brand">
                    <img src="~/assets/images/koeko-logo.png" alt="" srcset="">
                </n-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse d-flex-right" id="navbarSupportedContent">

                <ul class="navbar-nav mb-lg-12">

                    <li class="nav-item" v-show="!isLoggedIn">
                        <n-link prefetch class="nav-link active" to="/">Home</n-link>
                    </li>

                    <li class="nav-item" v-show="isLoggedIn">
                        <n-link prefetch class="nav-link active" to="/courses">All Courses</n-link>
                    </li>

                    <li class="nav-item" v-show="!isLoggedIn">
                        <n-link prefetch class="nav-link active" to="/auth/sign-in">Sign in</n-link>
                    </li>


                    <li class="nav-item" v-show="isLoggedIn">
                        <n-link class="nav-link active" to="/courses/enrolled-courses">Enrolled courses</n-link>
                    </li>

                    <li class="nav-item" v-show="isLoggedIn">
                        <n-link class="nav-link active" to="/profile">My profile</n-link>
                    </li>

                    <li class="nav-item" v-show="isLoggedIn">
                        <n-link class="nav-link active" to="/auth/logout">Logout</n-link>
                    </li>


                    <li class="nav-item" v-show="!isLoggedIn">
                        <n-link to="/courses" class="btn btn-primary width-100">All courses</n-link>
                    </li>
                </ul>


                </div>
            </div>
        </nav>
        <NOTIFICATION></NOTIFICATION>
        <Nuxt />
    </div>
</template>

<script>
import NOTIFICATION from '~/components/notification/notification.vue'; 

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    components: {
        NOTIFICATION
    },
	data: function() {
        return {
            isLoggedIn: false,
            accessToken: "",
        }
    },
    transition: {
        name: 'page',
    },
    methods: {
        ...mapGetters({
            'GetLoginStatus': 'student/GetLoginStatus',
            'GetCustomerData': 'student/GetCustomerDetails',
        }),
        statusChecker () {
            this.isLoggedIn = this.GetLoginStatus();
            let customerData = this.GetCustomerData();
            this.accessToken = customerData.userToken
        }
    },
    created () {
        if (process.browser) {
            this.statusChecker()
        }
    }
}
</script>

<style>

</style>