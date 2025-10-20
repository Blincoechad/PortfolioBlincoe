
  // Select all cards
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return; // skip if card has no video

    // When you hover over the card
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = 30; // bring card to the front
      video.currentTime = 0;  // restart video from beginning
      video.play();           // start playing
    });

    // When you move the mouse away
    card.addEventListener('mouseleave', () => {
      card.style.zIndex = ''; // reset z-index
      video.pause();          // pause the video
    });
    // add click listener via JS (cleaner than inline handlers)
    card.addEventListener('click', (e) => {
      console.log('card clicked:', card.id);
      openClip(card);
    });
  });
function openClip(card) {
  // support being called without an argument
  if (!card || !card.querySelector) return;

  const video = card.querySelector('video');
  if (!video) return;

  const overlay = document.getElementById('previewOverlay');
  const previewVideo = document.getElementById('previewVideo');

  // show overlay and play selected video
  overlay.style.display = 'flex';
  // prefer the video's src attribute, fallback to currentSrc
  previewVideo.src = video.getAttribute('src') || video.currentSrc || '';
  previewVideo.currentTime = 0;
  // make sure the preview can be interacted with (clicks on video shouldn't close overlay)
  previewVideo.addEventListener('click', (e) => e.stopPropagation());
  previewVideo.play().catch(() => {
    // autoplay may be blocked; don't crash
  });
}

// close overlay only when clicking outside the preview video
const overlayEl = document.getElementById('previewOverlay');
overlayEl.addEventListener('click', (e) => {
  // if click bubbled from inside the video, ignore
  if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'video') return;

  const previewVideo = document.getElementById('previewVideo');
  previewVideo.pause();
  previewVideo.removeAttribute('src');
  overlayEl.style.display = 'none';
});



