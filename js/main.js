/*global THREE , requestAnimationFrame, Stats, cancelAnimationFrame*/

/*
* @Author: Jiyun
* @Date:   2015-02-16 14:14:02
* @Last Modified by:   Jiyun
* @Last Modified time: 2015-02-18 13:53:38
*/


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

var isRunning = false;

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
    renderer.setClearColor(0x6cd8f5, 1.0);
    renderer.shadowMapEnabled = true;
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

    camera = new THREE.PerspectiveCamera(75, 100 / 100, 0.1, 1000);
    // camera.position.set(0, 0, 5);
    camera.position.set(0, 0.5, 4);

    // camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.2, 100);
    // camera.position.set(0, 0, 10);
    // camera.lookAt(new THREE.Vector3(1, 1, 1));


    // camera.lookAt(new THREE.Vector3(2, -1, 1));
    // scene.add(camera);
}



var cube;
var line;
var ballMesh;
var smallBallMesh;
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

    var normalMaterial = new THREE.MeshNormalMaterial({
        // wireframe: true
    });



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
    zhuziMesh.castShadow = true;
    scene.add(zhuziMesh);
    // camera.position.set(0, 0, 8);

    // 正方形
    // var geometry = new THREE.PlaneGeometry(2, 4);

    // 正方体
    var geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);

    // 材质
    THREE.ImageUtils.crossOrigin = '';
    var texture = THREE.ImageUtils.loadTexture('http://perber.qiniudn.com/dWw1NjI1Mjc0My0xNzkuanBn_1424184138603', {}, function () {
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

    cube = new THREE.Mesh(geometry, material);
    // cube.position.x = -1.6;
    // cube.position.y = 2;
    cube.rotation.x = 0.6;
    cube.castShadow = true;
    scene.add(cube);

    // 小球
    // var smallBall = new THREE.SphereGeometry(0.5, 120, 120);
    var smallBall = new THREE.TorusGeometry(0.7, 0.2, 50, 50);
    smallBallMesh = new THREE.Mesh(smallBall, material);
    // smallBallMesh.position.x = Math.PI * 2;
    // smallBallMesh.position.y = 3;
    smallBallMesh.rotation.y = 1;
    // smallBallMesh.position.set(1, 1, 1);
    smallBallMesh.castShadow = true;
    scene.add(smallBallMesh);

    // 平面
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 30, 16, 16),
            new THREE.MeshLambertMaterial({color: 0xf7c4a0}));
    plane.rotation.x = -Math.PI / 2.3;
    plane.position.y = -2;
    plane.position.z = -12;
    plane.receiveShadow = true; // 接收投影
    scene.add(plane);
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

var light;
function initLight() {
    light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(100, 50, 100);
    scene.add(light);

    // light = new THREE.DirectionalLight(0xFFE0E0, 0.5);
    // light.position.set(-260, -550, -600);
    // scene.add(light);

    // light = new THREE.PointLight(0xffffff, 2, 100);
    // light.position.set(0, 1.5, 2);
    // scene.add(light);

    light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
    light.position.set(2, 5, 3);
    // light.target.position.set(2, 2, 2);
    light.target = smallBallMesh;
    light.castShadow = true;
    light.shadowCameraNear = 0.5;
    light.shadowCameraFar = 45;
    light.shadowCameraFov = 120;
    // light.shadowCameraVisible = false;
    // light.shadowCameraVisible = true; // 是否显示参考线

    light.shadowMapWidth = 2000;
    light.shadowMapHeight = 2000;
    light.shadowDarkness = 0.3;
    scene.add(light);

    //  // ambient light
    // var ambient = new THREE.AmbientLight(0x343434);
    // scene.add(ambient);

    light = new THREE.SpotLight(0xffff00, 0, 100, Math.PI / 10, 1000);
    light.position.set(1, 5, 10);
    light.target = cube;
    light.castShadow = true;

    light.shadowCameraNear = 4;
    light.shadowCameraFar = 34;
    light.shadowCameraFov = 60;
    // light.shadowCameraVisible = false;
    // light.shadowCameraVisible = true; // 是否显示参考线

    light.shadowMapWidth = 4048;
    light.shadowMapHeight = 4048;
    light.shadowDarkness = 0.3;

    // renderer.shadowMapSoft = true;
    // scene.add(light);
}

var alpha = 0;
function render() {
    stat.begin();

    renderer.clear();
    renderer.render(scene, camera);

    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    alpha += 0.01;
    if (alpha > Math.PI * 2) {
        alpha -= Math.PI * 2;
    }
    cube.position.set(2 * Math.cos(alpha), 0, 1.2 * Math.sin(alpha));

    ballMesh.rotation.x += 0.01;
    ballMesh.rotation.y += 0.01;
    ballMesh.position.set(2 * Math.cos(alpha), 0, 1.2 * Math.sin(alpha));

    smallBallMesh.rotation.x += 0.01;
    smallBallMesh.rotation.y += 0.01;
    smallBallMesh.position.set(4 * Math.sin(alpha), 3, -1);

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
    initObject();
    initLight();
    render();

    isRunning = true;
}

function stop() {
    if (id !== null) {
        cancelAnimationFrame(id);
        id = null;

        isRunning = false;
    }
}

threeStart();

document.addEventListener('mousedown', function (e) {
    console.log('e.target', e.target);
    // if (e.target === self.elem || (e.target.parentNode && e.target.parentNode === self.elem) || (e.target.parentNode.parentNode && e.target.parentNode.parentNode === self.elem)) {
    if (typeof e.stopPropagation !== 'undefined') {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
    e.preventDefault();
    // self.pointerDown(e);
    if (isRunning) {
        stop();
    } else {
        requestAnimationFrame(render);
        isRunning = true;
    }
    // }
}, false);




