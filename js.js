'use strict';



//Filter-valikko

// poistaa valikosta dress, skirt jos valitsee gender -male
const selectGender = document.getElementById('gender');

selectGender.addEventListener('change', function () {
    const selectedGender = selectGender.value;
    const dressesOption = document.querySelector('option[value="dress"]');
    const skirtsOption = document.querySelector('option[value="skirt"]');

    if (selectedGender == 'male'){
        dressesOption.style.display = 'none';
        skirtsOption.style.display = 'none';
    } else {
        dressesOption.style.display = 'block';
        skirtsOption.style.display = 'block';
    }}
    )





async function fetchImages(start, batch) {
    let imagePaths = [];

    for (let i = start + 1; i <= start + batch; i++) {
        const imagePath = `items_directory/item${i}.jpg`;
        try {
            const response = await fetch(imagePath, { method: 'HEAD' });
            //console.log(response.status)
            if (response.ok) {
                imagePaths.push(imagePath);
            } else {
                return imagePaths;
            }
        } catch (error) {
            console.error(`Error fetching image ${i}:`, error);
        }
    }
    console.log(imagePaths)
    return imagePaths;
}


//lisää kuvat sivulle
function imagesToPage(images) {
    const gallery = document.querySelector('.gallery');

    images.forEach(imagePath => {
        const link = document.createElement('a');
        link.href = ''; //Uuden sivun linkki

        const imageElement = document.createElement('img');
        imageElement.src = imagePath;
        imageElement.alt = 'picture of item';

        link.appendChild(imageElement);

        const item = document.createElement('div');
        item.classList.add('item');
        item.appendChild(link);

        gallery.appendChild(item);

        });
}



// näytettävien kuvien määrä sivulla
const imagesPerPage = 20;
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
async function nextPage(pageNumber) {
    const start = (pageNumber -1) * imagesPerPage;
    const images = await fetchImages(start, imagesPerPage);

    //poistaa aikaisemmat kuvat
    if (document.querySelector('.gallery').children.length > 0) {
        document.querySelector('.gallery').innerHTML = '';
    }

    imagesToPage(images);
}

nextPage(currentPage);

