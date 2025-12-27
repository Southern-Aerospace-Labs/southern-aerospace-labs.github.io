// Three.js Scene for 3D Earth with Orbiting Satellites
class EarthScene {
    constructor() {
        this.container = document.getElementById('earth-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.earth = null;
        this.satellites = [];
        this.redSatellite = null;
        this.redOrbitLine = null;
        this.animationId = null;
        this.scrollProgress = 0; // Track scroll position (0 to 1)
        this.initialCameraZ = 8; // Initial camera z position
        this.maxCameraZ = 25; // Maximum zoom out distance

        this.init();
        this.createEarth();
        this.createSatellites();
        this.animate();
        this.handleResize();
        this.handleScroll(); // Add scroll listener
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();

        // Create camera - view from left to show Earth on right
        this.camera = new THREE.PerspectiveCamera(
            40,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            2000
        );
        this.camera.position.set(0, 2, 8);
        this.camera.lookAt(-4, -3, 0); // Look at Earth's position

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Add brighter lights for better Earth visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
        directionalLight.position.set(5, 3, 5);
        this.scene.add(directionalLight);
    }

    createEarth() {
        // Create larger Earth sphere with texture map
        const geometry = new THREE.SphereGeometry(4.5, 64, 64);

        // Load texture map
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('texturemap.png');

        const material = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 10,
            specular: 0xcccccc
        });

