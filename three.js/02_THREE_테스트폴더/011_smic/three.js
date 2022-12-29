// import * as THREE from "./three.module.js";
// import { OrbitControls } from "./OrbitControls.js";
// import { GLTFLoader } from "./GLTFLoader.js";
// import { DRACOLoader } from "./DRACOLoader.js";
// import { CSS3DRenderer, CSS3DObject } from "./CSS3DRenderer.js";

// import gaugeChartDraw from "./DaedongGaugebar.js";
// // import getDataAndDrawChart from "./samboChart.js";
// import getDataAndDrawChart2 from "./genicosChart.js";
// import DrawThresholdChart from "./threshold.js";


import * as THREE from "./three.module.min.js";
import { OrbitControls } from "./OrbitControls.min.js";
import { GLTFLoader } from "./GLTFLoader.min.js";
import { DRACOLoader } from "./DRACOLoader.min.js";
import { CSS3DRenderer, CSS3DObject } from "./CSS3DRenderer.min.js";

import gaugeChartDraw from "./DaedongGaugebar.min.js";
// import getDataAndDrawChart from "./samboChart.js";
import getDataAndDrawChart2 from "./genicosChart.min.js";


let scene, camera, renderer, renderer2;
let light, light2, ambientLight;
let controls;
let button1, button2, button3;

init();
// animate(performance.now());
animate();
DrawThresholdChart();

