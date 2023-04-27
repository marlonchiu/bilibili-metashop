import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 导入控制器，轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入模型解析器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class Base3d {
  constructor(selector, onFinish) {
    this.container = document.querySelector(selector)
    this.camera
    this.scene
    this.renderer
    this.model
    this.panzi
    this.animateAction
    this.clock = new THREE.Clock()
    this.onFinish = onFinish
    this.init()
    this.animate()
    this.progressFn
  }

  onProgress(fn) {
    this.progressFn = fn
  }

  init() {
    // 初始化场景
    this.initScene()
    // 初始化相机
    this.initCamera()
    // 初始化渲染器
    this.initRenderer()
    // 控制器
    this.initControls()
    // 添加物体
    this.addMesh()

    // 监听场景大小改变，调整渲染尺寸
    window.addEventListener('resize', this.onWindowResize.bind(this))

    // 监听滚轮事件
    window.addEventListener('mousewheel', this.onMouseWheel.bind(this))
  }

  initScene() {
    this.scene = new THREE.Scene()
    // 设置环境
    this.setEnvMap('000')
  }

  initCamera() {
    // 设置相机
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 200)
    // 设置相机位置
    this.camera.position.set(-1.8, 0.6, 2.7)
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    // 设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // 渲染的尺寸大小
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // 色调映射
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    // 设置曝光度
    this.renderer.toneMappingExposure = 3
    this.container.appendChild(this.renderer.domElement)
  }

  setEnvMap(hdr) {
    new RGBELoader().setPath('./files/hdr/').load(hdr + '.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      this.scene.background = texture
      this.scene.environment = texture
    })
  }

  render() {
    var delta = this.clock.getDelta()
    this.mixer && this.mixer.update(delta)
    this.renderer.render(this.scene, this.camera)
  }

  // 设置渲染动画
  animate() {
    this.renderer.setAnimationLoop(this.render.bind(this))
  }

  // 控制器
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  // 设置模型
  setModel(modelName) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader().setPath('files/gltf/')
      loader.load(
        modelName,
        (gltf) => {
          console.log(gltf)
          this.model && this.model.removeFromParent()
          this.model = gltf.scene.children[0]
          if ('bag2.glb' === modelName && !this.panzi) {
            this.panzi = gltf.scene.children[5]
            // this.scene.add(this.panzi)

            // 修改摄像头为模型摄像头
            this.camera = gltf.cameras[0]
            // 调用动画
            this.mixer = new THREE.AnimationMixer(gltf.scene.children[1])
            console.log(this.mixer)
            this.animateAction = this.mixer.clipAction(gltf.animations[0])
            // 设置动画播放时长
            this.animateAction.setDuration(20).setLoop(THREE.LoopOnce)
            // 设置播放完成之后停止
            this.animateAction.clampWhenFinished = true
            // 播放动画
            // this.animateAction.play()

            // 设置灯光
            this.spotlight1 = gltf.scene.children[2].children[0]
            this.spotlight1.intensity = 1
            this.spotlight2 = gltf.scene.children[3].children[0]
            this.spotlight2.intensity = 1
            this.spotlight3 = gltf.scene.children[4].children[0]
            this.spotlight3.intensity = 1
          }
          this.scene.add(gltf.scene)
          // this.scene.add(this.model)
          resolve(this.modelName + '模型添加成功')
        },
        (e) => {
          // console.log('模型加载进度')
          // console.log(e)
          this.progressFn(e)
        }
      )
    })
  }

  async addMesh() {
    let res = await this.setModel('bag2.glb')
    this.onFinish(res)
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // this.render()
  }

  onMouseWheel(e) {
    console.log(this.animateAction)
    let timeScale = e.deltaY > 0 ? 1 : -1
    this.animateAction.setEffectiveTimeScale(timeScale)
    this.animateAction.paused = false
    this.animateAction.play()
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.timeoutId = setTimeout(() => {
      this.animateAction.halt(0.5)
    }, 300)
  }
}
export default Base3d
