<template>
  <div>
        <HEADER></HEADER>
        <Nuxt />

            <div class="page-container-two grey-bg">
                <div class="container">

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
                                <button @click="getCourseDetails()" class="btn btn-large btn-primary">Try again</button>
                            </div>
                        </div>
                    </div>

                    <div v-show="!errorPage && !isLoading">
                        <div class="course-option-data-container">
                            <div class="course-content-data for-iframe" v-html="contentVideo">
                                <!-- video containers -->
                            </div>

                            <div class="watch-course-content-title">{{contentTitle}}</div>

                            <div class="watch-course-content-description">{{contentDescription}}</div>

                            <div class="mg-bottom-32" v-html="contentMaterial">
                            </div>

                            <div class="mg-bottom-16 d-flex-between">
                                <a :href="previousTutorialUrl" class="btn" >Previous tutorial</a>
                                <a :href="nextTutorialUrl" class="btn">Next tutorial</a>
                            </div>

                            <div class="">
                                <div class="course-content-controller mg-bottom-32">
                                    <button class="btn btn-primary" id="markAsComplete" @click="markAsComplete()">
                                        Mark as complete
                                        <div class="loader-action"><span class="loader"></span></div>
                                    </button>
                                </div>
                                <div class="course-content-controller">
                                    <a class="btn btn-success" href="https://wa.me/234807227910?text=Hi! I have a question">
                                        Do you have a question? Click to ask
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        <FOOTER></FOOTER>
        <Nuxt />


        <div>
            <div class="modal fade" id="reviewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">How do you feel about this course?</h5>
                    </div>
                    <div class="modal-body">
                        <div id="createCategory">
                        <div class="">
                            <label for="businessType" class="form-label">Rate your exeprience with this customer</label>
                            <div class="review-action-container">
                                <div class="review-star-action">
                                    <button class="btn btn-white is-active" data-score="1"  @click="setreviewScore(1)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19">
                                            <use xlink:href="~/assets/images/all.svg#star"></use>
                                        </svg>
                                    </button>
                                    <div class="review-type">Hated it</div>
                                </div>

                                <div class="review-star-action">
                                    <button class="btn btn-white" data-score="2"  @click="setreviewScore(2)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19">
                                            <use xlink:href="~/assets/images/all.svg#star"></use>
                                        </svg>
                                    </button>
                                    <div class="review-type">Didn't like it</div>
                                </div>

                                <div class="review-star-action">
                                    <button class="btn btn-white"  @click="setreviewScore(3)" data-score="3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19">
                                            <use xlink:href="~/assets/images/all.svg#star"></use>
                                        </svg>
                                    </button>
                                    <div class="review-type">Just OK</div>
                                </div>

                                <div class="review-star-action">
                                    <button class="btn btn-white" @click="setreviewScore(4)" data-score="4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19">
                                            <use xlink:href="~/assets/images/all.svg#star"></use>
                                        </svg>
                                    </button>
                                    <div class="review-type">Liked it</div>
                                </div>

                                <div class="review-star-action">
                                    <button class="btn btn-white" @click="setreviewScore(5)" data-score="5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19">
                                            <use xlink:href="~/assets/images/all.svg#star"></use>
                                        </svg>
                                    </button>
                                    <div class="review-type">Loved it</div>
                                </div>

                            </div>
                        </div>
                    <div class="mg-bottom-16">
                        <label for="businessType" class="form-label">Describe your experience with this customer - <span>optional</span></label>
                        <textarea name="" id="" cols="30" rows="5" class="input-form form-control" v-model="ratingDescription"></textarea>
                    </div>
                    <div class="">
                        <button class="btn btn-block btn-primary width-100" type="button" @click="submitReview" id="submitReview">
                            Submit review
                            <div class="loader-action"><span class="loader"></span></div>
                        </button>
                    </div>
                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeReviewModal()">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import HEADER from '~/layouts/header.vue'
import BOTTOMADS from '~/layouts/bottom-ads.vue'
import FOOTER from '~/layouts/footer.vue'

import { mapActions, mapGetters, mapMutations } from 'vuex';

import { STUDENT_GET_COURSE_DETAILS, MarkTutorialAsComplete, STUDENT_CREATE_COURSE_REVIEW } from '~/graphql/courses';

