export default ({app}, inject) => {
    
    let singleClickTab = (singleTabClick) => {
        for (const action of singleTabClick) {
            action.addEventListener('click', (e) => {
                e.preventDefault();
                let getTarget = e.target;
                let singleTabContainer = document.getElementById(getTarget.getAttribute('data-target'));
                alert(singleTabContainer)
                singleTabContainer.classList.toggle(`showEffect`);
            })
        }
    }

    inject("singleClickTab", singleClickTab);

    let carouselSlider = (target, direction, size) => {
        
        let carouselSlide = document.getElementById(target)
        
        if (direction == 'left') {
            app.$carouselActionSlider(carouselSlide, 'left', 30, size, 10);
        } else {
            app.$carouselActionSlider(carouselSlide, 'right', 30, size, 10);
        }
    }

    inject("carouselSlider", carouselSlider);

}