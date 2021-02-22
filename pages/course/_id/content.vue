<template>
  <div>
        <HEADER></HEADER>
        <Nuxt />

            <div class="page-container-two grey-bg">
                <div class="container">

                    
                    <div class="course-option-data-container">
                        <!-- video containers -->
                        <video controls class="video-controller mg-bottom-32" poster="~/assets/images/wallpaper/3.jpg">
                            <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div class="course-option-data-container">
                        Praesent congue erat at massa. Fusce ac felis sit amet ligula pharetra condimentum. Donec vitae orci sed dolor rutrum auctor. Cras varius. Curabitur nisi.

                        Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Curabitur at lacus ac velit ornare lobortis. Praesent ac massa at ligula laoreet iaculis. Nullam dictum felis eu pede mollis pretium. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc.

                        Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Quisque id odio. Fusce neque. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Nunc nulla.

                        Nam commodo suscipit quam. Nulla porta dolor. Cras id dui. Phasellus viverra nulla ut metus varius laoreet.
                    </div>

                    <div class="course-option-data-container">
                        <div class="course-content-controller">
                            <button class="btn btn-primary">Write a review</button>
                            <button class="btn btn-success">Mark as complete</button>
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
	components: {HEADER, FOOTER, BOTTOMADS},
    methods: {

    },
    created () {

    }
}
</script>

<style>

</style>