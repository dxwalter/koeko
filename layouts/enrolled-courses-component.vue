<template>
        <div class="row">

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
                        <button @click="getEnrolledCourses()" class="btn btn-large btn-primary">Try again</button>
                    </div>
                </div>
            </div>

            <div class="col-sm-12 col-md-6 col-lg-4" v-for="(course, index) in returnAllCourses" :key="index">
                <div class="course-card-container">
                <div class="course-card-image">
                    <img :src="getImageUrl(course.displayPicture)" alt="" srcset="">
                    <div class="course-card-metadata">
                        <div class="enrolled-price-card" v-if="course.enrolled">Enrolled</div>
                        <div v-else></div>

                        <div class="price-card" v-if="course.price > 0">₦ {{formatPrice(course.price)}}</div>
                        <div class="price-card" v-else>Free course</div>
                    </div>
                </div>
    
                <div class="course-info-area">
                    <div class="course-card-name">{{course.name}}</div>
                    <div class="course-card-desctiption mg-bottom-16" v-html="course.description"></div>
    
                    <div class="d-flex-between mg-bottom-16">
    
                        <div class="course-card-options">
                            <div class="options-header">price</div>
                            <div class="options-detail" v-if="course.price > 0">₦ {{formatPrice(course.price)}}</div>
                            <div class="options-detail" v-else>Free course</div>

                        </div>
                        
                        <div class="course-card-options">
                            <div class="options-header">Enrolled</div>
                            <div class="options-detail">{{course.enrolledCount}} <span v-show="course.enrolledCount == 1">Person</span><span v-show="course.enrolledCount > 1">People</span> </div>
                        </div>
                        
                        <div class="course-card-options">
                            <div class="options-header">Review</div>
                            <div class="options-detail">
                                <StarRating :score=course.reviewScore></StarRating>
                                <Nuxt />
                            </div>
                        </div>
                    
                    </div>
    
                    <div class="course-card-action">
                        <n-link :to="`/course/${course.courseId}`" class="btn btn-small btn-success width-100">Continue learning</n-link>
                    </div>
                </div>
    
                </div>
            </div>
    
        </div>
</template>

<script>

import paystack from '~/plugins/vue-paystack.client.vue'

import { mapActions, mapGetters, mapMutations } from 'vuex'

import StarRating from '~/plugins/vue-star-rating.client.vue'

import { STUDENT_GET_ALL_ENROLLED_COURSES } from '~/graphql/courses';

export default {
    name: 'COURSELISTINGCOMPONENT',
    components: {
        StarRating, paystack
    },
	data: function() {
        return {
            isLoggedIn: "",
            accessToken: "",
            isLoading: true,
            allCourses: "",
            errorMessage: "",
            errorPage: false,
        }
    },
    computed: {
        returnAllCourses () {
            return this.allCourses
        }
    },
    methods: {
        ...mapGetters({
            'GetLoginStatus': 'student/GetLoginStatus',
            'GetCustomerData': 'student/GetCustomerDetails',
        }),
        cancelTransaction: function () {
            this.showPaymentModal = 0
            this.$initiateNotification('info', "", "Your transaction was cancelled")
        },
        getImageUrl: function (imageName) {
            return `https://res.cloudinary.com/cudua-images/image/upload/w_auto,f_auto,q_auto/v1612215827/${process.env.CLOUDINARY_FOLDER}/cudua-course/${imageName}` 
        },
        statusChecker () {
            this.isLoggedIn = this.GetLoginStatus();
            let customerData = this.GetCustomerData();
            this.accessToken = customerData.userToken

            this.studentEmail = customerData.email;
            this.studentName = customerData.name;
        },
        formatPrice (number) {
            return this.$numberNotation(number)
        },
        getEnrolledCourses: async function () {
            
            this.isLoading = true;

            let context = {
                headers: {
                    'accessToken': this.accessToken
                }
            }
            
            let request = await this.$performGraphQlQuery(this.$apollo, STUDENT_GET_ALL_ENROLLED_COURSES, {}, context);
            
            this.isLoading = false;

            if (request.error) {
                this.errorMessage = request.message;
                this.errorPage = true;
                return this.$initiateNotification('error', 'Failed request', request.message);
            }

            let result = request.result.data.StudentGetEnrolledCourses;

            if (result.success == false) {
                this.errorMessage = result.message;
                this.errorPage = true;
                return this.$initiateNotification('error', 'Failed request', result.message);
            }

            this.errorPage = false
            this.allCourses = result.courses

        }
    },
    created() {
        if (process.client) {
            this.statusChecker();

            this.getEnrolledCourses()
        }
    },
    beforeDestroy() {
        clearTimeout(this.timeOutHolder)
    },
    mounted () {

    }
}
</script>

<style>

</style>