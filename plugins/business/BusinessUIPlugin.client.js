export default ({app}, inject) => {

    // show and hide nav drawer
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

    inject('showMobileNav', showMobileNav)

    
    // open/launch modal
    let openModal = (target) => {
        document.querySelector("body").classList.add("overflow-hidden");
        document.getElementById(target).classList.add('display-block')
        document.getElementById(target).classList.toggle("show-modal");
    }
    inject('openModal', openModal)

    // close modal 
    let closeModal = (target) => {
        document.querySelector("body").classList.remove("overflow-hidden");
        let element = document.getElementById(target)
        if (element == null) return
        document.getElementById(target).classList.toggle("show-modal");
        document.getElementById(target).classList.remove('display-block')
    }
    inject('closeModal', closeModal)

    // tabs
    let myTabClicks = (tabClickEvent, Tabs) => {
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
        
        for (let i = 0; i < myContentPanes.length; i++) {
            myContentPanes[i].classList.remove("is-active");
            myContentPanes[i].classList.remove("showEffect");
        }
        
    
        let tabAttribute = "#tabContent #"+activePaneId;
        let activePane = document.querySelector(tabAttribute);
        activePane.classList.add("is-active");
        activePane.classList.add("showEffect");
    }
    inject('myTabClicks', myTabClicks)

    // accordion
    let toggleAccordion = (accordionHeader, accordionItem) => {

        let itemClass = accordionHeader.parentNode.className;
    
        for (let i = 0; i < accordionItem.length; i++) {
            accordionItem[i].className = 'js-accordionItem close';
        }
    
        if (itemClass == 'js-accordionItem') {
            accordionHeader.parentNode.className = 'js-accordionItem open';
        } else if (itemClass == 'js-accordionItem open') {
            accordionHeader.parentNode.className = 'js-accordionItem close';
        } else if (itemClass == 'js-accordionItem close') {
            accordionHeader.parentNode.className = 'js-accordionItem open';
        }
    
    }
    inject('toggleAccordion', toggleAccordion);


    // drag for drag and drop
    let dragOverHandler = (e, dragZone) => {
        e.preventDefault();
        // open drop zone overlay
        dragZone.style.display = 'flex';
    }
    inject('dragOverHandler', dragOverHandler)



    // drag and drop
    let dropHandler = (e, target, dragZone) => {

        // Prevent default behavior (Prevent file from being opened)

        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.items[i].getAsFile();
                    app.$showImagePreview (window.URL.createObjectURL(file), target)
                    return file
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                if (e.dataTransfer.items[i].kind === 'file') {
                    let file = e.dataTransfer.items[i].getAsFile();
                    app.$showImagePreview (window.URL.createObjectURL(file), target)
                    return file
                }
            }
        }

        // hide drop zone overlay
        dragZone.style.display = 'none';
    }
    inject('dropHandler', dropHandler)

    // drag out
    let dragOutHandler = (e, dragZone) => {
        e.preventDefault();
        // open drop zone overlay
        dragZone.style.display = 'none';
    }
    inject('dragOutHandler', dragOutHandler)

    // image previews
    let previewImage = (e, target) => {
        let inputImagePath = URL.createObjectURL(e.target.files[0]);
        return app.$showImagePreview(inputImagePath, target)
    }

    inject('previewImage', previewImage)
    
    let showImagePreview = (path, target) => {
        let previewTarget = document.getElementById(target);
        let imageTag = `<img src="${path}">`;
        previewTarget.innerHTML = "";
        previewTarget.style.display = 'block'
        previewTarget.innerHTML = imageTag;  
        
        return imageTag
    }
    inject('showImagePreview', showImagePreview);


    let productImageSlides = (n, slides) => {
        
        let currentSlide;

        if (slides.length > 0) {
    
            if (n > slides.length) {currentSlide = 1}
            if (n <= slides.length) {currentSlide = slides.length}
            if (n < slides.length) {currentSlide = n}
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("is-active");
            }
            slides[currentSlide - 1].classList.add("is-active");
        }
    }

    inject('productImageSlides', productImageSlides);


    let sideScroll = (element,direction,speed,distance,step) => {
        let scrollAmount = 0;
        let slideTimer = setInterval(function(){
            if(direction == 'left'){
                element.scrollLeft += step;
            } else {
                element.scrollLeft -= step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
        }, speed);
    }

    inject('sideScroll', sideScroll)

    let carouselAction = (carouselNavigation) => {
        for (const action of carouselNavigation) {
            action.addEventListener('click', (e) => {
                // e.preventDefault();
                e.stopPropagation();
                let getDataAttribute = e.target;
                let targetCarousel = getDataAttribute.getAttribute('data-target');
                let carouselSlide = document.getElementById(targetCarousel)
                let carouselDirection = getDataAttribute.getAttribute('data-direction');
                let carouselItems = document.querySelectorAll(`#${targetCarousel} .carousel-item`);
                let size = carouselItems[0].clientWidth;
                
                if (carouselDirection == 'left') {
                    app.$sideScroll(carouselSlide, 'left', 30, size, 10);
                } else {
                    app.$sideScroll(carouselSlide, 'right', 30, size, 10);
                }
            })
        }
    }

    inject("carouselAction", carouselAction);

}