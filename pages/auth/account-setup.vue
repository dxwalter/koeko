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
                    Hi! Welcone back.
                  </div>
                  <div class="mini-header">Kindly complete your registration.</div>
                </div>

                <form action="">
                  <div class="mb-3">
                    <input type="text" class="form-control" id="recipient-" placeholder="Email address">
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" id="recipient-" placeholder="Password">
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary btn-lg width-100">Sign in</button>
                  </div>

                </form>

              </div>
          </div>


        <FOOTER></FOOTER>
        <Nuxt />
    </div>
</template>

<script>

import HEADER from '~/layouts/header.vue'
import BOTTOMADS from '~/layouts/bottom-ads.vue'
import FOOTER from '~/layouts/footer.vue'

export default {
    name: "LANDINGPAGE",
	components: {HEADER, FOOTER, BOTTOMADS}
}
</script>

<style>


</style>
