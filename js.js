'use strict';


//Globaalit muuttujat
let patternData = '';

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
  imagesToPage()
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

   imagesToPage()
});


groupSelect.addEventListener('change', (event) => {
    groupSelected = event.target.value;
   imagesToPage()
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
      patternData = jsonData;
      imagesToPage();
    })
    .catch(error => {
      console.error('Error fetching or parsing JSON:', error);
    });

    console.log(imagePaths)
}


//lisää kuvat sivulle
function imagesToPage() {
    let types = patternData.map(entry => entry.patternType);
    let genders = patternData.map(entry => entry.gender);
    let garmets = patternData.map(entry => entry.garmet);
    let ids = patternData.map(entry => entry.idnum);

    console.log(ids)

    ids = ids.filter((id, index) => (genderSelected === "" || genders[index] === genderSelected) && (patternSelected === "" || types[index] === patternSelected) && (groupSelected === "" || garmets[index] === groupSelected));

    console.log(ids)


    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';


    for (let i = 0; i < ids.length; i++) {

        const targetItem = patternData.find(item => item.idnum === ids[i]);

        const imagePath = targetItem.image_path;
        const creator = targetItem.creator;
        const itemNames = targetItem.itemName;

        const link = document.createElement('a');
        link.href = ''; //Uuden sivun linkki

        const imageElement = document.createElement('img');
        imageElement.src = imagePath;
        imageElement.alt = 'picture of item';

        link.appendChild(imageElement);


        const item = document.createElement('div');
        item.classList.add('item');
        item.appendChild(link);


         const h4Element = document.createElement('h4');
          h4Element.textContent = creator;
          h4Element.classList.add('gallery-picture-header'); // Add your h4 class here
          item.appendChild(h4Element);

          const pElement = document.createElement('p');
          pElement.textContent = itemNames;
          pElement.classList.add('gallery-picture-description'); // Add your p class here
          item.appendChild(pElement);

        gallery.appendChild(item);

        };
}


async function nextPage() {
    const images = await fetchImages();
}

nextPage();

