'use strict';


// hakee kuvien polut ja lisää listaan
function fetchImages (start, batch) {
    let imagePaths = [];

    for (let i = start + 1; i <= start + batch; i++) {
        const imagePath = `items_directory/item${i}.jpg`; // POLKU VIRHEELLINEN?
        imagePaths.push(imagePath)
    }
    return imagePaths;
}




//lisää kuvat sivulle
function imagesToPage(images) {
    const gallery = document.querySelector('.gallery');

    images.forEach(imagePath => {
        const imageElement = document.createElement('img');
        imageElement.src = imagePath;
        imageElement.alt = 'picture of item';
        //imageElement.loading = 'lazy';

        const item = document.createElement('div');
        item.classList.add('item'); //antaa elementille luokan. lisäisikö saman kun olemassa oleville kuville niin saa tyylimäärittelyt?
        item.appendChild(imageElement);

        gallery.appendChild(item);

        });
}



// näytettävien kuvien määrä sivulla
const imagesPerPage = 12;
let currentPage = 1;

// sivumäärä (napit) kuvamäärän perusteella
const totalImages = 26; //tähän myöhemmin esim lista ja lengt, jolloin saa rajausominaisuuksien perusteella tarvittavan sivumäärän
const totalPages = Math.ceil(totalImages / imagesPerPage);

// luodaan sivunumerot
const pageNumbersArea = document.querySelector('.page-number');

for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    pageBtn.onclick = function () {
        nextPage(i);
    };
    pageNumbersArea.appendChild(pageBtn);
}


// tekee siirtymän toiselle sivulle
function nextPage(pageNumber) {
    const start = (pageNumber -1) * imagesPerPage;
    const images = fetchImages(start, imagesPerPage);

    //poistaa aikaisemmat kuvat
    if (document.querySelector('.gallery').children.length > 0) {
        document.querySelector('.gallery').innerHTML = '';
    }

    imagesToPage(images);
}






// seuraa käyttäjän siirtymistä alaspäin sivulla
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight - 600 && currentPage <= totalPages) {

        if (currentPage <= totalPages) {
            nextPage(currentPage);
            currentPage++;
        }
    }
});



