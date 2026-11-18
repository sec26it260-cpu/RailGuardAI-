const API_URL = https://railguardai-1-0g01.onrender.com/!

async function loadCoaches() {
    try {
        const response = await fetch(`${API_URL}/api/coaches`);
        const coaches = await response.json();

        console.log("RailGuard AI Connected!", coaches);

        document.getElementById("backendStatus").textContent = "Online";

    } catch (error) {
        console.error("Backend Error:", error);
        document.getElementById("backendStatus").textContent = "Offline";
      async function startCamera() {
    const video = document.getElementById("camera");
    const status = document.getElementById("cameraStatus");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        status.textContent = "Camera API not supported";
        return;
    }

    try {
        status.textContent = "Connecting camera...";

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
            audio: false
        });

        video.srcObject = stream;
        await video.play();

        status.textContent = "Camera Connected Successfully!";
    } catch (error) {
        status.textContent = "Camera Error: " + error.name;
        console.error(error);
    }
      }
