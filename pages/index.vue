<template>
    <div>
        <div>
            <HEADER></HEADER>
            <Nuxt />

            <!-- banner area -->
            <div class="banner-container">
                <div class="container">
                    <div class="banner-content-container">
                
                        <div class="big-text-area">
                        <div class="banner-big-text large-headers slideInLeft" data-show-animation="show">Put your business ahead of the game in 1 hour.</div>
                        <div class="banner-smaller-text slideInLeft" data-show-animation="show">Learn fast and easy <span>DO-IT-YOURSELF</span> skills that will help your business reduce cost and increase profit.</div>
                        <div class="banner-action-area slideInUp" data-show-animation="show">
                            <n-link to="/courses" class="btn btn-primary">Get started</n-link>
                            <button class="btn btn-white" @click="scrollToLocation('moreInfoAboutService')">Learn more</button>
                        </div>
                        </div>

                        <div class="banner-image-container">
                        <img src="~/assets/images/main-banner-image.png" alt="" srcset="">
                        </div>

                    </div>
                </div>
            </div>
            <!-- end of banner area -->
        </div>


        <!-- content area -->

        <div class="section-padding light-blue-bg" data-scroll-location="moreInfoAboutService">
        <div class="container">
            
            <div class="section-header-container mg-bottom-64">
            <div class="section-header">We empower businesses owners with  the skills they will need to increase profit.</div>
            <div class="section-small-header">We achieve this by creating by following the steps below.</div>
            </div>

            <div class="row benefit-container justify-content-center show-animation">

            <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="benefit-red-card benefit-card slideInUp" data-show-animation="show">
                <div class="benefit-card-image"><img src="~/assets/images/fast-time.svg" alt="" srcset=""></div>
                <div class="benefit-card-header">Fast & timely courses</div>
                <div class="benefit-body mg-bottom-16">
                    Save time and learn from our fast and timely 1 hour courses that teaches you what you need to know so you can quickly go back to work on time to implement.
                </div>

                <div>
                    <n-link to="/courses" class="btn btn-primary">Get started</n-link>
                </div>
                
                </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="benefit-grey-card benefit-card slideInUp" data-show-animation="show">
                <div class="benefit-card-image"><img src="~/assets/images/practical.svg" alt="" srcset=""></div>
                <div class="benefit-card-header">Straight to the point courses</div>
                <div class="benefit-body mg-bottom-16">
                    We do not want to make you a professional; We just want you to get the job done. Learn quickly from our very short practical courses with little theoritical explanations.
                </div>

                <div>
                    <n-link to="/courses" class="btn btn-primary">Get started</n-link>
                </div>
                
                </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="benefit-orange-card benefit-card slideInUp" data-show-animation="show">
                <div class="benefit-card-image"><img src="~/assets/images/fun.svg" alt="" srcset=""></div>
                <div class="benefit-card-header">Fun & affordable</div>
                <div class="benefit-body mg-bottom-16">
                    You'll be learning a lot in 1 hour but there are enough activities to help you catch your breathe. You won't feel the cost and time spent on the course. And it will be memorable.
                </div>

                <div>
                    <n-link to="/courses" class="btn btn-primary">Get started</n-link>
                </div>
                
                </div>
            </div>


            </div>

        </div>
        </div>

        <!-- course-listing section -->
        <div class="section-padding grey-bg">
            <div class="container">
                
                <div class="section-header-container">
                    <div class="section-header">If you cannot afford to pay a professional, you just have to learn how to do it.</div>
                    <div class="section-small-header">Choose any course and learn how to do it in 1 hour.</div>
                </div>

                <ALLCOURSES></ALLCOURSES>
                <Nuxt />

            </div>
        </div>

        <div class="section-padding">
        <div class="container">
            
            <div class="section-header-container">
            <div class="section-header">We are putting businesses on the map. This are what people are saying.</div>
            </div>

            <ALLREVIEWS></ALLREVIEWS>
            <Nuxt />

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
import ALLCOURSES from '~/layouts/all-courses-component.vue'
import ALLREVIEWS from '~/layouts/all-course-reviews.vue'
import FOOTER from '~/layouts/footer.vue'

export default {
    name: "LANDINGPAGE",
	components: {HEADER, FOOTER, BOTTOMADS, ALLCOURSES, ALLREVIEWS},
    methods: {
        scrollToLocation: function (location) {
            this.$scrollToLocation(location)
        }
    }
}
</script>

<style>


</style>
