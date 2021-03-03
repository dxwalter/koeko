<template>
  
    <div class="section-padding">

      <PWAINITCOMPONENT></PWAINITCOMPONENT>
      <Nuxt />
      
      <div class="container">
        <div class="bottom-links-container">

          <div class="navbar-brand-2">
            <img src="~/assets/images/koeko-logo.png" alt="" srcset="">
          </div>

          <div class="bottom-links">
            <n-link prefetch aria-current="page" to="/auth/sign-in">Sign in</n-link>
            <n-link to="/about">About us</n-link>
            <n-link to="/contact">Contact us</n-link>
          </div>

        </div>

        <div class="copy-right">&copy;Light groups</div>

      </div>
    </div>

</template>

<script>
import PWAINITCOMPONENT from '~/components/pwa.init.component.vue';
export default {
  components: {
    PWAINITCOMPONENT
  }
}
</script>

<style>

</style>