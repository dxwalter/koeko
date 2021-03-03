<template>

            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                
                <div class="content-loader" v-show="isLoading">
                    <div class="loader-action"><span class="loader"></span></div>
                </div>

                <div class="col-sm-12" v-show="errorPage && !isLoading">
                    <div class="error-container">
                        <div class="image-area">
                            <img src="~/assets/images/warning.svg" alt="" srcset="">
                        </div>

                        <div class="error-header-area">Oops! An error occurred</div>
                        <div class="error-message">{{errorMessage}}</div>
                        <div class="d-flex-center">
                            <button @click="getAllReviews()" class="btn btn-large btn-primary">Try again</button>
                        </div>
                    </div>
                </div>

                <div v-show="!errorPage && !isLoading">
                    <div class="carousel-inner">
                        <div class="carousel-item" v-bind:class="[index == 0 ? 'active' : '']"  v-for="(review, index) in returnAllReviews" :key="index">
                            <div class="carousel-caption">
                                <p>{{review.description}}</p> 
                                <div v-if="review.displayPicture.length > 0" class="image-review-cover">
                                    <img :src="review.displayPicture">
                                </div>
                                <div class="" v-else>
                                    <div class="temporary-name">{{getNameLogo(review.author)}}</div>
                                </div>
                                <div id="image-caption">{{review.author}}</div>
                                <div class="carousel-review-star">
                                    <StarRating :score=review.reviewScore></StarRating>
                                    <Nuxt />
                                </div>
                                <!-- <div id="business-name">Nick Doe</div> -->
                            </div>
                        </div>
                        
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
</template>

<script>
import { GET_COURSE_REVIEWS } from '~/graphql/courses';

import StarRating from '~/plugins/vue-star-rating.client.vue'

export default {
    components: {
        StarRating
    },
    data: function () {
        return {
            isLoading: true,
            errorMessage: "",
            errorPage: false,
            allReviews: []
        }
    },
    computed: {
        returnAllReviews () {
            return this.allReviews
        }
    },
    methods: {
		getNameLogo: function (businessName) {
			if (process.browser) {
				return this.$convertNameToLogo(businessName)
			}
        },
        getAllReviews: async function () {

            this.isLoading = true;
            
            let request = await this.$performGraphQlQuery(this.$apollo, GET_COURSE_REVIEWS, {}, {});
            
            this.isLoading = false;

            if (request.error) {
                this.errorMessage = request.message;
                this.errorPage = true;
                return 
                // this.$initiateNotification('error', 'Failed request', request.message);
            }

            let result = request.result.data.GetCourseReviews;

            if (result.success == false) {
                this.errorMessage = result.message;
                this.errorPage = true;
                return 
                this.$initiateNotification('error', 'Failed request', result.message);
            }

            this.errorPage = false

            if (result.reviews.length == 0) {
                this.errorMessage = result.message;
                this.errorPage = true;
                return 
                this.$initiateNotification('error', 'Failed request', result.message);
            }

            this.errorPage = false
            this.allReviews = result.reviews


        }
    }, 
    created () {
        if (process.browser) {
            this.getAllReviews();
        }
    }   
}
</script>

<style>

</style>