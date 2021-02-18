"use-strict";

// initialised variables
let screenWidth = screen.width;

let showMobileNav = (sideNav, sideNavContent, navToggle) => {

    navToggle.classList.toggle('is-active')
    
    let toggleStatus = navToggle.getAttribute('data-toggle-status')
    // 0 means nav is hidden
    // 1 means nav is visible
    sideNavContent.style.display = 'unset';

    if (toggleStatus == "0") {
        // show nav
        sideNav.classList.add('js-show-nav') // show nav container
        sideNavContent.classList.remove('js-slide-out'); // remove slide-out animation
        sideNavContent.classList.add('js-slide-in'); // add slide-in animation
        navToggle.setAttribute('data-toggle-status', '1'); // change data-toggle-status attr in nav toggle
    } else {
        // hide nav
        navToggle.setAttribute('data-toggle-status', '0');
        sideNavContent.classList.remove('js-slide-in');
        sideNavContent.classList.add('js-slide-out');
        setTimeout(() => {
            sideNavContent.style.display = 'none';
            sideNavContent.classList.remove('js-slide-out');
            sideNav.classList.remove('js-show-nav')
        }, 500);
    }

}

let navToggle = document.getElementById('navToggleButton');
if (navToggle) {
    navToggle.addEventListener('click', function (e) {
        let sideNav = document.getElementById('sideNav');
        let sideNavContent = document.getElementById("sideNavContent");
        let showNav = screenWidth <= 1023 ? showMobileNav(sideNav, sideNavContent, navToggle) : sideNav.classList.toggle('js-fold-nav');

    })
}

let closeNavWithOverlay = document.getElementById('sideNav');
if (closeNavWithOverlay) {
    closeNavWithOverlay.addEventListener('click', function (e) {
        let navToggle = document.getElementById('navToggleButton');
        let sideNavContent = document.getElementById("sideNavContent");
        let showNav = screenWidth <= 1023 ? showMobileNav(closeNavWithOverlay, sideNavContent, navToggle) : "";
    })
}

// this openedModalTarget represents the targeted modal to be opened 
// the value stored in the openModalTarget is stored in data-target in html
let openedModalTarget;

// open modal
let openModalAction = document.querySelectorAll("[data-trigger]");
for (const action of openModalAction) {
   action.addEventListener('click', function(e) {
       e.preventDefault();
       openedModalTarget = this.getAttribute('data-target');
       openModal(openedModalTarget);
   })
}
// close modal with icon
let closeModalAction = document.querySelectorAll('[data-dismiss]');
for (const action of closeModalAction) {
    action.addEventListener('click', function(e) {
        e.preventDefault();
        openedModalTarget = this.getAttribute('data-target');
        closeModal(openedModalTarget);
    })
}

 // open modal function
openModal = (target) => {
    document.querySelector("body").classList.add("overflow-hidden");
    document.getElementById(target).classList.add('display-block')
    document.getElementById(target).classList.toggle("show-modal");
}

// close modal function
closeModal = (target) => {
    document.querySelector("body").classList.remove("overflow-hidden");
    document.getElementById(target).classList.toggle("show-modal");
    document.getElementById(target).classList.remove('display-block')
}

// close modal with esc key
window.onkeyup = function (e) {
    e.preventDefault();
    if (e.keyCode == 27) {
        if (document.querySelector('.overflow-hidden') !== null) {
            // .. it exists so remove modal
            closeModal(openedModalTarget);
        }
    }
}

// close modal by clicking outside the modal window
window.addEventListener("click", function(e) {
    for (const action of document.querySelectorAll(".modal-container")) {
        if (e.target === action) {
            closeModal(openedModalTarget);
        }
    }
});


// tabs
let Tabs = document.querySelectorAll("#tabList > #tabLink");
function myTabClicks(tabClickEvent) {
    for (let i = 0; i < Tabs.length; i++) {
        Tabs[i].classList.remove("is-active");
    }
    // the very link that was clicked
    let clickedTab = tabClickEvent.currentTarget;

    // Add active class to the clicked tab
    clickedTab.classList.add("is-active");

    // stop the page from reloading
    tabClickEvent.preventDefault();
    let anchorReference = tabClickEvent.target;
    let activePaneId = anchorReference.getAttribute("data-tab");
    
    let myContentPanes = document.querySelectorAll("#tabContent .tab-content-area");
    
    for (i = 0; i < myContentPanes.length; i++) {
        myContentPanes[i].classList.remove("is-active");
        myContentPanes[i].classList.remove("showEffect");
    }
    

    let tabAttribute = "#tabContent #"+activePaneId;
    let activePane = document.querySelector(tabAttribute);
    activePane.classList.add("is-active");
    activePane.classList.add("showEffect");
}

