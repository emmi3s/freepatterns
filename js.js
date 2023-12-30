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
        imageElement.loading = 'lazy';

        const item = document.createElement('div');
        item.classList.add('item'); //antaa elementille luokan. lisäisikö saman kun olemassa oleville kuville niin saa tyylimäärittelyt?
        item.appendChild(imageElement);

        gallery.appendChild(item);

        });
}



// kuvamäärän muuttujat
let start = 0;
const batch = 4;




// seuraa käyttäjän siirtymistä alaspäin sivulla
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight -100) {
        const images = fetchImages(start, batch); //kutsuu fetchImages funktiota
        start += batch;

        //kuvien lisääminen sivustolle funktion kutsuminen
        imagesToPage(images);
    }
});



