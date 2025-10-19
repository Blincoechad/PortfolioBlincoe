const cameraFeed = document.getElementById('camerafeed');
const errorMsg = document.getElementById('errorMsg');
const videoSelect = document.getElementById('videoSource');
const refreshBtn = document.getElementById('refreshDevices');
let currentStream = null;

function showError(message, err) {
  console.error(message, err || '');
  if (errorMsg) errorMsg.textContent = message + (err && err.message ? ` — ${err.message}` : '');
}

function stopCurrentStream() {
  if (currentStream) {
    currentStream.getTracks().forEach(t => t.stop());
    currentStream = null;
    cameraFeed.srcObject = null;
  }
}

function gotDevices(deviceInfos) {
  if (!videoSelect) return;
  const oldValue = videoSelect.value;
  videoSelect.innerHTML = '';
  let count = 1;
  // attempt to find a camo device label
  let preferredCamoDeviceId = null;
  for (const deviceInfo of deviceInfos) {
    if (deviceInfo.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      option.text = deviceInfo.label || `Camera ${count}`;
      const labelLower = (deviceInfo.label || '').toLowerCase();
      if (!preferredCamoDeviceId && (labelLower.includes('camo') || labelLower.includes('reincubate'))) {
        preferredCamoDeviceId = deviceInfo.deviceId;
      }
      videoSelect.appendChild(option);
      count++;
    }
  }
  if (oldValue) {
    const exists = Array.from(videoSelect.options).some(o => o.value === oldValue);
    if (exists) videoSelect.value = oldValue;
  } else if (preferredCamoDeviceId) {
    // auto-select camo device and start it
    videoSelect.value = preferredCamoDeviceId;
    startStreamForDevice(preferredCamoDeviceId);
  }
}

function startStreamForDevice(deviceId) {
  stopCurrentStream();
  const constraints = deviceId ? { video: { deviceId: { exact: deviceId } }, audio: false } : { video: { facingMode: { ideal: 'user' } }, audio: false };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      cameraFeed.srcObject = stream;
      const p = cameraFeed.play();
      if (p && typeof p.then === 'function') {
        p.catch(() => {
          showError('Tap the video to start playback.');
          cameraFeed.addEventListener('click', () => cameraFeed.play().catch(() => {}), { once: true });
        });
      }
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(err => {
      if (err && (err.name === 'NotAllowedError' || err.name === 'SecurityError')) {
        showError('Camera permission was denied. Please allow camera access in your browser.');
      } else if (err && (err.name === 'NotFoundError' || err.name === 'OverconstrainedError')) {
        showError('No camera found that matches the requested constraints.');
      } else {
        showError('Error accessing camera', err);
      }
    });
}

// Entry point
if (!window.isSecureContext && location.hostname !== 'localhost') {
  showError('Camera access requires a secure origin (HTTPS) or running on localhost.');
} else if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  showError('getUserMedia is not supported by this browser.');
} else {
  navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(err => showError('Could not enumerate devices', err));
  startStreamForDevice();
  if (videoSelect) {
    videoSelect.addEventListener('change', () => startStreamForDevice(videoSelect.value));
  }
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(err => showError('Could not refresh devices', err)));
  }
}



