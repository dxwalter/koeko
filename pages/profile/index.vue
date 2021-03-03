<template>
    <div>
        <div>
            <HEADER></HEADER>
            <Nuxt />
        </div>
        <div class="page-container-two grey-bg">
            <div class="container">
                <div class="profile-container">
                    <div class="profile-image-circle">
                        <img :src="profilePicture" alt="" v-show="profilePicture.length > 0">
                        <div class="temporary-name" v-show="!profilePicture">{{getNameLogo(fullname)}}</div>
                    </div>
                    <div class="content">

                        <div class="profile-content name">
                            {{fullname}}
                        </div>
                        <div class="profile-content">
                            {{email}}
                        </div>
                        <div class="profile-content">
                            <span v-show="phoneNumber">{{phoneNumber}}</span>
                            <span v-show="!phoneNumber">-</span>
                        </div>
                        <div class="profile-content">
                            <span v-show="instagramUsername">{{instagramUsername}}</span>
                            <span v-show="!instagramUsername">-</span>
                        </div>
                        <div class="profile-content last">
                            <span v-show="gender">{{gender}}</span>
                            <span v-show="!gender">-</span>
                        </div>

                        <div class="d-flex-center"> 
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editStudentProfile">Edit your profile</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="editStudentProfile" tabindex="-1" aria-labelledby="editStudentProfile" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update your profile</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="form-div">
                            <div class="select-dp-container">
                                <div class="edit-profile-dp">
                                    <img :src="profilePicture" alt="" v-show="profilePicture.length > 0">
                                    <div class="temporary-name" v-show="!profilePicture">{{getNameLogo(fullname)}}</div>

                                    <div id="previewBusinessLogo" class="edit-logo-preview"></div>
                                </div>
                                <button class="btn btn-danger btn-sm" id="loadProfileImage">
                                    Select a photo
                                    <div class="loader-action"><span class="loader"></span></div>
                                </button>
                                <input type="file" class="opacity-none" id="selectimage" ref="dpUpload" @change="uploadLogoImage($event, 'previewBusinessLogo')" accept="image/png,image/jpg,image/jpeg">
                            </div>
                            <div></div>
                        </div>

                        <div class="form-div">
                            <input type="text" name="fullname" id="editFullname" class="form-control" v-model="fullname" placeholder="Fullname">
                        </div>
                        <div class="form-div">
                            <input type="text" name="email" id="editEmail" class="form-control" v-model="email" placeholder="Email address">
                        </div>
                        <div class="form-div">
                            <input type="number" name="phoneNumber" id="editPhone" class="form-control" v-model="phoneNumber" placeholder="Phone Number">
                        </div>
                        <div class="form-div">
                            <input type="text" name="instagramUsername" id="editInstagram" class="form-control" v-model="instagramUsername" placeholder="Instagram username">
                        </div>
                        <div class="form-div mg-bottom-32">
                            <select id="editGender" class="form-control" @change="setGenderValue($event)">
                                <option selected>Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-primary width-100" @click="saveProfileEdit()" id="saveProfileEdit">
                            Save changes
                            <div class="loader-action"><span class="loader"></span></div>    
                        </button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

import { CHANGE_PROFILE_IMAGE, EDIT_STUDENT_PROFILE } from '~/graphql/student';

