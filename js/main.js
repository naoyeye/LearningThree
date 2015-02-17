/*global THREE , requestAnimationFrame, Stats, cancelAnimationFrame*/

// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({ color: 0xcc0000 });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 3;

// var render = function () {
//     requestAnimationFrame(render);

//     cube.rotation.x += 0.05;
//     cube.rotation.y += 0.05;

//     renderer.render(scene, camera);
// };

// render();

var id = null;
var renderer;
var width;
var height;

var ballMesh = null;
var ballRadius = 0.5;

function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        // antialias : true
    });
    renderer.setSize(600, 600);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0x121212, 1.0);
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var camera;
function initCamera() {
    // camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    // camera.position.x = 0;
    // camera.position.y = 1000;
    // camera.position.z = 0;
    // camera.up.x = 0;
    // camera.up.y = 0;
    // camera.up.z = 1;
    // camera.lookAt({
    //     x : 0,
    //     y : 0,
    //     z : 0
    // });

    camera = new THREE.PerspectiveCamera(85, 100 / 100, 0.1, 1000);
    // camera.position.set(0, 0, 5);
    camera.position.set(0, 0, 2);

    // camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.2, 100);
    // camera.position.set(0, 0, 10);
    // camera.lookAt(new THREE.Vector3(1, 1, 1));


    // camera.lookAt(new THREE.Vector3(2, -1, 1));
    // scene.add(camera);
}



var light;
function initLight() {
    light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(120, 150, 150);
    scene.add(light);


    // light = new THREE.DirectionalLight(0xFFE0E0, 0.5);
    // light.position.set(-260, -550, -600);
    // scene.add(light);
}


var cube;
var line;
var ballMesh;
var zhuziMesh;
function initObject() {
    // 形状 geometry
    // 材质 material

    // var geometry = new THREE.Geometry();
    // var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors});
    // var color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0xFF0000);

    // // 线的材质可以由2点的颜色决定
    // var p1 = new THREE.Vector3(-100, 0, 100);
    // var p2 = new THREE.Vector3(100, 0, -100);
    // geometry.vertices.push(p1);
    // geometry.vertices.push(p2);
    // geometry.colors.push(color1, color2);

    // line = new THREE.Line(geometry, material, THREE.LinePieces);
    // scene.add(line);



    // 圆体
    // var ball = new THREE.SphereGeometry(3, 160, 160);
    var ball = new THREE.SphereGeometry(1, 20, 20);

    var ballMaterial = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        emissive: 0xcc0000,
        // specular: 0xff0000,
        // shininess: 1000,
        wireframe: true,
        // wireframe: false
        // map: texture,
        ambient: 0x808080,
        specular: 0xFFFFFF,
        shininess: 100,
        shading: THREE.FlatShading,
    });

    ballMesh = new THREE.Mesh(ball, ballMaterial);
    // ballMesh.position.x = 3;
    // ballMesh.position.y = 0.3;
    ballMesh.rotation.x = 1;
    scene.add(ballMesh);

    // 半圆体
    // var geometry = new THREE.SphereGeometry(3, 30, 30, 0, Math.PI * 3, Math.PI / 4, Math.PI / 6);

    // 柱形
    var zhuzi = new THREE.TorusKnotGeometry(0.5, 0.1, 130, 140);

    var zhuziMaterial = new THREE.MeshPhongMaterial({
        color: 0x7bdc85,
        // emissive: 0x7bdc85,
        // wireframe: true,
        // wireframe: false
        // ambient: 0xf62bd8,
        // specular: 0x5381d2,
        shininess: 2000,
        // shading: THREE.FlatShading,
    });
    zhuziMesh = new THREE.Mesh(zhuzi, zhuziMaterial);
    // zhuziMesh.position.x = 1.6;
    // zhuziMesh.position.y = 2;
    // zhuziMesh.scale.set(1, 1, 0.2);
    zhuziMesh.rotation.x = 0.6;
    scene.add(zhuziMesh);
    // camera.position.set(0, 0, 8);

    // 正方形
    // var geometry = new THREE.PlaneGeometry(2, 4);

    // 正方体
    var geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);

    // 材质
    THREE.ImageUtils.crossOrigin = '';
    var texture = THREE.ImageUtils.loadTexture('http://i.imgur.com/3tU4Vig.jpg', {}, function () {
        renderer.render(scene, camera);
    });


    // var material = new THREE.MeshLambertMaterial({
    var material = new THREE.MeshPhongMaterial({
        // color: 0x2b37f4,
        emissive: 0x257fc9,
        // specular: 0xff0000,
        // shininess: 1000,
        // wireframe: true,
        // wireframe: false
        map: texture,
        ambient: 0x808080,
        specular: 0xFFFFFF,
        shininess: 1000,
        shading: THREE.FlatShading,
    });

    // var material = new THREE.MeshNormalMaterial({
    //     // wireframe: true
    // });

    cube = new THREE.Mesh(geometry, material);
    // cube.position.x = -1.6;
    // cube.position.y = 2;
    cube.rotation.x = 0.6;
    scene.add(cube);
}

// function initObject() {
//     ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 16, 8),
//     new THREE.MeshLambertMaterial({
//         color: 0xffff00
//     }));
//     ballMesh.position.y = ballRadius;
//     scene.add(ballMesh);

//     // plane
//     THREE.ImageUtils.crossOrigin = '';
//     var texture = THREE.ImageUtils.loadTexture('http://i.imgur.com/3tU4Vig.jpg', {}, function () {
//         renderer.render(scene, camera);
//     });
//     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//     texture.repeat.set(4, 4);
//     var plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5),
//             new THREE.MeshLambertMaterial({map: texture}));
//     plane.rotation.x = -Math.PI / 2;
//     scene.add(plane);
// }

function render() {
    stat.begin();

    // renderer.clear();
    renderer.render(scene, camera);

    // cube.rotation.x += 0.02;
    cube.rotation.y += 0.01;

    // ballMesh.rotation.x += 0.02;
    ballMesh.rotation.y += 0.01;


    // zhuziMesh.rotation.x += 0.02;
    zhuziMesh.rotation.y += 0.01;
    // cube.scale.set(1, 1.2, 3);

    id = requestAnimationFrame(render);
    stat.end();
}

var stat;
function threeStart() {

    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.right = '0px';
    stat.domElement.style.top = '0px';
    document.body.appendChild(stat.domElement);

    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    render();
}

function stop() {
    if (id !== null) {
        cancelAnimationFrame(id);
        id = null;
    }
}

threeStart();




