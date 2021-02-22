<template>
  <div>
        <HEADER></HEADER>
        <Nuxt />

            <div class="page-container-two grey-bg">
                <div class="container">

                    <div class="jumbotron-bg mg-bottom-64" data-bg-img="1" id="jumbotronImgContainer">
                        <div class="jumbotron-container" data-bg="8" id="jumbotronContainer">
                            <div>
                                <div class="big-jb-text">Your courses</div>
                                <div class="big-jb-small">A list of all the courses you have enrolled in.</div>
                            </div>
                        </div>
                    </div>

                    
                    <ENROLLEDCOURSES></ENROLLEDCOURSES>
                    <Nuxt />

                </div>
            </div>

        <FOOTER></FOOTER>
        <Nuxt />
    </div>
</template>

<script>

import HEADER from '~/layouts/header.vue'
import BOTTOMADS from '~/layouts/bottom-ads.vue'
import ENROLLEDCOURSES from '~/layouts/enrolled-courses-component.vue'
import FOOTER from '~/layouts/footer.vue'

export default {
    name: "LANDINGPAGE",
	components: {HEADER, FOOTER, BOTTOMADS, ENROLLEDCOURSES},
    methods: {
        changeJumbotronColor : () => {
            
            console.log("hereman")

            let randomNumer = Math.floor(Math.random() * 8) + 1;
            let target = document.getElementById('jumbotronContainer');
            target.setAttribute('data-bg', randomNumer)

            let jumbotronImageNumber = Math.floor(Math.random() * 5) + 1;
            let imageTarget = document.getElementById('jumbotronImgContainer');
            imageTarget.setAttribute('data-bg-img', jumbotronImageNumber)
        }
    },
    created () {
        if (process.client) {
            
        }

    },
    mounted () {
        this.changeJumbotronColor()
    }
}
</script>

<style>

</style>