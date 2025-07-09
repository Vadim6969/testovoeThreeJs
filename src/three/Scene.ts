import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Door } from './objects/Door'
import { GeometricShapes } from './objects/GeometricShapes'
import { Lighting } from './objects/Lighting'

export class ThreeScene {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private controls: OrbitControls | null = null
  private animationId: number = 0

  // Объекты сцены
  private door: Door
  private shapes: GeometricShapes
  private lighting: Lighting
  private floor: THREE.Mesh
  
  private cubeCamera: THREE.CubeCamera
  private cubeRenderTarget: THREE.WebGLCubeRenderTarget

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene()
    this.camera = this.createCamera()
    this.renderer = this.createRenderer(canvas)
    
    this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512)
    this.cubeCamera = new THREE.CubeCamera(0.1, 1000, this.cubeRenderTarget)
    
    this.floor = this.createFloor()
    this.door = new Door()
    this.shapes = new GeometricShapes()
    this.lighting = new Lighting()

    this.setupScene()
    this.setupControls()
    this.setupReflections()
  }

  private createCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    )
    camera.position.set(5, 3, 5)
    return camera
  }

  private createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true 
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    return renderer
  }

  private createFloor(): THREE.Mesh {
    const floorGeometry = new THREE.PlaneGeometry(20, 20)
    const floorMaterial = new THREE.MeshLambertMaterial({ 
      color: "#90EE90",
      side: THREE.DoubleSide 
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    return floor
  }

  private setupScene() {
    this.scene.background = new THREE.Color("#87CEEB")

    this.scene.add(this.floor)
    this.scene.add(this.door.getGroup())
    this.shapes.addToScene(this.scene)
    this.lighting.addToScene(this.scene)
  }

  private setupControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.target.set(0, 1, 0)
    this.controls.maxPolarAngle = Math.PI / 2
    this.controls.minDistance = 2
    this.controls.maxDistance = 20
    this.controls.update()
  }

  private setupReflections() {
    this.cubeCamera.position.set(0, 1, 0)
    this.scene.add(this.cubeCamera)
    
    this.shapes.updateReflections(this.cubeRenderTarget.texture)
  }

  public animate() {
    this.animationId = requestAnimationFrame(() => this.animate())

    if (this.controls) {
      this.controls.update()
    }

    const time = Date.now() * 0.001
    this.shapes.animateShapes(time)

    this.cubeCamera.update(this.renderer, this.scene)

    this.renderer.render(this.scene, this.camera)
  }

  public updateDoorSize(width: number, height: number) {
    this.door.updateSize(width, height)
  }

  public handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  public dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    if (this.renderer) {
      this.renderer.dispose()
    }
  }

  // Геттеры для доступа к объектам
  public getScene(): THREE.Scene {
    return this.scene
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer
  }

  public getDoor(): Door {
    return this.door
  }

  public getShapes(): GeometricShapes {
    return this.shapes
  }

  public getLighting(): Lighting {
    return this.lighting
  }
} 