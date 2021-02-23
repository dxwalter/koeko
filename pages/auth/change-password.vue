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
                    Create a new password
                  </div>
                  <div class="mini-header">Change your password to a new one.</div>
                </div>

                <div class="mb-3">
                  <input type="password" class="form-control" id="newPassword" placeholder="Password" v-model="newPassword">
                </div>

                <div class="mb-3">
                  <input type="password" class="form-control" id="newPasswordConfirmed" placeholder="Confirm password" v-model="newPasswordConfirmed">
                </div>

                <div class="mb-3">
                    <button type="button" class="btn btn-primary btn-lg width-100" id="changePassword" @click="changePassword()">
                         Save new password
                        <div class="loader-action"><span class="loader"></span></div>
                    </button>
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

import { RECOVER_PASSWORD, CHANGE_PASSWORD } from '~/graphql/student'

export default {
    name: "changePassword",
    components: { HEADER, FOOTER, BOTTOMADS },
    data: function() {
        return {
          newPasswordConfirmed: "",
          newPassword: "",
          email: "",
          timeOutHolder: null
        }
    },
    methods: {
      changePassword: async function () {
            
            if (this.newPassword.length < 6) {
                this.$addRedBorder('newPassword');
                return this.$showToast("Your password must be greater than 5 characters.", "info", 4000)
            } else {
                this.$removeRedBorder('newPassword');
            }

            if (this.newPassword !== this.newPasswordConfirmed) {
                this.$addRedBorder('newPassword');
                this.$addRedBorder('newPasswordConfirmed');
                return this.$showToast("Your passwords do not match.", "info", 4000)
            } else {
                this.$removeRedBorder('newPassword');
                this.$removeRedBorder('newPasswordConfirmed');
            }


            let target = document.getElementById('changePassword');

            target.disabled = true

            let variables = {
                password: this.newPassword,
                email: this.email
            }

            let query = await this.$performGraphQlMutation(this.$apollo, CHANGE_PASSWORD, variables, {});

            target.disabled = false

            if (query.error) {
                return this.$initiateNotification('error', 'Oops!', query.message);
            }

            let result = query.result.data.CreateNewStudentPassword;

            if (result.success == false) {
                return this.$initiateNotification('error', 'Oops!', result.message);
            }

            this.$initiateNotification('success', '', result.message);

            clearTimeout(this.timeOutHolder)

            this.timeOutHolder = setTimeout(() => {
                this.$router.push(`/auth/sign-in`)
            }, 1000); 



      }
    },
    beforeDestroy () {
        clearTimeout(this.timeOutHolder)
    },
    created () {
        if (process.browser) {
        
            let urlParam = this.$route.query.e
            
            if (urlParam == undefined || urlParam == null || urlParam.length == 0) {
                return this.$router.push('/');
            } else {
                this.email = urlParam
            }
        }
    }
}
</script>

<style>


</style>