export default {
    name: "LANDINGPAGE",
	components: {HEADER, FOOTER, BOTTOMADS},
    data: function () {
        return{ 
            instagramUsername: "",
            phoneNumber: "",
            email: "",
            fullname: "",
            gender: "",
            accessToken: "",
            profilePicture: ""
        }
    },
    methods: {
		getNameLogo: function (businessName) {
			if (process.browser) {
				return this.$convertNameToLogo(businessName)
			}
        },
        ...mapGetters({
            'GetLoginStatus': 'student/GetLoginStatus',
            'GetCustomerData': 'student/GetCustomerDetails',
        }),
        saveProfileEdit: async function () {

            if (this.fullname.length < 2) {
                this.$showToast('Enter a valid name', 'error', 4000);
                return this.$addRedBorder('editFullname')
            } else {
                this.$removeRedBorder('editFullname')
            }


            if (this.email.length == 0 || this.$validateEmailAddress(this.email) == false) {
                this.$showToast('Enter a valid email address', 'error', 4000);
                return this.$addRedBorder('editEmail')
            } else {
                this.$removeRedBorder('editEmail')
            }

            
            if (this.phoneNumber.length < 11) {
                this.$showToast('Enter a valid phone number', 'error', 4000);
                return this.$addRedBorder('editPhone')
            } else {
                this.$removeRedBorder('editPhone')
            }
            
            if (this.instagramUsername.length < 3) {
                this.$showToast('Enter your instagram handle', 'error', 4000);
                return this.$addRedBorder('editInstagram')
            } else {
                this.$removeRedBorder('editInstagram')
            }

            if (this.gender.length == 0) {
                this.$showToast('Enter your instagram handle', 'error', 4000);
                return this.$addRedBorder('editInstagram')
            } else {
                this.$removeRedBorder('editInstagram')
            }

            
            let variables = { 
                fullname: this.fullname,
                email: this.email,
                phoneNumber: this.phoneNumber,
                instagramHandle: this.instagramUsername,
                gender: this.gender
            }

            let context = {
                hasUpload: true,
                headers: {
                    'accessToken': this.accessToken
                }
            }


            let target = document.getElementById('saveProfileEdit');
            target.disabled = true;

            let request = await this.$performGraphQlMutation(this.$apollo, EDIT_STUDENT_PROFILE, variables, context);
            
            target.disabled = false;
            


            if (request.error == true) {
                // reset input
                this.$initiateNotification('error', 'Failed request', 'A network error occurred');
                return
			}

            let result = request.result.data.EditStudentProfileDetails

            if (!result.success) {
                this.$initiateNotification('error', "Failed update", result.message)
                return
            }

            this.$initiateNotification('success', "Profile updated", result.message)

            this.$store.dispatch('student/setCustomerData', {
                fullname: this.fullname,
                email: this.email,
                gender: this.gender,
                instagramId: this.instagramUsername,
                phone: this.phoneNumber
            })



        },
        uploadLogoImage: async function(e, preivewData) {

            let file = e.target.files[0];
            let uploadFile = e.target.files[0];

            if (uploadFile == undefined) return

            let fileValidation = this.$checkFileExtension(uploadFile.name);

            if (fileValidation == false) {
                this.$initiateNotification('info', "", "Choose a valid image for your profile picture")
                return
            } 

            this.$previewImage(e, preivewData);

            let variables = { 
                file: uploadFile
            }

            let context = {
                hasUpload: true,
                headers: {
                    'accessToken': this.accessToken
                }
            }

            let target = document.getElementById('loadProfileImage');

            target.disabled = true;
            
            let request = await this.$performGraphQlMutation(this.$apollo, CHANGE_PROFILE_IMAGE, variables, context);
            
            target.disabled = false;
            


            if (request.error == true) {
                // reset input
                this.$refs.dpUpload.value=null;
                this.$initiateNotification('error', 'Failed request', 'A network error occurred');
                return
			}

            let result = request.result.data.EditStudentProfileImage

            if (!result.success) {
                this.$refs.dpUpload.value=null;
                this.$initiateNotification('error', "Failed upload", result.message)
                return
            }

            this.$initiateNotification('success', "Image uploaded", result.message)

            this.profilePicture = result.url

            this.$store.dispatch('student/setCustomerData', {
                displayPicture: result.url
            })
                
        },
        getUserData: function () {
            let customerData = this.GetCustomerData();
            this.accessToken = customerData.userToken

            this.email = customerData.email;
            this.fullname = customerData.fullname;
            this.profilePicture = customerData.displayPicture;

            this.phoneNumber = customerData.phone
            this.instagramUsername = customerData.instagramId
        },
        setGenderValue: function (e) {
            let selectForm = e.target.options
            console.log(selectForm)
            let selectedIndex = e.target.options[e.target.options.selectedIndex];
            this.gender = selectedIndex.value

            let target = document.getElementById('editStudentProfile');
            target.classList.add('show');

        }
    },
    created() {
        if (process.browser) {
            this.getUserData()
        }
    }
}
</script>

<style>


</style>
