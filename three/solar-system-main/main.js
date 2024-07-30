// 定义太阳系中各个天体的名称
const OBJECTS = {
  SUN: "sun",
  MERCURY: "mercury",
  VENUS: "venus",
  EARTH: "earth",
  MOON: "moon",
  MARS: "mars",
  JUPITER: "jupiter",
  SATURN: "saturn",
  SATURN_RINGS: "saturn_rings",
  URANUS: "uranus",
  NEPTUNE: "neptune",
};

// 创建行星和行星的卫星的类
class ObjectGroup {
  constructor(index, title, radius, extra) {
    // 创建一个Three.js的Group对象
    const objectGroup = new THREE.Group();

    // 如果有额外的参数，根据标题进行不同的处理
    if (extra) {
      switch (title) {
        case OBJECTS.EARTH:
          // 如果是地球，将月球的位置向右移动
          extra.position.x += 8 * index + 2.5;

          break;
        case OBJECTS.SATURN:
          // 如果是土星，将土星的环旋转
          extra.position.x += 8 * index;
          extra.rotation.x = 2;

          break;
      }

      // 将额外的对象添加到Group对象中
      objectGroup.add(extra);
    }

    // 创建行星对象
    const planet = ObjectGroup.createObject(
      title,
      new THREE.SphereGeometry(radius, 64, 32)
    );

    // 将行星的位置向右移动
    planet.position.x += 8 * index;
    // 将行星添加到Group对象中
    objectGroup.add(planet);

    // 返回Group对象
    return objectGroup;
  }

  // 创建对象的静态方法
  static createObject = (title, objectGeometry) => {
    // 加载纹理
    const objectTexture = new THREE.TextureLoader().load(
      `textures/${title}.jpg`
    );
    // 创建材质
    const objectMaterial = new THREE.MeshPhongMaterial({ map: objectTexture });
    // 创建网格
    const objectMesh = new THREE.Mesh(objectGeometry, objectMaterial);

    // 返回网格
    return objectMesh;
  };
}

// 定义太阳系中的行星和卫星
const planets = [
  { title: OBJECTS.MERCURY, radius: 1 },
  { title: OBJECTS.VENUS, radius: 2 },
  {
    title: OBJECTS.EARTH,
    radius: 2,
    // 创建月球
    extra: ObjectGroup.createObject(
      OBJECTS.MOON,
      new THREE.SphereGeometry(0.5, 64, 32)
    ),
  },
  { title: OBJECTS.MARS, radius: 1 },
  { title: OBJECTS.JUPITER, radius: 5 },
  {
    title: OBJECTS.SATURN,
    radius: 4,
    // 创建土星的环
    extra: ObjectGroup.createObject(
      OBJECTS.SATURN_RINGS,
      new THREE.TorusGeometry(6, 1, 2, 32)
    ),
  },
  { title: OBJECTS.URANUS, radius: 3 },
  { title: OBJECTS.NEPTUNE, radius: 3 },
];

// 创建Three.js场景、相机和渲染器
const scene = new THREE.Scene();
const fov = 40; // 视野范围
const aspect = window.innerWidth / window.innerHeight; // 相机默认值 画布的宽高比
const near = 0.1; // 近平面
const far = 1000; // 远平面
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 180;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("root").appendChild(renderer.domElement);

// 添加环境光和点光源
const ambientLight = new THREE.AmbientLight(0xaaaaaa, 1);
const pointLight = new THREE.PointLight(0xffffff, 1);

pointLight.position.set(0, 0, 0);

scene.add(ambientLight, pointLight);

// 创建星星的坐标数组
const starsCoords = [];

for (let i = 0; i < 10000; i++) {
  const x = THREE.MathUtils.randFloatSpread(1000);
  const y = THREE.MathUtils.randFloatSpread(1000);
  const z = THREE.MathUtils.randFloatSpread(1000);

  starsCoords.push(x, y, z);
}


// 创建星星的几何体和材质
const starsGeometry = new THREE.BufferGeometry();

starsGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starsCoords, 3)
);

const starsMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa });
const stars = new THREE.Points(starsGeometry, starsMaterial);

// 将星星添加到场景中
scene.add(stars);

// 创建太阳
const sun = ObjectGroup.createObject(
  OBJECTS.SUN,
  new THREE.SphereGeometry(11, 64, 32)
);

// 将太阳添加到场景中
scene.add(sun);

// 创建行星和卫星的映射
const planetsMap = new Map();

for (let [index, { title, radius, extra }] of planets.entries()) {
  // 创建行星和卫星的Group对象
  const planetGroup = new ObjectGroup(index + 1, title, radius, extra);

  // 将行星和卫星的Group对象添加到映射中
  planetsMap.set(title, planetGroup);
  // 将行星和卫星的Group对象添加到太阳中
  sun.add(planetGroup);
}

// 定义地球的公转周期
const EARTH_YEAR = (2 * Math.PI) / 365;

// 循环渲染场景
const animate = () => {
  // 让太阳自转
  sun.rotation.y += 0.001;

  // 让行星和卫星自转
  planetsMap.get(OBJECTS.MERCURY).rotation.y += EARTH_YEAR * 4;
  planetsMap.get(OBJECTS.VENUS).rotation.y += EARTH_YEAR * 2;
  planetsMap.get(OBJECTS.EARTH).rotation.y += EARTH_YEAR;
  planetsMap.get(OBJECTS.MARS).rotation.y += EARTH_YEAR / 2;
  planetsMap.get(OBJECTS.JUPITER).rotation.y += EARTH_YEAR / 4;
  planetsMap.get(OBJECTS.SATURN).rotation.y += EARTH_YEAR / 8;
  planetsMap.get(OBJECTS.URANUS).rotation.y += EARTH_YEAR / 16;
  planetsMap.get(OBJECTS.NEPTUNE).rotation.y += EARTH_YEAR / 32;

  // 渲染场景
  renderer.render(scene, camera);

  // 循环调用animate函数
  requestAnimationFrame(animate);
};

// 开始渲染
animate();
