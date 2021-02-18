export default ({app}, inject) => {
    let showCustomerMobileNav = (sideNav, sideNavContent, status) => {
        // 0 means nav is hidden
        // 1 means nav is visible

        let body = document.querySelector("body");

        if (status == "0") {
            // show nav
            body.classList.add('overflow-hidden')
            sideNav.classList.add('js-show-nav') // show nav container
            sideNavContent.classList.remove('js-slide-out'); // remove slide-out animation
            sideNavContent.classList.add('js-slide-in'); // add slide-in animation
            // navToggle.setAttribute('data-toggle-status', '1'); // change data-toggle-status attr in nav toggle
        } else {
            // hide nav
            // navToggle.setAttribute('data-toggle-status', '0');
            sideNavContent.classList.remove('js-slide-in');
            sideNavContent.classList.add('js-slide-out');
            body.classList.remove('overflow-hidden')
            setTimeout(() => {
                sideNavContent.classList.remove('js-slide-out');
                sideNav.classList.remove('js-show-nav')
            }, 500);
        }
    }

    inject('showCustomerMobileNav', showCustomerMobileNav);


    let customerTabClicks = (tabClickEvent, tabContentId, tabContentArea, Tabs) => {
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
        
        let myContentPanes = document.querySelectorAll(`${tabContentId} ${tabContentArea}`);
        
        for (let i = 0; i < myContentPanes.length; i++) {
            myContentPanes[i].classList.remove("is-active");
            myContentPanes[i].classList.remove("showEffect");
        }
        
        let tabAttribute = `${tabContentId} #${activePaneId}`;
        let activePane = document.querySelector(tabAttribute);
        activePane.classList.add("is-active");
        activePane.classList.add("showEffect");
    }

    inject('customerTabClicks', customerTabClicks);

    let rangeController = (rangeSliders) => {
        
        for (const rangeSlider of rangeSliders) {
            rangeSlider.addEventListener("input", function (event) {
                let getTarget = event.target;
                let outputTarget = document.getElementById(getTarget.getAttribute('data-target'));
                outputTarget.innerHTML = app.$numberNotation(rangeSlider.value)
            })
        }    
    }

    inject('rangeController', rangeController)

    let carouselActionSlider = (element,direction,speed,distance,step) => {
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

    inject('carouselActionSlider', carouselActionSlider)

}