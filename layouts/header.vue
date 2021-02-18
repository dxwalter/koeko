<template>
    <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
            <div class="navbar-brand">
                <img src="~/assets/images/koeko-logo.png" alt="" srcset="">
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex-right" id="navbarSupportedContent">

                <ul class="navbar-nav mb-lg-12">
                <li class="nav-item">
                    <n-link prefetch class="nav-link active" aria-current="page" to="/all-courses">Courses</n-link>
                </li>
                <li class="nav-item">
                    <n-link prefetch class="nav-link active" aria-current="page" to="/auth/sign-in">Sign in</n-link>
                </li>
                <li class="nav-item">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signUpForACourse">Get started</button>
                </li>
                </ul>


            </div>
            </div>
        </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>