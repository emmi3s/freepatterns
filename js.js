'use strict';

//Filter-valikko

let patternSelected = '';
let genderSelected = '';
let groupSelected = '';




//filter-valikko
const patternTypeSelect = document.getElementById('pattern-type');
const genderSelect = document.getElementById('gender');
const groupSelect = document.getElementById('group');



patternTypeSelect.addEventListener('change', (event) => {
    patternSelected = event.target.value;
  /*  fetchImages(patternSelected, genderSelected, groupSelected) */
});


genderSelect.addEventListener('change', (event) => {
    genderSelected = event.target.value;

    // rajaa pois mekot ja hameet
    const dressesOption = document.querySelector('option[value="dress"]');
    const skirtsOption = document.querySelector('option[value="skirt"]');

    if (genderSelected == 'male'){
        dressesOption.style.display = 'none';
        skirtsOption.style.display = 'none';
    } else {
        dressesOption.style.display = 'block';
        skirtsOption.style.display = 'block';
    }

  /*  fetchImages(patternSelected, genderSelected, groupSelected) */
});



groupSelect.addEventListener('change', (event) => {
    groupSelected = event.target.value;
   /* fetchImages(patternSelected, genderSelected, groupSelected) */
});




// hakee kuvien polut
async function fetchImages() {

    let imagePaths = [];

    fetch('patternsInfo.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(jsonData => {
      // Extract image paths
      imagePaths = jsonData.map(entry => entry.image_path);
      console.log('List of image paths:', imagePaths);
      //return imagePaths;
      imagesToPage(imagePaths);
      // Print the list of image paths

    })
    .catch(error => {
      console.error('Error fetching or parsing JSON:', error);
    });

    console.log(imagePaths)
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


// tekee siirtymän toiselle sivulle
async function nextPage() {
    const images = await fetchImages();
}

nextPage();

