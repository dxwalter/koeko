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
                      <div class="jumbotron-bg mg-bottom-32" data-bg-img="1" id="jumbotronImgContainer" :style="`background-image: url(${getImageUrl(courseDisplayPicture)});`">
                          <div class="jumbotron-container course-title-hover">
                              <div>
                                  <div class="big-jb-text mg-bottom-16">{{courseTitle}}</div>
                                  <button class="btn btn-sm btn-white" data-bs-toggle="modal" data-bs-target="#courseDescriptionModal">Learn more</button>
                              </div>
                          </div>
                      </div>


                      <div class="course-option-data-container ">
                          <div class="manage-column-container mg-bottom-32">
                            <div class="course-card-options-two align-self-center">
                              <div class="options-header">Course contents</div>
                            </div>

                            <div class="course-card-options-two">
                                <div class="options-header">{{completeScore}}% complete</div>
                                <div class="options-detail"><progress :value="completeScore" max="100"></progress></div>
                            </div>
                              
                          </div>
                      </div>

                      
                      <div class="course-option-data-container">

                        <div class="course-content-item" v-for="(content, index) in returnCourseLising" :key="index">

                          <div class="mg-bottom-16 course-item-card">

                            <div class="intro-name-area">
                              <div class="image-container">
                                <img :src="getImageUrl(content.displayPicture)" alt="" srcset="">
                                <div class="when-completed" v-show="content.isCompleted">
                                  <img src="~/assets/images/check.svg" alt="" srcset="">
                                </div>
                              </div>
                              <div class="content-title">{{content.title}}</div>
                            </div>

                            <div>
                              <div v-html="content.materials"></div>
                            </div>
                          </div>

                          <div>
                            <n-link :to="`/course/${courseId}/content?contentId=${content.contentId}`" class="btn btn-primary width-100">Watch now</n-link>
                          </div>
                        </div>

                      </div>
                    </div>

                </div>

            </div>

        <FOOTER></FOOTER>
        <Nuxt />

      <div class="modal fade" id="courseDescriptionModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Course description</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" v-html="courseDescription">
              
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

import { mapActions, mapGetters, mapMutations } from 'vuex'

import { STUDENT_GET_COURSE_DETAILS, STUDENT_MARK_COURSE_AS_COMPLETE } from '~/graphql/courses';

export default {
    name: "COURSECONTENTLISTING",
    components: { HEADER, FOOTER, BOTTOMADS },
    data: function () {
        return {
              isLoggedIn: "",
              accessToken: "",
              isLoading: true,
              allCourses: "",
              errorMessage: "",
              errorPage: false,
              courseId: "",
              courseContentListing: "",

              courseTitle: "",
              courseDisplayPicture: "",
              courseDescription: "",
              completeScore: 0
        }
    },
    computed: {
        returnCourseLising () {
            return this.courseContentListing
        }
    },
    methods: {
        getImageUrl: function (imageName) {
            return `https://res.cloudinary.com/cudua-images/image/upload/w_auto,f_auto,q_auto/v1612215827/${process.env.CLOUDINARY_FOLDER}/cudua-course/${imageName}` 
        },
        ...mapGetters({
            'GetLoginStatus': 'student/GetLoginStatus',
            'GetCustomerData': 'student/GetCustomerDetails',
        }),
        statusChecker () {
            this.isLoggedIn = this.GetLoginStatus();
            let customerData = this.GetCustomerData();
            this.accessToken = customerData.userToken

            if (this.isLoggedIn == false) {
                this.$router.push(`/auth/logout/`)
            }
        },
        getCourseDetails: async function () {
          
          this.isLoading = true;
          
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

            this.courseContentListing = result.courseContent;

            let courseDetails = result.courseDetails;
            
            this.courseTitle = courseDetails.name;
            this.courseDisplayPicture = courseDetails.displayPicture;
            this.courseDescription = courseDetails.description;

            let perUnitScore = Math.ceil(100 / this.courseContentListing.length);
            
            let score = 0;

            for (let course of this.courseContentListing) {
              if (course.isCompleted == true) {
                score = score + 1;
              }
            }

            this.completeScore = perUnitScore * score

            if (this.completeScore == 100) {
              this.markCourseAsComplete();
            }

        },
        markCourseAsComplete: async function () {
          let variables = {
            courseId: this.courseId
          }


          let context = {
              headers: {
                  'accessToken': this.accessToken
              }
          }

          let request = await this.$performGraphQlMutation(this.$apollo, STUDENT_MARK_COURSE_AS_COMPLETE, variables, context);          
        }
    },
    created() {
        if (process.browser) {
        
            let urlParam = this.$route.params.id
            
            if (urlParam == undefined || urlParam == null || urlParam.length == 0) {
                return this.$router.push('/courses/enrolled-courses/');
            } else {
                this.courseId = urlParam
            }

            this.statusChecker()

            this.getCourseDetails()
        }
    }

}
</script>

<style scoped>

</style>