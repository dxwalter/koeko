<template>
    <div>
        <div>
            <HEADER></HEADER>
            <Nuxt />
        </div>
        <div class="minor-page-container section-padding">
            <div class="container">
                <div class="about-page-jumbotron">
                    <div class="big-header-for-contact">Contact us. We would love  to hear from you</div>
                    <div class="action-btn-area">
                        <a href="https://wa.me/2348104686729?text=Hi! I am contacting you through your website" class="btn btn-white">Chat on Whatsapp</a>
                        <a href="tel:+2348104686729" class="btn btn-white">Call us</a>
                        <a href="mailto:realdanielwalter@gmail.com  " class="btn btn-white">Send an email</a>
                    </div>
                </div>
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
