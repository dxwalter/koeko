<template>
  <div>
        <HEADER></HEADER>
        <Nuxt />


            <div class="page-container-two grey-bg">
                <div class="container">

                    <div class="jumbotron-bg mg-bottom-32" data-bg-img="1" id="jumbotronImgContainer" style="background-image: url(https://res.cloudinary.com/cudua-images/image/upload/v1613146869/cudua_academy/course-categories/graphic-design-course.svg);">
                        <div class="jumbotron-container course-title-hover">
                            <div>
                                <div class="big-jb-text">This is the course title and every thing that is to be.</div>
                            </div>
                        </div>
                    </div>

                    <div class="course-option-data-container ">
                        <div class="manage-column-container mg-bottom-32">
                          <div class="course-card-options-two align-self-center">
                            <div class="options-header">Course contents</div>
                          </div>

                          <div class="course-card-options-two">
                              <div class="options-header">60% complete</div>
                              <div class="options-detail"><progress value="60" max="100"></progress></div>
                          </div>
                            
                        </div>
                    </div>

                    <div class="course-option-data-container">

                      <div class="course-content-item">

                        <div class="mg-bottom-16 course-item-card">

                          <div class="intro-name-area">
                            <div class="image-container">
                              <img src="~/assets/images/wallpaper/1.png" alt="" srcset="">
                              <div class="when-completed">
                                <img src="~/assets/images/check.svg" alt="" srcset="">
                              </div>
                            </div>
                            <div class="content-title">Content title this is a cooo fooe as much</div>
                          </div>

                          <div>
                            <div>Praesent vestibulum dapibus nibh. Phasellus viverra nulla ut metus varius laoreet. Nam commodo suscipit quam. Etiam ut purus mattis mauris sodales aliquam. Phasellus gravida semper nisi.</div>
                          </div>
                        </div>

                        <div>
                          <a href="#" class="btn btn-primary ">Watch now</a>
                        </div>
                      </div>

                    </div>


                    <div class="course-option-data-container">

                      <div class="course-content-item">

                        <div class="mg-bottom-16 course-item-card">

                          <div class="intro-name-area">
                            <div class="image-container">
                              <img src="~/assets/images/wallpaper/1.png" alt="" srcset="">
                              <div class="when-completed">
                                <img src="~/assets/images/check.svg" alt="" srcset="">
                              </div>
                            </div>
                            <div class="content-title">Content title this is a cooo fooe as much</div>
                          </div>

                          <div>
                            <div>Praesent vestibulum dapibus nibh. Phasellus viverra nulla ut metus varius laoreet. Nam commodo suscipit quam. Etiam ut purus mattis mauris sodales aliquam. Phasellus gravida semper nisi.</div>
                          </div>
                        </div>

                        <div>
                          <a href="#" class="btn btn-primary ">Watch now</a>
                        </div>
                      </div>

                    </div>


                    <div class="course-option-data-container">

                      <div class="course-content-item">

                        <div class="mg-bottom-16 course-item-card">

                          <div class="intro-name-area">
                            <div class="image-container">
                              <img src="~/assets/images/wallpaper/1.png" alt="" srcset="">
                              <div class="when-completed">
                                <img src="~/assets/images/check.svg" alt="" srcset="">
                              </div>
                            </div>
                            <div class="content-title">Content title this is a cooo fooe as much</div>
                          </div>

                          <div>
                            <div>Praesent vestibulum dapibus nibh. Phasellus viverra nulla ut metus varius laoreet. Nam commodo suscipit quam. Etiam ut purus mattis mauris sodales aliquam. Phasellus gravida semper nisi.</div>
                          </div>
                        </div>

                        <div>
                          <a href="#" class="btn btn-primary">Watch now</a>
                        </div>
                      </div>

                    </div>


                    <div class="course-option-data-container">

                      <div class="course-content-item">

                        <div class="mg-bottom-16 course-item-card">

                          <div class="intro-name-area">
                            <div class="image-container">
                              <img src="~/assets/images/wallpaper/1.png" alt="" srcset="">
                              <div class="when-completed">
                                <img src="~/assets/images/check.svg" alt="" srcset="">
                              </div>
                            </div>
                            <div class="content-title">Content title this is a cooo fooe as much</div>
                          </div>

                          <div>
                            <div>Praesent vestibulum dapibus nibh. Phasellus viverra nulla ut metus varius laoreet. Nam commodo suscipit quam. Etiam ut purus mattis mauris sodales aliquam. Phasellus gravida semper nisi.</div>
                          </div>
                        </div>

                        <div>
                          <a href="#" class="btn btn-primary ">Watch now</a>
                        </div>
                      </div>

                    </div>


                    <div class="course-option-data-container">

                      <div class="course-content-item">

                        <div class="mg-bottom-16 course-item-card">

                          <div class="intro-name-area">
                            <div class="image-container">
                              <img src="~/assets/images/wallpaper/1.png" alt="" srcset="">
                              <div class="when-completed">
                                <img src="~/assets/images/check.svg" alt="" srcset="">
                              </div>
                            </div>
                            <div class="content-title">Content title this is a cooo fooe as much</div>
                          </div>

                          <div>
                            <div>Praesent vestibulum dapibus nibh. Phasellus viverra nulla ut metus varius laoreet. Nam commodo suscipit quam. Etiam ut purus mattis mauris sodales aliquam. Phasellus gravida semper nisi.</div>
                          </div>
                        </div>

                        <div>
                          <a href="#" class="btn btn-primary ">Watch now</a>
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

export default {
    name: "LANDINGPAGE",
	components: {HEADER, FOOTER, BOTTOMADS},

}
</script>

<style>

</style>