        this.earth = new THREE.Mesh(geometry, material);
        // Position Earth to the right side of the viewport
        this.earth.position.set(0, 0, 0);
        this.scene.add(this.earth);
    }

    createSatellites() {
        // 530 satellites total: 500 LEO + 30 higher orbit
        // Distributed as a constellation across all latitudes and longitudes
        const leoCount = 500;
        const higherOrbitCount = 100; // 29 + 1 red = 30 total higher orbit
        const colors = [0xcccccc, 0xaaaaaa, 0x999999, 0xdddddd];
        const earthPosition = new THREE.Vector3(0, 0, 0);
        const redSatPos = new THREE.Vector3(-4, -3, 0);

        // Create LEO satellites (270 total)
        // Use Fibonacci sphere distribution for even coverage across all latitudes/longitudes
        for (let i = 0; i < leoCount; i++) {
            // Fibonacci sphere algorithm for uniform distribution
            const goldenRatio = (1 + Math.sqrt(5)) / 2;
            const theta = 2 * Math.PI * i / goldenRatio; // Longitude
            const phi = Math.acos(1 - 2 * (i + 0.5) / leoCount); // Latitude

            // Convert spherical to inclination and starting angle
            const inclination = (phi * 180 / Math.PI); // 0-180 degrees

            // Bias starting angles to favor right side (0 to PI range)
            // 70% of satellites start on right side, 30% on left
            let startAngle;
            startAngle = theta;

            // Vary radius within LEO range for depth
            const radiusVariation = (i % 15) / 15; // Creates 15 different orbital shells
            const radius = 5 + radiusVariation * 0.3;

            const config = {
                radius: radius,
                inclination: inclination,
                speed: 0.04 + Math.random() * 0.03, // 0.006-0.016 varied speed
                color: 0xdddddd,
                center: earthPosition,
                orbitType: inclination < 70 ? 'equatorial' : 'polar',
                startAngle: startAngle
            };
            const satellite = this.createSatellite(config);
            this.satellites.push(satellite);
        }

        // Create higher orbit satellites (30 total including red)
        // Also use Fibonacci distribution for uniform coverage
        for (let i = 0; i < higherOrbitCount; i++) {
            const goldenRatio = (1 + Math.sqrt(5)) / 2;
            const theta = 2 * Math.PI * i / goldenRatio;
            const phi = Math.acos(1 - 2 * (i + 0.5) / higherOrbitCount);

            const inclination = (phi * 180 / Math.PI);
            const startAngle = theta;

            // Vary radius for higher orbits
            const radiusVariation = (i % 6) / 6;
            const radius = 8.5 + radiusVariation * 2.0;

            const config = {
                radius: radius,
                inclination: inclination,
                speed: 0.003 + Math.random() * 0.005, // 0.003-0.008 slower speed
                color: 0xdddddd,
                center: earthPosition,
                orbitType: inclination < 30 ? 'equatorial' : 'polar',
                startAngle: startAngle
            };
            const satellite = this.createSatellite(config);
            this.satellites.push(satellite);
        }

        // Create red satellite with orbital path
        const redConfig = {
            radius: 6,
            inclination: 10,
            speed: -0.03,
            color: 0xED1C2E,
            center: earthPosition,
            startAngle: Math.PI
        };

        this.redSatellite = this.createSatellite(redConfig);
        this.satellites.push(this.redSatellite);

        // Create red orbital path
        this.createRedOrbitPath(redConfig.radius, redConfig.inclination);
    }

    createSatellite(config) {
        const geometry = new THREE.SphereGeometry(0.03, 12, 12);
        const material = new THREE.MeshBasicMaterial({ color: config.color });
        const satellite = new THREE.Mesh(geometry, material);

        // Store orbital parameters
        satellite.userData = {
            radius: config.radius,
            inclination: config.inclination * Math.PI / 180,
            speed: config.speed,
            angle: config.startAngle || Math.random() * Math.PI * 2, // Use provided start angle or random
            center: config.center || earthPosition
        };

        this.scene.add(satellite);
        return satellite;
    }

    createRedOrbitPath(radius, inclination) {
        const points = [];
        const segments = 128;
        const earthPosition = new THREE.Vector3(0, 0, 0);

        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const x = earthPosition.x + radius * Math.cos(angle);
            const y = earthPosition.y + radius * Math.sin(angle) * Math.sin(inclination * Math.PI / 180);
            const z = earthPosition.z + radius * Math.sin(angle) * Math.cos(inclination * Math.PI / 180);
            points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: 0xED1C2E,
            opacity: 0.6,
            transparent: true,
            linewidth: 3
        });

        this.redOrbitLine = new THREE.Line(geometry, material);
        this.scene.add(this.redOrbitLine);
    }

    updateSatellitePositions() {
        this.satellites.forEach(satellite => {
            const { radius, inclination, speed, angle, center } = satellite.userData;

            // Update angle
            satellite.userData.angle += speed * 0.01;

            // Calculate position relative to Earth's center
            const x = center.x + radius * Math.cos(satellite.userData.angle);
            const y = center.y + radius * Math.sin(satellite.userData.angle) * Math.sin(inclination);
            const z = center.z + radius * Math.sin(satellite.userData.angle) * Math.cos(inclination);

            satellite.position.set(x, y, z);
        });
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Rotate Earth slowly
        if (this.earth) {
            this.earth.rotation.y += 0.0008;
        }

        // Update satellite positions
        this.updateSatellitePositions();

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(width, height);
        });
    }

    handleScroll() {
        window.addEventListener('scroll', () => {
            // Calculate scroll progress (0 at top, 1 at bottom)
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            this.scrollProgress = Math.min(scrollTop / scrollHeight, 1);

            // Update camera position to zoom out and move left to reveal entire Earth
            // Z-axis: zoom out from 8 to 20 units
            const targetZ = this.initialCameraZ + (this.maxCameraZ - this.initialCameraZ) * this.scrollProgress;

            // X-axis: move left from 0 to -2 to center the Earth in view
            const targetX = -2 * this.scrollProgress;

            // Y-axis: keep camera at same height
            const targetY = 2;

            this.camera.position.set(targetX, targetY, targetZ);

            // Adjust lookAt target to move view down as we zoom out
            // Move lookAt point down from -3 to -5 to show full Earth
            const lookAtY = -3 + (4 * this.scrollProgress);
            const lookAtX = -4 - (3.5 * this.scrollProgress);
            this.camera.lookAt(lookAtX, lookAtY, 0);
        });
    }

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const earthScene = new EarthScene();
});