function init() {
  //! scene(장면)
  scene = new THREE.Scene(); //* 장면 생성
  // scene.background = new THREE.Color('#2e2861')
  // scene.background = new THREE.Color("#343549");
  // scene.background = new THREE.Color("#161B21");
  scene.background = new THREE.Color("#232D43");
  // scene.background = new THREE.Color("transparent");

  //! 카메라(camera)
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 5000;
  //* 원근 카메라
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(900, 900, 900); //* 카메라 포지션 x, y, z
  scene.add(camera);

  //! light(조명)
  ambientLight = new THREE.AmbientLight("white", 3);
  scene.add(ambientLight);

  light = new THREE.DirectionalLight("white", 2);
  // light.castShadow = true; // true로 설정하면 다이나믹한 그림자가 드리워짐 (비용이 많이들고, 그림자가 제대로 보이도록 조정해야하는 단점이 있다.)
  light.position.y = 300;
  light.position.z = -10;
  scene.add(light);
  // const lightHelper_d1 = new THREE.DirectionalLightHelper(light);
  // scene.add(lightHelper_d1)

  light2 = new THREE.DirectionalLight("white", 1);
  // light2.castShadow = true;
  light2.position.x = 50;
  light2.position.y = 0;
  scene.add(light2);

  // const lightHelper_2 = new THREE.DirectionalLightHelper(light2);
  // scene.add(lightHelper_2)

  // const light3 = new THREE.PointLight('white', 10, 100, 2 );
  // light3.position.set( 0, 130, 0 );
  // scene.add( light3 );
  // const lightHelper = new THREE.PointLightHelper(light3);
  // scene.add(lightHelper)

  // SpotLight
  const light4 = new THREE.SpotLight("white", 5, 500, Math.PI / 4);
  light4.position.set(10, 400, 0);
  scene.add(light4);

  // const lightHelper3 = new THREE.SpotLightHelper(light4);
  // scene.add(lightHelper3)

  // SpotLight2
  const light5 = new THREE.SpotLight("white", 5, 500, Math.PI / 4);
  light5.position.set(10, -400, 0);
  scene.add(light5);

  // SpotLight3
  const light6 = new THREE.SpotLight("white", 10, 500, Math.PI / 4);
  light6.position.set(10, 300, 400);
  scene.add(light6);

  // const lightHelper6 = new THREE.SpotLightHelper(light6);
  // scene.add(lightHelper6)

  //! 렌더러2
  renderer2 = new CSS3DRenderer();
  // renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.domElement.style.position = "absolute";
  // renderer2.domElement.style.top = 500;
  const css = document.querySelector("#css");
  css.appendChild(renderer2.domElement);

  //! 렌더러
  renderer = new THREE.WebGLRenderer({
    alpha: true, // 배경 투명하게 할 때 사용
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  document.querySelector("#webgl").appendChild(renderer.domElement); //* 필수
  // 반투명하게 사용
  // renderer.setClearAlpha();

  //! OrbitControls
  control();
  function control() {
    controls = new OrbitControls(camera, renderer2.domElement);
    // console.log(controls)
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    // controls.enabled = true;  // false로 하면 orbitControls를 막을 수 있다!!! / default는 true
    controls.minDistance = 300; // 최소 확대
    controls.maxDistance = 650; // 최대 확대
    // controls.maxPolarAngle = Math.PI / 2; // 축을 기준으로 회전하도록(아래를 볼 수 없음)
    controls.addEventListener("change", render);
  }

  loadGLTF();

  function loadGLTF() {
    //^ gltf 불러오기
    const gltfloader = new GLTFLoader();
    gltfloader.load(
      "./machine_010.gltf",
      (gltf) => {
        // console.log("gltf : ", gltf)
        // console.log("gltf : ", gltf.scene)
        // const mesh = gltf.scene.children[0]
        const mesh = gltf.scene;
        console.log("gltf : ", mesh);

        // console.log(mesh.material)
        mesh.scale.x = 50;
        mesh.scale.y = 50;
        mesh.scale.z = 50;
        mesh.position.set(0, -50, 0);

        // // gltf파일을 티가 안나게 돌리는 부분
        // const animate2 = () => {
        //   const animation = requestAnimationFrame(animate2);
        //   // console.log(animation) // 콘솔창에 프레임이 출력된다.
        //   mesh.rotation.y -= 0.000000000000000000000000000000001;
        //   render()

        //   // 일정시간이 되면 gltf파일이 돌고있는걸 멈추는 부분
        //   if (animation >= 100 * 100) {
        //     cancelAnimationFrame(animation);
        //   }
        // }
        // animate2();

        scene.add(mesh);
        render(); // gltf 로드시 렌더링을 해줘야 함!

        createBtn();
      }
    );
  }

  //# drc 파일을 사용하는 경우
  // const loader = new DRACOLoader()
  // loader.preload();

  // loader.setDecoderPath('/');   //? 라이브러리 경로여서 신경 안써도 될거같다.  // 같은 경로면 / 다른 경로면 ex. draco/
  // loader.setDecoderConfig({ type: 'js' });   //? 디코더 라이브러리에 대한 구성을 제공한다. 디코딩이 시작된 후에는 구성을 변경할 수 없다.


  //# gltf를 drc로 압축하는 경우
  // let loader = new GLTFLoader();
  // // loader.setDRACOLoader( new DRACOLoader() );

  // loader.load(
  //   './machine_010g.gltf',
  //   // './models/machine_008g.gltf',
  //   function (gltf) {    //? load의 파라미터는 ('url', 'onLoad함수', 'onProgress함수', 'onError함수' )
  //     // console.log(geometry)   //? buffer geometry가 출력된다.
  //     // geometry.computeVertexNormals();    //? 이것의 역할은?
      
  //     // const material = new THREE.MeshStandardMaterial( { color: 0x606060 } );   //? 물체의 겉색깔
  //     // const mesh = new THREE.Mesh( geometry, material );    //? 지오메트리 + 머테리얼 = 메쉬
  //     // mesh.castShadow = true;   //? 부드럽게
  //     // mesh.receiveShadow = true;    //?
      
  //     const mesh = gltf.scene;
    
  //     mesh.scale.x = 50;
  //     mesh.scale.y = 50;
  //     mesh.scale.z = 50;
  //     mesh.position.set(0, 0, 0);

  //     scene.add( mesh );

  //     // Release decoder resources.
  //     // dracoLoader.dispose();
    
  //   }
  // )

  // gltfLoader.setDRACOLoader(dracoLoader)



  //~ 버튼 만드는 부분
  //^ 버튼 1 (설비정보를 보여주는 버튼)
  const createBtn = () => {
    button1 = makeElementObject("div", 8, 8);
    // console.log("버튼1 : ", button1)
    button1.css3dObject.element.style.cursor = "pointer";
    button1.position.x = 37.4;  //* x축
    button1.position.y = 65; //* y축
    button1.position.z = 146; //* z축
    button1.rotation.y = 1.6;
    button1.css3dObject.element.className = "alarmDot";
    button1.css3dObject.element.style.background = new THREE.Color("#45349c").getStyle();
    scene.add(button1);

    //@ 버튼1 이벤트리스너
    // 차트1 보이게 하기
    button1.css3dObject.element.addEventListener(
      "pointerdown",
      () => {
        console.log("버튼1 클릭");
        // controls.enabled = false;  // false로 하면 orbitControls를 막을 수 있다!!! / default는 true
      
        // 삼보차트
        // getDataAndDrawChart("myPlot1", 5110, "45773-4C000"); // 눌렀을 때 파라미터에 pcd, icd 전달
        // getDataAndDrawChart("myPlot2", 5110, "45940-2F200"); // 눌렀을 때 파라미터에 pcd, icd 전달
        // getDataAndDrawChart('myPlot4', 5110, '45773-4C000'); // 눌렀을 때 파라미터에 pcd, icd 전달

        // 제니코스 차트
        getDataAndDrawChart2("myPlot1");
        getDataAndDrawChart2("myPlot2");
        // getDataAndDrawChart2("myPlot1", "MA05", "homo_rpm");
        // getDataAndDrawChart2("myPlot2", "MA03", "water_rpm");

        // 게이지바 차트(색상을 위해 호출)
        gaugeChartDraw('A40104')
        // gaugeChartDraw("A40204")
        jQuery(".bg").show();
      
      },
      false
    );


    //^ 버튼 2
    button2 = makeElementObject("div", 8, 8);
    // console.log("버튼 2 : ", button2)
    button2.css3dObject.element.style.cursor = "pointer";
    button2.position.x = 5; //* x축
    button2.position.y = -30; //* y축
    button2.position.z = 174.2; //* z축
    // button2.rotation.y = 0.6;
    scene.add(button2);

    //@ 버튼2 이벤트리스너
    button2.css3dObject.element.addEventListener("pointerdown", () => {
      console.log("버튼2 클릭");
      DrawThresholdChart();
      jQuery("#bg2").show();
    }, false);


    //^ 버튼 3
    button3 = makeElementObject("div", 8, 8);
    button3.css3dObject.element.style.cursor = "pointer";
    button3.position.x = 100;  //* x축
    button3.position.y = 0; //* y축
    button3.position.z = 57.5; //* z축
    // button3.rotation.y = 1.6;
    button3.css3dObject.element.className = "alarmDot";
    button3.css3dObject.element.id = 'linkMove';
    button3.css3dObject.element.style.background = new THREE.Color("#f29510").getStyle();
    scene.add(button3);

    //@ 버튼3 이벤트리스너
    button3.css3dObject.element.addEventListener("pointerdown", () => {
      console.log("버튼3 클릭");
      // 새창 띄우기
      window.open('https://www.google.co.kr/');
    }, false);


    //^ 닫기 버튼 클릭시 차트 안보이게 하기
    const closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener('pointerdown', () => {
      // document.getElementById('myPlot1').textContent = "";
      // document.getElementById('myPlot2').textContent = "";
      jQuery('#bg').hide();
    })

    const closeBtn2 = document.getElementById("closeBtn2");
    closeBtn2.addEventListener('pointerdown', () => {
      jQuery('#bg2').hide();
    })
  
    // 일정시간마다 랜덤한 값으로 텍스트 변경하기
    setInterval(() => {
      // 차트 옆 퍼센트부분 텍스트 랜덤으로 변경되도록
      document.querySelector('.C1_SP_AxisLoad').innerHTML = Math.floor((Math.random() * (100 - 50)) + 50);
      document.querySelector('.C3_SP_AxisLoad').innerHTML = Math.floor((Math.random() * (100 - 50)) + 50);

      // 파트 인포메이션부분 텍스트 랜덤으로 변경되도록
      document.querySelector('.impeller').innerHTML = Math.floor((Math.random() * (100 - 50)) + 50);
      document.querySelector('.Orbiting').innerHTML = Math.floor((Math.random() * (300 - 10)) + 10);
      document.querySelector('.Total').innerHTML = Math.floor((Math.random() * (300 - 10)) + 10);
      document.querySelector('.PowerOn').innerHTML = Math.floor((Math.random() * (300 - 10)) + 10);

      // 게이지 차트 랜덤으로 변경되도록 
      const cssProgressBar1 = document.querySelector('.cssProgress-bar1').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';
      const cssProgressBar2 = document.querySelector('.cssProgress-bar2').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';
      const cssProgressBar3 = document.querySelector('.cssProgress-bar3').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';
      const cssProgressBar4 = document.querySelector('.cssProgress-bar4').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';
      const cssProgressBar5 = document.querySelector('.cssProgress-bar5').style.width = Math.floor((Math.random() * (99 - 10)) + 10) + '%';

      // 게이지 차트의 퍼센트 텍스트 랜덤으로 변경되도록
      document.querySelector('.X1_AxisLoad').innerHTML = cssProgressBar1.substring(0, 2);
      document.querySelector('.X2_AxisLoad').innerHTML = cssProgressBar2.substring(0, 2);
      document.querySelector('.Y1_AxisLoad').innerHTML = cssProgressBar3.substring(0, 2);
      document.querySelector('.Z1_AxisLoad').innerHTML = cssProgressBar4.substring(0, 2);
      document.querySelector('.Z2_AxisLoad').innerHTML = cssProgressBar5.substring(0, 2);
    
      // AxisPos
      document.querySelector('.X1_AxisPos').innerHTML = ((Math.random(2) * (500 - 200)) + 200).toFixed(2);
      document.querySelector('.Y1_AxisPos').innerHTML = ((Math.random() * (500 - 200)) + 200).toFixed(2);
      document.querySelector('.Z1_AxisPos').innerHTML = ((Math.random() * (500 - 200)) + 200).toFixed(2);
      document.querySelector('.X2_AxisPos').innerHTML = ((Math.random() * (500 - 200)) + 200).toFixed(2);
      document.querySelector('.Z2_AxisPos').innerHTML = ((Math.random() * (500 - 200)) + 200).toFixed(2);
    
    }, 5000);
  }

  //~ 버튼 만들기 끝
  render();
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera);
  renderer2.render(scene, camera);
  // console.log("렌더링")
}

function animate(time) {
  controls.update();
  render();
  requestAnimationFrame(animate);
  // renderer.setAnimationLoop(animate); // setAnimationLoop는 requestAnimationFrame과 똑같은 동작을 하는 three.js 내장 함수이다.
  // 그러나 중요한건 setAnimationLoop는 AR이나 VR 콘텐츠를 만들 때 사용된다. (공식문서에도 써있음)
}

//^ 엘리먼트객체를 만드는 함수
function makeElementObject(type, width, height) {
  const obj = new THREE.Object3D(); //! Object3D를 이용해 같이 이동되도록

  //& 요소를 만들고 스타일을 지정하는 부분
  const element = document.createElement(type); //* 요소를 생성
  element.style.width = width + "px"; //* 요소의 너비 지정 (파라미터로 전달받음)
  element.style.height = height + "px"; //* 'div' 요소의 높이 지정 ( "" )
  element.style.opacity = 1; //* 투명도 지정

  let css3dObject = new CSS3DObject(element); //* 위에서 설정한 요소를 인자로 넣어서 생성
  obj.css3dObject = css3dObject; //* obj의 css3dObject 속성에 위에서 만든 요소를 지정
  obj.add(css3dObject);

  // make an invisible plane for the DOM element to chop
  // clip a WebGL geometry with it.
  let material = new THREE.MeshPhongMaterial({
    //* material 만들기
    // alphaMap: 0xfff,
    // aoMapIntensity: 0,
    opacity: 0,
    color: new THREE.Color(/*color*/ 0x000),
    blending: THREE.NoBlending, //* ???
    side: THREE.DoubleSide, //* 더블사이드로 해야 마우스를 돌려도 양면이 다 보임
  });
  let geometry = new THREE.BoxGeometry(width, height, 1); //* geometry 만들기 (박스지오메트리)
  let mesh = new THREE.Mesh(geometry, material); //* geometry + material = MESH
  // console.log(mesh)
  mesh.castShadow = true;
  mesh.receiveShadow = true; //* ??
  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
} // makeElementObject 끝


// 투명도 조절
const opacitySlider = document.getElementById("opacitySlider");
const opacitySlider2 = document.getElementById("opacitySlider2");

opacitySlider.addEventListener("input", () => {
  // console.log(opacitySlider.value)
  let opacityValue = opacitySlider.value;
  document.querySelector("#mainContainer1").style.opacity = opacityValue;
})

opacitySlider2.addEventListener("input", () => {
  let opacityValue = opacitySlider2.value;
  document.querySelector("#mainContainer2").style.opacity = opacityValue;
} )


function DrawThresholdChart() {
  var message;
  var curDate = new Date();
  var bfDate = curDate.setHours(curDate.getHours() - 1);
  curDate = moment(curDate).format("YYYY-MM-DD HH:mm:ss");
  bfDate = moment(bfDate).format("YYYY-MM-DD HH:mm:ss");
  // const urlParams = new URLSearchParams(window.location.search);
  // const SENSOR = urlParams.get("sensor");
  const SENSOR = "co2";

  // document.querySelector("title").innerText = SENSOR + "그래프";

  let x1 = [];
  let y1 = [];
  let _color;
  let defaultColor;
  let upperLimit = 10;
  // let cmd = "http://go.idb.ai:8086/query?db=idbSensor&q=select%20" + SENSOR + "%20from%20idbsensor%20where%20time%20%3E%3D%20now()%20-%201h%20and%20time%20%3C%3D%20now()%20order%20by%20time%20desc%20limit%20100";

  // https
  let cmd = "https://t2v.kr:50010/go_idb_ai"

  setDefaultColor();
  drawChart();
  function drawChart() {
    upperLimit = setUpperLimit(SENSOR); // co2 = 10
    // console.log(cmd);
    fetch(cmd)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        if (parsedResponse.results[0].series[0] != undefined) {

          parsedResponse.results[0].series[0].values.forEach(function (item, index) {
            /* 가장 최근 값일 때 */
            if (index === 0) setColor(item[1]);  /* 표시색 지정 */
          
            var date = new Date(item[0]);
            var local_date = moment.utc(date).local().format("YYYY-MM-DD HH:mm:ss");
            x1[index] = local_date;
            y1[index] = item[1];
          });
          
          const firstTrace = {
            type: "scatter",
            mode: "lines",
            name: "Stat",
            x: x1,
            y: y1,
            line: { color: defaultColor },
          };

          const upperLimitLine = {
            type: "scatter",
            mode: "lines",
            name: "Upper_Limit",
            x: x1,
            y: Array.from({ length: 100 }, () => upperLimit),
            line: { color: "red" },
          };

          const data = [firstTrace, upperLimitLine];

          const layout = {
            title: false,
            width: 500,
            height: 170,
            margin: { t: 15, b: 50, l: 30, r: 20, pad: 0 },
            showlegend: false,
            // paper_bgcolor: "#f0f0f0",
            // plot_bgcolor: "#f0f0f0",
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: {
              //family: 'Jeju Gothic, truetype',
              // family: "Nanum Barun Gothic, sans-serif",
              size: 16,
              // color: "#666666",
              color: "#fff",
              weight: 700,
            },
          };
          return Plotly.newPlot("graphs-container", data, layout);
        } else {
          console.log("No Data");
        }
      })
      .catch((error) => console.log(error));
  }
  setInterval(drawChart, 20000);


  function setColor(sensorValue) {
    _color = sensorValue >= upperLimit ? "red" : defaultColor;
    // console.log(_color)
    //@ 상태에 따라 버튼2(알람)색 변경
    if (_color == "#0070C0") {
      button2.css3dObject.element.className = "animate_green alarmDot";
      button2.css3dObject.element.style.background = new THREE.Color("#00B34A").getStyle();
    } else {
      button2.css3dObject.element.className = "animate_red alarmDot";
      button2.css3dObject.element.style.background = new THREE.Color("#FF0000").getStyle();
    }

  }

  function setUpperLimit() {
    switch (SENSOR) {
      // case "vocs":
      //   return 500;
      case "co2":
        return 10;
      // case "co":
      //   return 500;
      // case "hcho":
      //   return 25;
      // case "h2s":
      //   return 25;
      // case "hcl":
      //   return 10;
      // case "nh3":
      //   return 50;
      // case "so2":
      //   return 25;
      default:
        break;
    }
  }

  function setDefaultColor() {
    switch (SENSOR) {
      // case "vocs":
      //   defaultColor = "#0070C0";
      //   return;
      case "co2":
        defaultColor = "#0070C0";
        return;
      // case "co":
      //   defaultColor = "#0070C0";
      //   return;
      // case "hcho":
      //   defaultColor = "#0070C0";
      //   return;
      // case "h2s":
      //   defaultColor = "#0070C0";
      //   return;
      // case "hcl":
      //   defaultColor = "#0070C0";
      //   return;
      // case "nh3":
      //   defaultColor = "#0070C0";
      //   return;
      // case "so2":
      //   defaultColor = "#0070C0";
      //   return;
      default:
        break;
    }
  }

}






