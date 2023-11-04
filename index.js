'use strict'

let nextBtn= document.querySelector('.fa-chevron-right');
let backBtn= document.querySelector('.fa-chevron-left');
let imgBannerBlock = document.querySelector('.main-img-wraper')


let imgs = [
    './css/imgs/mainImgs/night.jpg',
    './css/imgs/mainImgs/mountain.jpg',
    './css/imgs/mainImgs/water.jpg',
    './css/imgs/mainImgs/forest.jpg',
    './css/imgs/mainImgs/hike.jpg',
    
];

let currentImgIndex = 0;

nextBtn.addEventListener('click', ()=>{
    currentImgIndex = (currentImgIndex +1)% imgs.length ;
    imgBannerBlock.style.backgroundImage =`url(${imgs[currentImgIndex]})`;
});

backBtn.addEventListener('click', ()=>{
    currentImgIndex = (currentImgIndex-1)%imgs.length;
    imgBannerBlock.style.backgroundImage =`url(${imgs[currentImgIndex]})`;
    if (currentImgIndex === 0){
        currentImgIndex = (imgs.length +1)-1;
    }
});