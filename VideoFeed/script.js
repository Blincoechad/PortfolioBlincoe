  const cameraFeed = document.getElementById('camerafeed');
  // uses camo studio app to access phone camera on website
  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "enviroment" } // front camera
  })
  .then(stream => {
    cameraFeed.srcObject = stream;
  })
  .catch(err => {
    console.error("Error accessing camera: ", err);
  });



