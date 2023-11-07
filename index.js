'use strict'

// first slider
function firstSlider(){
  

let nextBtn= document.querySelector('.rght');
let backBtn= document.querySelector('.lft');
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
}

// city slider with special data
function citySlider(){

  // create data for slider

let georgianCities = [
  {
    id: 1,
    title: 'Tbilisi',
    image: './css/imgs/mainImgs/tbilisi.jpg',
    description: 'Tbilisi, the capital of Georgia, is known for its diverse architecture, historic churches, and vibrant arts scene. It sits on the banks of the Kura River and offers a mix of modern and historic attractions.'
  },
  {
    id: 2,
    title: 'Batumi',
    image: '../css/imgs/mainImgs/batumi.jpg',
    description: 'Batumi, a seaside city on the Black Sea coast, is famous for its beaches, botanical garden, and modern architecture. It\'s a popular tourist destination with a subtropical climate.'
  },
  {
    id: 3,
    title: 'Kutaisi',
    image: '../css/imgs/mainImgs/kutaisi.jpg',
    description: 'Kutaisi, Georgia\'s second-largest city, is known for its historical and architectural heritage. It\'s home to the Bagrati Cathedral and the Gelati Monastery, both UNESCO World Heritage Sites.'
  },
   {
    id:4,
    title: 'Gori',
    image: '../css/imgs/mainImgs/gori.jpg',
     description: 'Gori is the birthplace of Joseph Stalin and is known for its Stalin Museum. The city is also home to the ancient Uplistsikhe Cave Town and the Gori Fortress.'
   },
   {
    id: 5,
    title: 'Mtskheta',
    image: '../css/imgs/mainImgs/mtskheta.jpg',
    description: 'Mtskheta, one of the oldest cities in Georgia, is a UNESCO World Heritage Site. It\'s known for its historical and religious significance, with attractions like the Svetitskhoveli Cathedral and Jvari Monastery.'
  },
   {
    id: 6,
     title: 'Zugdidi',
    image:  '../css/imgs/mainImgs/zugdidi.jpg',
    description: 'Zugdidi is a city in western Georgia, known for its lush landscapes and the Dadiani Palace, which houses a museum. The city is a gateway to the beautiful Samegrelo region.'
  }
]; 

let citiesWrapper = document.querySelector('.cities-wraper');
let cityNextBtn = document.querySelector('.city-next-btn');
let cityBackBtn = document.querySelector('.city-back-btn');

let currentIndex = 0;
let citiesPerPage = 3; 

function updateCitiesPerPage() {
  if (window.innerWidth >= 1024) {
    citiesPerPage = 3;
  } else if (window.innerWidth >= 480) {
    citiesPerPage = 2; 
  } else {
    citiesPerPage = 1;
  }

  displayCities();
}
window.addEventListener('resize', updateCitiesPerPage);

updateCitiesPerPage();

//  display cities based on the current index
function displayCities() {
  citiesWrapper.innerHTML = ''; // Clear the container

  for (let i = currentIndex; i < currentIndex + citiesPerPage; i++) {
    if (i < georgianCities.length) {
      const cityData = georgianCities[i];

      let cityBox = document.createElement('div');
      cityBox.classList.add('box-item');
      let cityName = document.createElement('h3');
      cityName.textContent = cityData.title;
      let cityImg = document.createElement('img');
      cityImg.src = cityData.image;
      cityImg.classList.add("img-size");
      let cityInfo = document.createElement('p');
      cityInfo.textContent = cityData.description;

      cityBox.appendChild(cityImg);
      cityBox.appendChild(cityName);
      cityBox.appendChild(cityInfo);

      setTimeout(() => {
        cityBox.classList.add('show');
      }, 50 * (i - currentIndex));

      citiesWrapper.appendChild(cityBox);
    }
  }

  setTimeout(() => {
    for (let i = 0; i < georgianCities.length; i++) {
      if (i < currentIndex || i >= currentIndex + citiesPerPage) {
        const city = citiesWrapper.children[i - currentIndex];
        city.classList.remove('show');
      }
    }
  }, 100);
}

// EVENTLISTENERS

cityNextBtn.addEventListener('click', () => {
  currentIndex += citiesPerPage;
  if (currentIndex >= georgianCities.length) {
    currentIndex = 0;
  }
  displayCities();
});

cityBackBtn.addEventListener('click', () => {
  currentIndex -= citiesPerPage;
  if (currentIndex < 0) {
    currentIndex = Math.max(georgianCities.length - citiesPerPage, 0);
  }
  displayCities();
});

//DISPLAY CITIES

displayCities();
}

// // POP Up
function popUpFunction(){
  
let popUp = document.querySelector('.pop-up-icon');
let close = document.querySelector('.close');
let wraperPOP= document.querySelector('.pop-up-wraper');

popUp.addEventListener('click', ()=>{
  wraperPOP.classList.add('popAct');
})

close.addEventListener('click',()=>{
  wraperPOP.classList.remove('popAct');
})
}
popUpFunction();

// API PAGE 

function apiFunc(){
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

fetch(apiUrl, {method:'GET'})
.then(response=>{
  if (!response.ok){
    throw "error" + response.status;
  }
  return response.json();
})
.then(result =>{
  console.log(result[0].userId);
  const wraper = document.querySelector('.api-elements-wraper');
  const fragment = document.createDocumentFragment();
  const loadBtn = document.querySelector('#load-more-btn');
  const previousBtn = document.querySelector('#previous-more-btn');

  let counter = 1;

  function renderItems(){
    wraper.innerHTML = ''; 
    let filteredResult = result.filter(element => element.userId === counter);

    filteredResult.forEach((element)=>{
     
     let elementDiv = document.createElement('div');
     elementDiv.classList.add('element-wraper');
 
     let number = document.createElement('div');
     number.classList.add('number-wraper');
     number.textContent = element.id;
 
     let title = document.createElement('h2');
     title.textContent = element.title;
 
     let text = document.createElement('p');
     text.textContent = element.body;
 
 
     elementDiv.appendChild(number);
     elementDiv.appendChild(title);
     elementDiv.appendChild(text);
     fragment.appendChild(elementDiv);
     console.log(elementDiv);
   })
 
   
   wraper.appendChild(fragment);

   if (counter === 1) {
    previousBtn.disabled = true;
    
  } else {
    previousBtn.disabled = false;
  }

  if (counter === 10) {
    loadBtn.disabled = true;
  } else {
    loadBtn.disabled = false;
  }
}
  
  renderItems();

      loadBtn.addEventListener('click', ()=>{
        counter++;
        console.log(counter);
        renderItems();
      })
 
    previousBtn.addEventListener('click',()=>{
      counter--;
      renderItems();
      
    })

})
.catch(error => {
  console.error(error);
});

}



document.addEventListener("DOMContentLoaded", function () {

  // Call the function based on the current page

  if (document.querySelector(".homePage")) {
    firstSlider();
    citySlider();
    popUpFunction();
  } else if (document.querySelector(".discoveryPage")) {
    popUpFunction();
  } else if (document.querySelector(".apiPage")) {
    apiFunc();
    popUpFunction();
  }

});