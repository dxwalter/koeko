
function changeJumbotronColor () {

    let randomNumer = Math.floor(Math.random() * 8) + 1;
    let target = document.getElementById('jumbotronContainer');
    target.setAttribute('data-bg', randomNumer)

    let jumbotronImageNumber = Math.floor(Math.random() * 5) + 1;
    let imageTarget = document.getElementById('jumbotronImgContainer');
    imageTarget.setAttribute('data-bg-img', jumbotronImageNumber)
}


var myCarousel = document.querySelector('#myCarousel')
if (myCarousel) {
    var carousel = new bootstrap.Carousel(myCarousel);
}


let jumbotronContainer = document.getElementById('jumbotronContainer');
if (jumbotronContainer) changeJumbotronColor();