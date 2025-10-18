
// Countdown and slideshow script


// Array of image paths
const images = [
    'media/hanna1.png',
    'media/hanna2.png',
    'media/hanna3.png',
    'media/hanna4.png',
    'media/hanna5.png',
    'media/hanna6.png',
];

let currentImageIndex = 0;
let count = 10;
const output = document.getElementById('timer');
const imageContainer = document.getElementById('image-container');

// Function to cycle through images
function cycleImages() {
    const img = document.createElement('img');
    img.src = images[currentImageIndex];
    img.alt = `Hanna image ${currentImageIndex + 1}`;

    // Add small-image class for specific filenames
    if (images[currentImageIndex].includes('hanna5') || images[currentImageIndex].includes('hanna6')) {
        img.classList.add('small-image');
    } else {
        img.classList.remove('small-image');
    }

    // Replace current content of image container with the new image
    imageContainer.innerHTML = '';
    imageContainer.appendChild(img);

    currentImageIndex++;
}

// Countdown logic wrapped in a function
function startCountdown() {
    // Hide the start button
    document.getElementById('start').style.display = 'none';

    count = 10;
    currentImageIndex = 0;
    output.style.display = '';
    imageContainer.style.display = 'none';
    output.textContent = count;

    const countdown = setInterval(() => {
        if (count >= 0) {
            output.textContent = count;
            count--;
        }

        if (count === 0) {
            // hide timer and show image container
            output.style.display = 'none';
            imageContainer.style.display = 'flex';

            currentImageIndex = 0;
            cycleImages(); // Show first image
            clearInterval(countdown);

            // Start cycling through images every 2 seconds, stop after last image
            const slideshow = setInterval(() => {
                if (currentImageIndex < images.length) {
                    cycleImages();
                } else {
                    clearInterval(slideshow);
                }
            }, 2000);
        }
    }, 500);
}

// Start countdown on button click
document.getElementById('start').addEventListener('click', startCountdown);

// Display formatted date
const now = new Date();
const formattedDate = now.toLocaleString();
document.getElementById('date').innerHTML = formattedDate;

