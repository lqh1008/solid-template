import { onMount } from "solid-js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default () => {
  let wrapperRef;

  const init = () => {
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    // 相机放入到场景中
    scene.add(camera);

    // 创建物体形状
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    // 将物体放入到场景中
    scene.add(cube);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 渲染器渲染相机跟场景
    // renderer.render(scene, camera);
    // 将渲染器放入到页面中
    wrapperRef!.appendChild(renderer.domElement);

    // 添加一个轨道控制器
    new OrbitControls(camera, renderer.domElement);

    // 设置辅助线
    const axesHelper = new THREE.AxesHelper(8);
    scene.add(axesHelper);

    // 渲染函数
    const animate = () => {
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      cube.position.x += 0.1;
      if (cube.position.x > 5) {
        cube.position.x = 0;
      }
      renderer.render(scene, camera);
    };

    animate();
  };

  onMount(() => {
    init();
  });
  return <div ref={wrapperRef}></div>;
};
