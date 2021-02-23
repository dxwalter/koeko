<template>
    <div>
        <div>
            <HEADER></HEADER>
            <Nuxt />
        </div>
        
            <div class="page-container-two grey-bg">
                <div class="container">

                    <div class="jumbotron-bg mg-bottom-64" data-bg-img="0" id="jumbotronImgContainer">
                        <div class="jumbotron-container" data-bg="0" id="jumbotronContainer">
                            <div>
                                <div class="big-jb-text">All courses</div>
                                <div class="big-jb-small">Our courses are designed to help your business save cost & maximise profit</div>
                            </div>
                        </div>
                    </div>
                

                    <ALLCOURSES></ALLCOURSES>
                    <Nuxt />

                </div>
            </div>


        <FOOTER></FOOTER>
        <Nuxt />
    </div>
</template>

<script>

import HEADER from '~/layouts/header.vue'
import ALLCOURSES from '~/layouts/all-courses-component.vue'
import BOTTOMADS from '~/layouts/bottom-ads.vue'
import FOOTER from '~/layouts/footer.vue'

export default {
    name: "LANDINGPAGE",
	components: {HEADER, FOOTER, BOTTOMADS, ALLCOURSES},
    methods: {
        changeJumbotronColor: function () {


            let randomNumer = Math.floor(Math.random() * 8) + 1;
            let target = document.getElementById('jumbotronContainer');

            console.log(target)
            
            target.setAttribute('data-bg', randomNumer)

            let jumbotronImageNumber = Math.floor(Math.random() * 5) + 1;
            let imageTarget = document.getElementById('jumbotronImgContainer');

            console.log(imageTarget)

            imageTarget.setAttribute('data-bg-img', jumbotronImageNumber)
        }
    },
    mounted () {
        this.changeJumbotronColor()
    }
}
</script>

<style>


</style>
