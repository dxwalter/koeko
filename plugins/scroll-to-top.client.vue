<template>
        <div class="filter-btn-container display-block" id="scrollTopContainer">
            <!-- <button class="close-modal-btn btn-icon btn-white advn-search-filter " > -->
            <button class="scroll-top-btn close-modal-btn btn-icon btn-light-grey" id="scrollToButton">
                <div class="dropdownCheckBox" @click="scrollNow()"> </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <use xlink:href="~/assets/images/all.svg#topArrow"></use>
                </svg>
            </button>
        </div>
</template>

<script>
export default {
    data: function () {
        return {
            scrollToTopBtn: "",
            rootElement: "",
            scrollTopContainer: ""
        }
    },
    computed: {
        handleResize() {
            this.screenWidth = window.innerWidth;
        },
    },
    methods: {
        scrollNow: function () {
            if (process.browser) {
                window.scrollTo(0, 0);
            }
        },
        handleScroll: function () {
            // Do something on scroll
            let scrollTotal = this.rootElement.scrollHeight - this.rootElement.clientHeight

            if ((this.rootElement.scrollTop / scrollTotal ) > 0.02) {
                // Show button
                this.scrollToTopBtn.classList.add("show-scroll-top-btn")
                // this.scrollTopContainer.classList.add("display-block")
            } else {
                // Hide button
                this.scrollToTopBtn.classList.remove("show-scroll-top-btn")
                // this.scrollTopContainer.classList.remove("display-block")
            }
        },
    },
    mounted () {
        if (process.client) {
            this.rootElement = document.documentElement
            this.scrollToTopBtn = document.querySelector(".scroll-top-btn")
            this.scrollTopContainer = document.getElementById('scrollTopContainer')
            document.addEventListener("scroll", this.handleScroll)
        }
    }
}
</script>

<style scoped>
.display-block {
    display: block !important;
}
.filter-btn-container {
    top: calc(100vh - 165px);
    z-index: 100;
}
.filter-btn-container .close-modal-btn {
    opacity: .9;
    width: 40px;
    height: 40px;
}
.scroll-top-btn {
    transform: translateY(189px);
}

.show-scroll-top-btn {
    transform: translateY(0);
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.9s ease;
    overflow: hidden;
    visibility: visible;
    position: absolute;
    width:100%;
    opacity: 1;
}

.fade-enter,
.fade-leave-to {
    visibility: hidden;
    width:100%;
    opacity: 0;
}

.filter-btn-container .close-modal-btn svg {
    width: 19px;
    height: 19px;
}
</style>