import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// --- Scene Setup ---
let scrollPercent = 0;

// Update scroll percentage on scroll
window.addEventListener('scroll', () => {
    // Calculate how far we've scrolled (0 to 1)
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent = scrollTop / docHeight;
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// --- 1. Enhanced Lighting (Brighter) ---
// Ambient light for general visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
scene.add(ambientLight);

// Directional light (The Sun) - set to high intensity
const sunLight = new THREE.DirectionalLight(0xffffff, 2);
sunLight.position.set(20, 25, 10);
scene.add(sunLight);

// Hemisphere light (Blueish light from "Earth" below, White from "Space" above)
// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x4444ff, 1.5);
// scene.add(hemiLight);

// --- 2. Loaders with Draco ---
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

let iss;
loader.load('satellite.glb', (gltf) => {
    iss = gltf.scene;
    scene.add(iss);
    
    // Optional: Center the model if it's off-center
    const box = new THREE.Box3().setFromObject(iss);
    const center = box.getCenter(new THREE.Vector3());
    iss.position.sub(center); 
}, 
undefined, 
(error) => console.error('Loading error:', error));

// --- 3. Zoom Out (Camera Positioning) ---
// Increased Z from 15/20 to 45 for a wider view
camera.position.z = 25; 

// --- 4. Animation Loop with Automatic Pan ---
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    time += 0.002; // Slower, more cinematic speed

    if (iss) {
        const scrollZoom = scrollPercent * 100; 
        let currentDistance = 25 + scrollZoom
        let yRotation = 0.3 + scrollPercent;
        let xRotation = -0.1 - scrollPercent * 1.5;
        let yLookPos = -0.1 * scrollZoom;

        if (xRotation < -1.29) {
            xRotation = -1.29;
        }
        if (yRotation > 1.09) {
            yRotation = 1.09;
        }
        if (currentDistance > 100) {
            currentDistance = 100;
        }
        // Subtle rotation of the station
        // iss.rotation.x += 0.001;
        iss.rotation.z += 0.002;
        iss.rotation.y = yRotation;
        iss.rotation.x = xRotation;

        // Wide Camera Pan (Increased multipliers for larger movement)
        // camera.position.x = Math.sin(time) * 20; 
        // camera.position.z = Math.cos(time * 0.5) * 10;
        camera.lookAt(-70, yLookPos, 0); // Always look at the center
        camera.position.z = currentDistance;
    }

    renderer.render(scene, camera);
}

// Handle resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();