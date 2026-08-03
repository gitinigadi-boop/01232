// ===========================
// 3D Heart - Part 1
// ===========================

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z = 45;

// Renderer
const renderer = new THREE.WebGLRenderer({
antialias:true,
alpha:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById("scene").appendChild(renderer.domElement);

// Heart Particle Count
const particleCount = 5000;

const geometry = new THREE.BufferGeometry();

const vertices = [];

for(let i=0;i<particleCount;i++){

let t=Math.random()*Math.PI*2;

let x=16*Math.pow(Math.sin(t),3);

let y=
13*Math.cos(t)
-5*Math.cos(2*t)
-2*Math.cos(3*t)
-Math.cos(4*t);

vertices.push(

x,

y,

(Math.random()-0.5)*6

);

}

geometry.setAttribute(

'position',

new THREE.Float32BufferAttribute(vertices,3)

);

// Material
const material=new THREE.PointsMaterial({

color:0xff3366,

size:0.22,

transparent:true,

opacity:0.9

});

// Heart
const heart=new THREE.Points(

geometry,

material

);

heart.scale.set(1.5,1.5,1.5);

scene.add(heart);

// ===========================
// Part 2
// Stars + Animation
// ===========================

// Stars
const starGeometry = new THREE.BufferGeometry();
const starVertices = [];

for(let i = 0; i < 3000; i++){

    starVertices.push(
        (Math.random()-0.5)*300,
        (Math.random()-0.5)*300,
        (Math.random()-0.5)*300
    );

}

starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices,3)
);

const starMaterial = new THREE.PointsMaterial({
    color:0xffffff,
    size:0.35,
    transparent:true,
    opacity:0.8
});

const stars = new THREE.Points(
    starGeometry,
    starMaterial
);

scene.add(stars);

// Clock
const clock = new THREE.Clock();

// Animation
function animate(){

    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    // Heart Beat
    const beat = 1.5 + Math.sin(t * 4) * 0.08;

    heart.scale.set(
        beat,
        beat,
        beat
    );

    // Rotation
    heart.rotation.y += 0.004;
    heart.rotation.x += 0.001;

    // Camera Motion
    camera.position.x = Math.sin(t*0.4) * 3;
    camera.position.y = Math.cos(t*0.3) * 2;
    camera.lookAt(scene.position);

    // Stars Rotate
    stars.rotation.y += 0.0008;

    renderer.render(scene,camera);

}

// ===========================
// Part 3
// Glow + Floating Particles
// ===========================

// Floating Glow Particles
const glowGeometry = new THREE.BufferGeometry();
const glowVertices = [];

const glowCount = 1000;

for (let i = 0; i < glowCount; i++) {

    glowVertices.push(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
    );

}

glowGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(glowVertices, 3)
);

const glowMaterial = new THREE.PointsMaterial({
    color: 0xff66aa,
    size: 0.5,
    transparent: true,
    opacity: 0.6
});

const glow = new THREE.Points(
    glowGeometry,
    glowMaterial
);

scene.add(glow);

// Window Resize
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

// Glow Animation
function animateGlow() {

    const time = clock.getElapsedTime();

    glow.rotation.y += 0.0015;
    glow.rotation.x += 0.0008;

    glowMaterial.opacity = 0.4 + Math.sin(time * 3) * 0.2;

}

// Old animate() ಅನ್ನು replace ಮಾಡಿ
function animate() {

    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    animateGlow();

    const beat = 1.5 + Math.sin(t * 4) * 0.08;

    heart.scale.set(beat, beat, beat);

    heart.rotation.y += 0.004;
    heart.rotation.x += 0.001;

    stars.rotation.y += 0.0008;

    camera.position.x = Math.sin(t * 0.4) * 3;
    camera.position.y = Math.cos(t * 0.3) * 2;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);

}

// ===========================
// Part 4
// Spark Trails + Glow Pulse
// ===========================

// Spark Particles
const sparkGeometry = new THREE.BufferGeometry();
const sparkVertices = [];

const sparkCount = 1500;

for(let i = 0; i < sparkCount; i++){

    sparkVertices.push(

        (Math.random()-0.5)*60,

        (Math.random()-0.5)*60,

        (Math.random()-0.5)*60

    );

}

sparkGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(sparkVertices,3)
);

const sparkMaterial = new THREE.PointsMaterial({

    color:0xffffff,

    size:0.18,

    transparent:true,

    opacity:0.8

});

const sparks = new THREE.Points(

    sparkGeometry,

    sparkMaterial

);

scene.add(sparks);


// Animate Sparks
function animateSpark(time){

    sparks.rotation.y += 0.002;

    sparks.rotation.x += 0.001;

    sparkMaterial.opacity =

    0.5 + Math.sin(time*5)*0.3;

}


// Replace animate() Again
function animate(){

    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    animateGlow();

    animateSpark(t);

    const beat = 1.5 + Math.sin(t*4)*0.08;

    heart.scale.set(

        beat,

        beat,

        beat

    );

    heart.rotation.y += 0.004;

    heart.rotation.x += 0.001;

    stars.rotation.y += 0.0008;

    camera.position.x = Math.sin(t*0.4)*3;

    camera.position.y = Math.cos(t*0.3)*2;

    camera.lookAt(scene.position);

    renderer.render(scene,camera);

}

animate();