for (i = 0; i < Tabs.length; i++) {
    Tabs[i].addEventListener("click", myTabClicks)
}


// Accordion

let accordionItem = document.getElementsByClassName('js-accordionItem');
let accordionHeader = document.getElementsByClassName('js-accordionHeader');
for (i = 0; i < accordionHeader.length; i++) {
    accordionHeader[i].addEventListener('click', toggleAccordion, false);
}
function toggleAccordion() {

    let itemClass = this.parentNode.className;

    for (i = 0; i < accordionItem.length; i++) {
        accordionItem[i].className = 'js-accordionItem close';
    }

    if (itemClass == 'js-accordionItem') {
        this.parentNode.className = 'js-accordionItem open';
    } else if (itemClass == 'js-accordionItem open') {
        this.parentNode.className = 'js-accordionItem close';
    } else if (itemClass == 'js-accordionItem close') {
        this.parentNode.className = 'js-accordionItem open';
    }

}


// single tab
let singleTabClick = document.querySelectorAll('[data-single-tab]');
for (const action of singleTabClick) {
    action.addEventListener('click', (e) => {
        e.preventDefault();
        let getTarget = e.target;
        let singleTabContainer = document.getElementById(getTarget.getAttribute('data-target'));
        singleTabContainer.classList.toggle(`showEffect`);
    })
}

let hideLoadingPlaceholder = () => {
    setTimeout(() => {
        let loadingPlaceholder = document.getElementById('loadingPlaceholder');
        if (loadingPlaceholder) {
            loadingPlaceholder.style.display = 'none';
        }
    }, 1500);
}

document.addEventListener("DOMContentLoaded", hideLoadingPlaceholder);

/**
 * DRAG AND DROP FILES
 */
let dragZone = document.getElementById('dropZoneOverlay');
function dropHandler(e, target) {

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();

    if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
                let file = e.dataTransfer.items[i].getAsFile();
                showImagePreview (window.URL.createObjectURL(file), target)
                // console.log('... file[' + i + '].name = ' + file.name);
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
        }
    }

    // hide drop zone overlay
    dragZone.style.display = 'none';
}

function dragOverHandler(e) {
    e.preventDefault();
    // open drop zone overlay
    dragZone.style.display = 'flex';
}


function dragOutHandler(e) {
    e.preventDefault();
    // open drop zone overlay
    dragZone.style.display = 'none';
}

// end of drag and drop


// product image slider

let showSlides = n => {
    
    let slides = document.getElementsByClassName("product-image-slide");

    if (slides.length > 0) {

        if (n > slides.length) {currentSlide = 1}
        if (n < 1) {currentSlide = slides.length}
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("is-active");
        }
    
        slides[currentSlide - 1].classList.add("is-active");
    }

}

// initialize slide show
let currentSlide = 1;
showSlides(currentSlide)

let nextSlide = document.getElementById('nextSlide');
if (nextSlide) nextSlide.addEventListener('click', e => { showSlides(currentSlide += 1) })

let previousSlide = document.getElementById('previousSlide');
if (previousSlide) previousSlide.addEventListener('click', e => { showSlides(currentSlide += -1 ) })

// click on thumbnail
let thumbnail = document.querySelectorAll('[data-img-thumb]');
for (const action of thumbnail) {
    action.addEventListener('click', (e) => {
        e.preventDefault();
        let getTarget = e.target;
        let thumbCount = getTarget.getAttribute('data-slide');
        currentSlide = parseInt(thumbCount, 10)
        showSlides(parseInt(thumbCount, 10))
    })
}

function previewImage(e, target) {
    let inputImagePath = URL.createObjectURL(e.target.files[0]);
    showImagePreview(inputImagePath, target)
}

function showImagePreview (path, target) {
    let previewTarget = document.getElementById(target);
    let imageTag = `<img src="${path}">`;
    previewTarget.innerHTML = "";
    previewTarget.style.display = 'block'
    previewTarget.innerHTML = imageTag;   
}