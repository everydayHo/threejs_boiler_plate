import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
window.addEventListener('load', () => {
	init();
});

function init() {
	const options = {
		color: 0x00ffff,
	};
	const renderer = new THREE.WebGLRenderer({
		// alpha: true,
		antialias: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500);
	const cubegeometry = new THREE.IcosahedronGeometry(1);
	const cubematerial = new THREE.MeshLambertMaterial({
		color: 0x00ffff,
		emissive: 0x111111,
		// transparent: true,
		// opacity: 0.5,
		// visible: true,
		// wireframe: true,
		// side: THREE.DoubleSide,
	});

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.autoRotate = true;
	controls.enableDamping = true;
	// controls.dampingFactor = 0.01;
	// controls.enableZoom = true;
	// controls.enablePan = true;

	// const axesHelper = new THREE.AxesHelper(5);
	// scene.add(axesHelper);
	const cube = new THREE.Mesh(cubegeometry, cubematerial);

	const skeletonGeometry = new THREE.IcosahedronGeometry(2);
	const skeletonMaterial = new THREE.MeshBasicMaterial({
		wireframe: true,
		transparent: true,
		opacity: 0.2,
		color: 0xaaaaaa,
	});
	const skelton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);

	scene.add(cube, skelton);

	camera.position.z = 5;
	// camera.position.set(3, 4, 5);
	// camera.lookAt(cube.position);
	const diretiononLight = new THREE.DirectionalLight(0xffffff, 1);
	// diretiononLight.position.set(-1, 2, 3);
	scene.add(diretiononLight);
	// const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
	// ambientLight.position.set(3, 2, 1);
	// scene.add(ambientLight);

	const clock = new THREE.Clock();
	function render() {
		const elapsedTime = clock.getElapsedTime();
		// cube.rotation.x = THREE.MathUtils.degToRad(45);
		// cube.rotation.x = elapsedTime;
		// cube.rotation.y = elapsedTime;
		// cube.rotation.y = Math.sin(cube.rotation.x);
		// cube.scale.x = Math.cos(cube.rotation.x);
		// skelton.rotation.x = elapsedTime * 0.5;
		// skelton.rotation.y = elapsedTime * 0.5;
		controls.update();
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	render();

	function handleResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		controls.update();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}
	window.addEventListener('resize', handleResize);

	const gui = new GUI();
	// gui.add(cube.position, 'y', -3, 3);
	gui.add(cube.position, 'y').min(-3).max(3).step(0.1);
	gui.add(cube, 'visible');

	gui.addColor(options, 'color').onChange((value) => {
		cube.material.color.set(value);
	});
}
