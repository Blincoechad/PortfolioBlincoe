document.addEventListener('DOMContentLoaded', () => {
  const full = document.querySelector('.fullimg');
  const fullImg = full ? full.querySelector('img') : null;
  const closeBtn = full ? full.querySelector('.close') : null;
  const caption = full ? full.querySelector('.caption') : null;

  document.querySelectorAll('.image-container img').forEach(image => {
    function openFullFromImage(e) {
      // prevent the browser context menu when right-clicking
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      if (!full || !fullImg) return;
      const src = image.getAttribute('src');
      const alt = image.getAttribute('alt') || '';
      fullImg.src = src;
      fullImg.alt = alt;
      if (caption) caption.textContent = alt;
      full.style.display = 'flex';
      full.setAttribute('aria-hidden', 'false');
     
      if (closeBtn) closeBtn.focus();
    }

    image.addEventListener('click', openFullFromImage);
    // open on right-click / context menu as well
    image.addEventListener('contextmenu', openFullFromImage);
  });
  

  function closeFull() {
    if (!full) return;
    full.style.display = 'none';
    full.setAttribute('aria-hidden', 'true');
    if (fullImg) {
      fullImg.src = '';
      fullImg.alt = '';
    }
    if (caption) caption.textContent = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeFull);

  // close when clicking outside the image
  if (full) {
    full.addEventListener('click', (e) => {
      if (e.target === full) closeFull();
    });
  }
});
const text = document.getElementById('subTitle');
// add event listener to change text on hover
if (text) {
  text.addEventListener("mouseover", () => {
    text.textContent = "My favorite bikes!!";
  });
  text.addEventListener("mouseout", () => {
    text.textContent = "Click on Picture to Get Bikes Name and Motor Size!";
  });
};
