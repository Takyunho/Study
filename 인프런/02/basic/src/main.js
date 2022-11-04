import * as THREE from 'three';

// console.log(THREE);

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight)
// console.log(renderer.domElement);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas }); // canvas라는 속성을 html에서 가져온 canvas로 지정 / canvas로 축약 가능
renderer.setSize(window.innerWidth, window.innerHeight);