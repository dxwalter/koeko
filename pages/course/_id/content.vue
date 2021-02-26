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
                                <button @click="getContentDetails()" class="btn btn-large btn-primary">Try again</button>
                            </div>
                        </div>
                    </div>

                    <div >
                        <div class="course-option-data-container for-iframe" v-html="contentVideo">
                            <!-- video containers -->
                        </div>

                        <div class="course-option-data-container" v-html="contentMaterial">
                        </div>

                        <div class="course-option-data-container">
                            <div class="course-content-controller">
                                <button class="btn btn-success" id="markAsComplete" @click="markAsComplete()">
                                    Mark as complete
                                    <div class="loader-action"><span class="loader"></span></div>
                                </button>
                            </div>
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

import { mapActions, mapGetters, mapMutations } from 'vuex';

import { STUDENT_GET_COURSE_VIDEO, MarkTutorialAsComplete } from '~/graphql/courses';

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

            timeOutHolder: null
        }
    },
    methods: {
        ...mapGetters({
            'GetLoginStatus': 'student/GetLoginStatus',
            'GetCustomerData': 'student/GetCustomerDetails',
        }),
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

            clearTimeout(this.timeOutHolder)

            this.timeOutHolder = setTimeout(() => {
                this.$router.push(`/course/${this.courseId}`)
            }, 1000); 

        },
        statusChecker () {
            this.isLoggedIn = this.GetLoginStatus();
            let customerData = this.GetCustomerData();
            this.accessToken = customerData.userToken

            if (this.isLoggedIn == false) {
                this.$router.push(`/auth/logout/`)
            }
        },
        getContentDetails: async function () {
            this.isLoading = true
          
            let variables = {
                courseId: this.courseId,
                contentId: this.contentId
            }


            let context = {
                headers: {
                    'accessToken': this.accessToken
                }
            }

            let request = await this.$performGraphQlQuery(this.$apollo, STUDENT_GET_COURSE_VIDEO, variables, context);
            
            this.isLoading = false;

            if (request.error) {
                this.errorMessage = request.message;
                this.errorPage = true;
                return this.$initiateNotification('error', 'Failed request', request.message);
            }

            let result = request.result.data.StudentGetCourseVideo;

            if (result.success == false) {
                this.errorMessage = result.message;
                this.errorPage = true;
                return this.$initiateNotification('error', 'Failed request', result.message);
            }

            this.errorPage = false

            let courseContentVideo = result.videoContent;

            this.contentTitle = courseContentVideo.title;
            this.contentMaterial = courseContentVideo.materials;
            this.contentVideo = courseContentVideo.videoLink;

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

            this.getContentDetails() 
        }
    },
    beforeDestroy () {
        clearTimeout(this.timeOutHolder)
    }

}
</script>