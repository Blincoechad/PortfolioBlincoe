
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
  });

