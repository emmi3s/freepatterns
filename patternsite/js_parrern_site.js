const dotsContainer = document.querySelector('.dots-container');
const image = document.querySelector('.container-image img');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

const images = ['items_directory_big/testimage3.jpeg', 'items_directory_big/testimage.jpeg', 'items_directory_big/ttestimage2.jpeg'];
let currentImageIndex = 0;

function showImage(index) {
  image.src = images[index];
}

function updateDots() {
  dotsContainer.innerHTML = '';

  images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      showImage(index);
      highlightDot(index);
    });
    dotsContainer.appendChild(dot);
  });

  highlightDot(currentImageIndex);
}

function highlightDot(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

updateDots();

prevButton.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showImage(currentImageIndex);
  highlightDot(currentImageIndex);
});

nextButton.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showImage(currentImageIndex);
  highlightDot(currentImageIndex);
});
