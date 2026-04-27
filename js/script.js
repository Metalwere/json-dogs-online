'use strict';

let slcBreeds;
let divDogImages = [];
let divDogImage;
let btnGetImage;

window.addEventListener('load', initialize);

function initialize() {

    bindElements();
    addEvents();
    // getBreedLocal();
    getBreedOnline();
    addImageDogToPage();

}

function getBreedOnline() {
    fetch('https://dog.ceo/api/breeds/list/all').then(function (resp) {
        return resp.json();
    }).then(function (data) {
        console.log(data);

        //steek data in returnedObject
        const returnedObject = data.message;

        for (let breed in returnedObject) {
            slcBreeds[slcBreeds.length] = new Option(breed, breed);

            getPictureOnline();
        }
    })
}

function getPictureOnline() {
    const selectedBreed = slcBreeds[slcBreeds.selectedIndex].value;

    const url = `https://dog.ceo/api/breed/${selectedBreed}/images`;
    fetch(url).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        
        const returnedObjects = data.message;
        divDogImages = returnedObjects;

        getRandomDogImage();
        addImageDogToPage();
    })
}

function addImageDogToPage() {
    divDogImage.appendChild(getRandomDogImage());
}

function addEvents() {
    slcBreeds.addEventListener('change', getBreedOnline); //= getBreedLocal
    btnGetImage.addEventListener('click', getPictureOnline);
}

function bindElements() {
    slcBreeds = document.querySelector('#breedSelector');
    divDogImage = document.querySelector('#dogImage');
    btnGetImage = document.querySelector('#getImage');
}

function getBreedLocal() {
    //key message
    //breeds['message'][breed]

    for (let breed in breeds['message']) {
        slcBreeds[slcBreeds.length] = new Option(breed, breed);
    }

    //show dataPicture
    getPictureLocal();
}

function getPictureLocal() {
    //picture van welk ras ==> dataPictures['golden']
    const selectedBreed = slcBreeds[slcBreeds.selectedIndex].value;

    //array van immages van het geselecteerde ras
    const ImagesBreed = dataPictures[selectedBreed];
    divDogImages = ImagesBreed;

    //random image array
    getRandomDogImage();
    addImageDogToPage();
}

function getRandomDogImage() {
    //reset div first
    divDogImage.textContent = "";

    //imf DOM
    const image = document.createElement('img');

    //welke random image
    const selectedImage = Math.floor(Math.random() * divDogImages.length)

    //src, alt, title
    image.src = divDogImages[selectedImage];
    image.alt = slcBreeds[slcBreeds.selectedIndex];//.value;
    image.title = slcBreeds[slcBreeds.selectedIndex];//.value;

    //return image
    return image;

}