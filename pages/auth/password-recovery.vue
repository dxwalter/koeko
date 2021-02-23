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
                    Hi! Recover your password.
                  </div>
                  <div class="mini-header">Type your email address that is associated with this service.</div>
                </div>

                <div class="mb-3">
                  <input type="text" class="form-control" id="recoveryEmail" placeholder="Email address" v-model="recoveryEmail">
                </div>
                  <div class="mb-3">
                      <button type="button" class="btn btn-primary btn-lg width-100" id="recoverPassword" @click="recoverPassword()">
                          Recover your password
                          <div class="loader-action"><span class="loader"></span></div>
                      </button>
                  </div>

                <div class="forgot-password">
                    <n-link prefetch to="/auth/sign-in">Sign in to continue</n-link>
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

import { RECOVER_PASSWORD } from '~/graphql/student'

export default {
    name: "RECOVERPASSWORD",
    components: { HEADER, FOOTER, BOTTOMADS },
    data: function() {
        return {
          recoveryEmail: ""
        }
    },
    methods: {
      recoverPassword: async function () {
            
          if (this.recoveryEmail.length == 0 || this.$validateEmailAddress(this.recoveryEmail) == false) {
              this.$addRedBorder('recoveryEmail');
              return this.$showToast("Enter a valid email address.", "info", 4000)
          } else {
              this.$removeRedBorder('recoveryEmail');
          }

            let target = document.getElementById('recoverPassword');

            target.disabled = true

            let variables = {
                email: this.recoveryEmail
            }

            let query = await this.$performGraphQlMutation(this.$apollo, RECOVER_PASSWORD, variables, {});

            target.disabled = false

            if (query.error) {
                return this.$initiateNotification('error', 'Oops!', query.message);
            }

            let result = query.result.data.RecoverStudentPassword;

            if (result.success == false) {
                return this.$initiateNotification('error', 'Oops!', result.message);
            }

            return this.$initiateNotification('success', '', result.message);

      }
    }
}
</script>

<style>


</style>
