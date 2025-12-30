let slideshow_img_number = 0;
let numImages = 3;

let vision = document.querySelector('.vision');
let mission = document.querySelector('.mission');
let values = document.querySelector('.values');

let principles = document.querySelector('.principles');
let container = document.querySelector('.principle-images');

window.addEventListener('scroll', () => {
    if (vision.getBoundingClientRect().top < (window.innerHeight/1.25)) {
        if (values.getBoundingClientRect().top < (window.innerHeight/1.25)) {
            if (mission.getBoundingClientRect().top < (window.innerHeight/1.25)) {
                setNumber(2);
            }
            else {
                setNumber(1);
            }
        }
        else {
            setNumber(0);
        }
    }
})

window.addEventListener('scroll', () => {
    if (principles.getBoundingClientRect().top < (window.innerHeight / 1.5)) {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }
    else {
        container.style.opacity = '0';
        container.style.transform = 'translateY(3vh)';
    }
})

function displayImages() {
    if (slideshow_img_number < 0) {
        slideshow_img_number = slideshow_img_number * -1;
        slideshow_img_number = slideshow_img_number % numImages;
        slideshow_img_number = numImages - slideshow_img_number;
    }
    else {
        slideshow_img_number = slideshow_img_number % numImages;
    }
    counter = 0;
    transform_amount = slideshow_img_number * -100;
    document.querySelectorAll('.slideshow-container .principle-image').forEach(image => {
        image.style.transform = 'translateY(' + transform_amount + '%)';
        object_position_amount = 50 - ((slideshow_img_number - counter) * 100);
        image.style.backgroundPosition = '50%' + object_position_amount + '%';
        counter++;
    })}

function setNumber(number) {
    slideshow_img_number = number;
    console.log(slideshow_img_number);
    displayImages();
}