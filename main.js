import './style.css'
 
import * as THREE from 'three';
import { GridHelper } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
 
const scene = new THREE.Scene();
 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
 

 //sizes for the canvas resize
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//function for the canvas resize (V. Impotant)
window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const renderer = new THREE.WebGL1Renderer({
 canvas: document.querySelector('#bg'),
});
 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
 

 
camera.position.setZ(30);
camera.position.setX(-3);
 
renderer.render(scene, camera);
 
// add more objetcs later
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true}); // Change material later
const torus = new THREE.Mesh(geometry, material);
 
scene.add(torus);
 
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
 
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)
 
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridhelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridhelper)
 
const controls = new OrbitControls(camera, renderer.domElement);
 
 
function addStar() {
 const geometry = new THREE.SphereGeometry(2, 6, 6);
 const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
// const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
 const star = new THREE.Mesh(geometry, material);
 
 const [x, y, z] = Array(3)
   .fill()
   .map(() => THREE.MathUtils.randFloatSpread(100));
 
 star.position.set(x, y, z);
 scene.add(star);
}
 
Array(200).fill().forEach(addStar);
 
const spaceTexture = new THREE.TextureLoader().load('grid2.jpeg');
scene.background = spaceTexture;
 
 
//SCROLL ANIMATION
function moveCamera() {
 const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
 camera.position.x = t * -0.0002;
 camera.rotation.y = t * -0.0002;
}
 
document.body.onscroll = moveCamera;
moveCamera();
 
 
 
 
 
 
 
function animate(){
 requestAnimationFrame(animate);
 
 torus.rotation.x += 0.01;
 torus.rotation.y += 0.005;
 torus.rotation.z += 0.01;
 
 controls.update();
 
 renderer.render(scene, camera);
}
animate()
