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
                        <button @click="getAllCourses()" class="btn btn-large btn-primary">Try again</button>
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
    
                    <div class="course-card-action" v-if="course.enrolled">
                        <n-link :to="`/course/${course.courseId}`" class="btn btn-small btn-success width-100">Continue learning</n-link>
                    </div>
                    <div class="course-card-action" v-else>
                        <n-link :to="`/funnel/${course.funnelPage}?q=${course.courseId}`" class="btn btn-small btn-white width-100">Learn more</n-link>
                        <button class="btn btn-small btn-primary width-100" :id="`enrollButton${course.courseId}`" @click="checkCourseStatus(course.courseId, course.price, course.name)">
                            Enroll now
                            <div class="loader-action"><span class="loader"></span></div>
                        </button>
                    </div>
                </div>
    
                </div>
            </div>

            <div class="">
                <div class="modal fade show" id="anonymouseSignUpForACourse" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                            <div class="modal-header remove-border">
                                <!-- <h5 class="modal-title" id="exampleModalLabel">Create your account</h5> -->
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">
                                <div class="registration-container">
                                    <div class="intro-header mg-bottom-32">
                                        <div class="logo-container">
                                            <img src="~/assets/images/koeko-logo-icon.png" alt="">
                                        </div>
                                        <div class="header">
                                            Create an account to enroll now
                                        </div>
                                        <div class="mini-header">It's safe, fast, and easy.</div>
                                    </div>

                                    <div class="position-relative">
                                        <div class="mb-3">
                                            <input type="text" class="form-control" id="studentName" placeholder="Fullname" v-model="studentName">
                                        </div>
                                        <div class="mb-3">
                                            <input type="email" class="form-control" id="studentEmail" placeholder="Email address" v-model="studentEmail">
                                        </div>
                                        <div class="mb-3">
                                            <input type="password" class="form-control" id="studentPassword" placeholder="Password" v-model="studentPassword">
                                        </div>

                                        <div class="mb-3">
                                            <button type="button" class="btn btn-primary btn-lg width-100" id="createStudentAndEnroll" @click="createStudentAndEnroll()">
                                                Proceed to payment
                                                <div class="loader-action"><span class="loader"></span></div>
                                            </button>
                                        </div>

                                        <div class="forgot-password">
                                            <n-link prefetch to="/auth/sign-in"  data-bs-dismiss="modal">If you have an account, sign in before purchasing this course</n-link>
                                        </div>

                                        <div class="paystack-pay-container" v-show="showPaymentModal">

                                            <paystack class="btn btn-primary btn-lg width-100" id="payWithPaystack"
                                                    :amount="coursePrice * 100"
                                                    :email="studentEmail"
                                                    :paystackkey="paystackKey"
                                                    :callback="SuccessfulPayment"
                                                    :close="cancelTransaction"
                                                    :embed="false"
                                                    :firstname="studentName"
                                            >Pay ₦{{formatPrice(coursePrice)}} with your card</paystack>

                                            <button class="btn btn-white btn-lg width-100">Do a bank transfer</button>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="">
                <div class="modal fade show" id="knownUserPaymentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header remove-border">
                                <!-- <h5 class="modal-title" id="exampleModalLabel">Create your account</h5> -->
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">
                                <div class="registration-container">
                                    <div class="intro-header mg-bottom-32">
                                        <div class="logo-container">
                                            <img src="~/assets/images/koeko-logo-icon.png" alt="">
                                        </div>
                                        <div class="header">
                                            Grab this course now.
                                        </div>
                                        <div class="mini-header">It's safe, fast, and easy.</div>
                                    </div>

                                    <div class="position-relative height-auto">

                                        <div class="paystack-pay-container remove-position-absolute">

                                            <paystack class="btn btn-primary btn-lg width-100" id="payWithPaystack"
                                                    :amount="coursePrice * 100"
                                                    :email="studentEmail"
                                                    :paystackkey="paystackKey"
                                                    :callback="SuccessfulPaymentForSignedStudent"
                                                    :close="cancelTransaction"
                                                    :embed="false"
                                                    :firstname="studentName"
                                            >Pay ₦{{formatPrice(coursePrice)}} with your card</paystack>

                                            <button class="btn btn-white btn-lg width-100">Do a bank transfer</button>

                                        </div>
                                    </div>

                                </div>
                            </div>
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

import { GET_ALL_COURSES_FOR_ANONYMOUS_USER, STUDENT_ENROLL_INTO_COURSE } from '~/graphql/courses';

