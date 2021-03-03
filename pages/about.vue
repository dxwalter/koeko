<template>
    <div>
        <div>
            <HEADER></HEADER>
            <Nuxt />
        </div>
        

              <div class="minor-page-container section-padding">
                    <div class="container">
                        <div class="about-page-jumbotron">
                            <div class="big-header-for-contact">About Koeko.</div>
                            <div class="text-size-18">
                                Koeko is an online learning platform that focuses on teaching business owners the skills the will need to run their businesses while saving cost. We do this by teaching short and straight to the point topics across every area of a growing business.
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
