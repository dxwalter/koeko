<template>
    <div>
        <div>
            <HEADER></HEADER>
            <Nuxt />
        </div>
        

        <div class="page-container move-content-to-center">
            <div class="registration-container">
                <div class="intro-header mg-bottom-32">
                  <div class="header">
                    Hi! Welcome back.
                  </div>
                  <div class="mini-header">Kindly sign into your account.</div>
                </div>

                <div>
                    <div class="mb-3">
                      <input type="text"  class="form-control" id="studentEmail" placeholder="Email address" v-model="studentEmail">
                    </div>
                    <div class="mb-3">
                      <input type="password" class="form-control" id="studentPassword" placeholder="Password" v-model="studentPassword">
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-primary btn-lg width-100" id="signInStudent" @click="signInStudent()">
                            Sign in
                            <div class="loader-action"><span class="loader"></span></div>
                        </button>
                    </div>

                    <div class="forgot-password">
                        <n-link prefetch to="/auth/password-recovery">Lost your password?</n-link>
                    </div>
                </div>

              </div>
        </div>

        <BOTTOMADS></BOTTOMADS>
        <Nuxt />

        <FOOTER></FOOTER>
        <Nuxt />
    </div>
</template>

<script>

import HEADER from '~/layouts/header.vue'
import BOTTOMADS from '~/layouts/bottom-ads.vue'
import FOOTER from '~/layouts/footer.vue'

import { mapActions, mapGetters, mapMutations } from 'vuex'

import { LOGIN_STUDENT  } from '~/graphql/student';


export default {
    name: "SIGNINPAGE",
    components: { HEADER, FOOTER, BOTTOMADS },
    data: function() {
        return {
            studentEmail: "",
            studentPassword: "",
            timeOutHolder: null
        }
    },
    methods: {
        signInStudent: async function () {

            if (this.studentEmail.length == 0 || this.$validateEmailAddress(this.studentEmail) == false) {
                this.$addRedBorder('studentEmail');
                return this.$showToast("Enter a valid email address.", "info", 4000)
            } else {
                this.$removeRedBorder('studentEmail');
            }

            if (this.studentPassword.length < 6) {
                this.$addRedBorder('studentPassword');
                return this.$showToast("Your password must be at least 6 characters.", "info", 4000)
            } else {
                this.$removeRedBorder('studentPassword');
            }


            let target = document.getElementById('signInStudent');

            target.disabled = true

            let variables = {
                email: this.studentEmail,
                password: this.studentPassword
            }

            let request = await this.$performGraphQlQuery(this.$apollo, LOGIN_STUDENT, variables, {});
            
            target.disabled = false

            if (request.error) {
                return this.$initiateNotification('error', "Network Error", request.message);
            }

            let result = request.result.data.LoginStudent;

            if (result.success == false) {
                return this.$initiateNotification('error', "Failed request", result.message);
            }

            let studentData = result.studentData

                this.$store.dispatch('student/setCustomerData', {
                    fullname: studentData.name,
                    email: studentData.email,
                    userId: studentData.id,
                    userToken: studentData.accessToken,
                    gender: studentData.gender,
                    displayPicture: studentData.profilePhoto,
                    instagramId: studentData.instagramId,
                    phone: studentData.phoneNumber
                });

                this.$store.dispatch('student/changeLoginStatus', true)


                this.$initiateNotification('success', "Login successful", result.message)

                clearTimeout(this.timeOutHolder)

                this.timeOutHolder = setTimeout(() => {
                    this.$router.push(`/courses/enrolled-courses/`)
                }, 1000); 

        }
    },
    beforeDestroy () {
        clearTimeout(this.timeOutHolder)
    }
}
</script>

<style>


</style>
