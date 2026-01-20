document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Lightbox/Overlay functionality
    let overlay = document.getElementById("overlay");
    
    // If overlay doesn't exist, create it
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.innerHTML = `
            <div class="overlay-content">
                <button id="close" class="close-btn">&times;</button>
                <img id="overlay-img" src="" alt="">
                <div id="overlay-caption" class="overlay-caption"></div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const overlayImg = document.getElementById("overlay-img");
    const overlayCaption = document.getElementById("overlay-caption");
    const closeBtn = document.getElementById("close");

    // Add click event to all images (you can be more specific with a class selector)
    document.querySelectorAll("img").forEach(img => {
        // Skip nav logo and other images you don't want clickable
        if (!img.classList.contains('nav-logo')) {
            img.style.cursor = 'pointer';
            img.addEventListener("click", () => {
                overlay.style.display = "flex";
                overlayImg.src = img.src;
                overlayImg.alt = img.alt;
                overlayCaption.textContent = img.alt || '';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        }
    });

    // Close overlay function
    function closeOverlay() {
        overlay.style.display = "none";
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener("click", closeOverlay);
    }

    // Click outside the image closes overlay
    overlay.addEventListener("click", e => {
        if (e.target === overlay) {
            closeOverlay();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
            closeOverlay();
        }
    });
});