import { CREATE_NEW_STUDENT  } from '~/graphql/student';

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
            anonymousModal: null,

            // course to enroll
            courseName: "",
            coursePrice: "",
            courseId: "",
            transactionId: "",

            // create free student
            studentName: "",
            studentEmail: "",
            studentPassword: "",
            paystackKey: "pk_test_79e353487a385c8f21e93dc8bbb40215359f00b4",
            showPaymentModal: 0,
            timeOutHolder: null,
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
        SuccessfulPaymentForSignedStudent: async function (transaction) {
            
            if (transaction.status == 'success' && transaction.message == 'Approved') {
                
                this.anonymousModal.toggle()
                
                this.transactionId = transaction.reference;

                this.$showToast("Your payment was successful. Please wait", "success", 6000)
                
                this.enrollStudentIntoCourse()
            }
        },
        SuccessfulPayment: async function (transaction) {
            
            this.showPaymentModal = 0

            if (transaction.status == 'success' && transaction.message == 'Approved') {

                this.$showToast("Your payment was successful. Please wait", "success", 6000)

                let target = document.getElementById('createStudentAndEnroll');

                target.disabled = true;

                this.transactionId = transaction.reference;

                let variables = {
                    transactionReferenceId: this.transactionId,
                    courseId: this.courseId,
                    name: this.studentName,
                    email: this.studentEmail,
                    password: this.studentPassword
                }

                let request = await this.$performGraphQlMutation(this.$apollo, CREATE_NEW_STUDENT, variables, {});


                target.disabled = true;

                if (request.error) {
                    this.$initiateNotification('error', "Network Error", request.message)
                    return
                }

                let result = request.result.data.CreateStudent;

                if (result.error) {
                    this.$initiateNotification('error', "Update error", result.message)
                    return
                }


                let studentData = result.studentData

                this.$store.dispatch('student/setCustomerData', {
                    fullname: studentData.name,
                    email: studentData.email,
                    userId: studentData.id,
                    userToken: studentData.accessToken,
                });

                this.$store.dispatch('student/changeLoginStatus', true)


                this.$initiateNotification('success', "Request successful", result.message)

                this.anonymousModal.toggle()

                clearTimeout(this.timeOutHolder)

                this.timeOutHolder = setTimeout(() => {
                    this.$router.push(`/course/${this.courseId}/`)
                }, 1000);   

            } else {
        
                this.$initiateNotification('error', "Payment error", "An error occurred paying for the course")
            }
        },
        createStudentAndEnroll: async function () {

            if (this.studentName.length < 3) {
                this.$addRedBorder('studentName');
                return this.$showToast('Your fullname must be greater than 2 characters', "error", 3000)
            } else {
                this.$removeRedBorder('studentName');
            }

            

            return

            // validate email
            if (this.studentEmail.length < 5 || this.$validateEmailAddress(this.studentEmail) == false) {
                this.$addRedBorder('studentEmail')
                return this.$showToast('Enter a valid email address', "error", 3000)
            } else {
                this.$removeRedBorder('studentEmail');
            }

            // password
            if (this.studentPassword.length < 6) {
                this.$addRedBorder('studentPassword')
                return this.$showToast('Your password must be greater than 5 characters', "error", false)
            } else {
                this.$removeRedBorder('studentPassword');
            }

            this.showPaymentModal = true;


        },
        enrollStudentIntoCourse: async function () {

            let target = document.getElementById(`enrollButton${this.courseId}`);

            this.$showToast('Your enrollment has started. Please wait', "info", 2000)

            target.disabled = true;

            let variables = {
                courseId: this.courseId,
                transactionRef: this.transactionId
            }
            
            let context = {
                headers: {
                    'accessToken': this.accessToken
                }
            }

            let request = await this.$performGraphQlMutation(this.$apollo, STUDENT_ENROLL_INTO_COURSE, variables, context);

            target.disabled = true;

            if (request.error) {
                this.$initiateNotification('error', "Network Error", request.message)
                return
            }

            let result = request.result.data.StudentEnrollCourse;

            if (result.error) {
                this.$initiateNotification('error', "Update error", result.message)
                return
            }

            this.$initiateNotification('success', "Enrollment successful", result.message)

            clearTimeout(this.timeOutHolder)

            this.timeOutHolder = setTimeout(() => {
                this.$router.push(`/course/${this.courseId}/`)
            }, 1000);   


        },
        checkCourseStatus: function (courseId, coursePrice, courseName) {
            this.courseName = courseName;
            this.coursePrice = coursePrice;
            this.courseId = courseId;

            if (this.accessToken) {
                // 
                // just enroll student into course
                if (this.coursePrice == 0) {
                    this.transactionId = "FREE";
                    this.enrollStudentIntoCourse();
                    return
                }

                this.anonymousModal = new bootstrap.Modal(document.getElementById('knownUserPaymentModal'))
                
            } else {
                this.anonymousModal = new bootstrap.Modal(document.getElementById('anonymouseSignUpForACourse'))
            }

            this.anonymousModal.toggle()

        },
        getImageUrl: function (imageName) {
            return `https://res.cloudinary.com/cudua-images/image/upload/w_auto,f_auto,q_auto/v1612215827/${process.env.CLOUDINARY_FOLDER}/cudua-course/${imageName}` 
        },
        statusChecker () {
            this.isLoggedIn = this.GetLoginStatus();
            let customerData = this.GetCustomerData();
            this.accessToken = customerData.userToken

            this.studentEmail = customerData.email;
            this.studentName = customerData.fullname;
        },
        formatPrice (number) {
            return this.$numberNotation(number)
        },
        getAllCourses: async function () {
            
            this.isLoading = true;

            let context = {
                headers: {
                    'accessToken': this.accessToken
                }
            }
            
            let request = await this.$performGraphQlQuery(this.$apollo, GET_ALL_COURSES_FOR_ANONYMOUS_USER, {}, context);
            
            this.isLoading = false;

            if (request.error) {
                this.errorMessage = request.message;
                this.errorPage = true;
                return this.$initiateNotification('error', 'Failed request', request.message);
            }

            let result = request.result.data.studentGetAllCourses;

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

            this.getAllCourses()
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