export default {
    name: "COURSECONTENTPAGE",
	components: {HEADER, FOOTER, BOTTOMADS},
    data: function () {
        return {
            isLoggedIn: "",
            accessToken: "",
            isLoading: true,
            allCourses: "",
            errorMessage: "",
            errorPage: false,
            courseId: "",
            contentId: "",

            contentTitle: "",
            contentDescription: "",
            contentVideo: "",
            contentMaterial: "",

            timeOutHolder: null,

            reviewModal: null,
            ratingScore: 0,
            ratingDescription: "",

            nextTutorialUrl: "",
            previousTutorialUrl: ""
        }
    },
    methods: {
        submitReview: async function () {
            
            let variables = {
                courseId: this.courseId,
                reviewScore: this.ratingScore,
                description: this.ratingDescription
            }

            let context = {
                headers: {
                    'accessToken': this.accessToken
                }
            }
            
            let target = document.getElementById('submitReview');
            target.disabled = true
			
            let request = await this.$performGraphQlQuery(this.$apollo, STUDENT_CREATE_COURSE_REVIEW, variables, context);

            target.disabled = false

            this.closeReviewModal()
            
            if (request.error) {
                return this.$showToast('A network error occurred', 'error', 6000);
            }

            let result = request.result.data.CreateCourseReview;

            if (result.success == false) {
                return this.$showToast(result.message, 'error', 6000);
            }

            return this.$showToast(result.message, 'success', 6000);

        },
        setreviewScore: function (score) {

            let reviewButtons = document.querySelectorAll('[data-score]');

            console.log(reviewButtons)

            for (const [index, x] of reviewButtons.entries()) {
                x.classList.remove('is-active')
            }

            for (const [index, x] of reviewButtons.entries()) {

                index = index + 1

                if (index <= score) {
                    x.classList.add('is-active')
                }
            }

            this.ratingScore = score
        },
        ...mapGetters({
            'GetLoginStatus': 'student/GetLoginStatus',
            'GetCustomerData': 'student/GetCustomerDetails',
        }),
        closeReviewModal: function () {
            this.reviewModal.toggle();

            clearTimeout(this.timeOutHolder)
            this.timeOutHolder = setTimeout(() => {
                this.$router.push(`/course/${this.courseId}`)
            }, 500)
        },
        markAsComplete: async function () {

            let target = document.getElementById('markAsComplete');

            target.disabled = true;

            let variables = {
                courseId: this.courseId,
                contentId: this.contentId
            }


            let context = {
                headers: {
                    'accessToken': this.accessToken
                }
            }

            this.reviewModal = new bootstrap.Modal(document.getElementById('reviewModal'));
            this.reviewModal.toggle()

            let request = await this.$performGraphQlMutation(this.$apollo, MarkTutorialAsComplete, variables, context);
            
            target.disabled = false;

            if (request.error) {
                return this.$initiateNotification('error', 'Failed request', request.message);
            }

            let result = request.result.data.StudentMarkContentAsComplete;

            if (result.success == false) {
                return this.$initiateNotification('error', 'Failed request', result.message);
            }

            this.$initiateNotification('success', 'Marked', result.message);

        },
        statusChecker () {
            this.isLoggedIn = this.GetLoginStatus();
            let customerData = this.GetCustomerData();
            this.accessToken = customerData.userToken

            if (this.isLoggedIn == false) {
                this.$router.push(`/auth/logout/`)
            }
        },
        getCourseDetails: async function () {
            this.isLoading = true
          
            let variables = {
                courseId: this.courseId
            }


            let context = {
                headers: {
                    'accessToken': this.accessToken
                }
            }

            let request = await this.$performGraphQlQuery(this.$apollo, STUDENT_GET_COURSE_DETAILS, variables, context);
            
            this.isLoading = false;

            if (request.error) {
                this.errorMessage = request.message;
                this.errorPage = true;
                return this.$initiateNotification('error', 'Failed request', request.message);
            }

            let result = request.result.data.StudentGetCourseContent;

            if (result.success == false) {
                this.errorMessage = result.message;
                this.errorPage = true;
                return this.$initiateNotification('error', 'Failed request', result.message);
            }

            this.errorPage = false

            let contentCount = result.courseContent.length

            let contentArray = result.courseContent;

            for (let [index, content] of contentArray.entries()) {

                console.log(index + "=>" +contentCount)

                if (content.contentId == this.contentId) {
                    this.contentTitle = content.title;
                    this.contentMaterial = content.materials;
                    this.contentVideo = content.videoLink;
                    this.contentDescription = content.description

                    let increasedIndex = index + 1;

                    if (index == 0) {
                        // previous will go back to course details page
                        this.previousTutorialUrl = `/course/${this.courseId}`
                        this.nextTutorialUrl = `/course/${this.courseId}/content?contentId=${contentArray[index + 1].contentId}`
                        
                    } else {
                        this.previousTutorialUrl = `/course/${this.courseId}/content?contentId=${contentArray[index - 1].contentId}`;

                        if (increasedIndex == contentCount) {
                            this.nextTutorialUrl = `/course/${this.courseId}`
                        } else {
                            this.nextTutorialUrl = `/course/${this.courseId}/content?contentId=${contentArray[index + 1].contentId}`
                        }
                    }



                }
            }

        }
     },
    created() {
        if (process.browser) {
        
            let urlParam = this.$route.params.id;
            let contentId = this.$route.query.contentId;
            
            if (urlParam == undefined || urlParam == null || urlParam.length == 0) {
                return this.$router.push('/courses/enrolled-courses/');
            } else {
                this.courseId = urlParam
                if (contentId == undefined || contentId == null || contentId.length == 0) {
                    return this.$router.push('/courses/enrolled-courses/');
                } else {
                    this.contentId = contentId
                }
            }

            this.statusChecker()

            this.getCourseDetails() 
        }
    },
    beforeDestroy () {
        clearTimeout(this.timeOutHolder)
    }

}
</script>