import * as THREE from 'three'

export class GeometricShapes {
  private cube: THREE.Mesh
  private sphere: THREE.Mesh

  constructor() {
    this.cube = this.createCube()
    this.sphere = this.createSphere()
  }

  private createCube(): THREE.Mesh {
    const cubeGeometry = new THREE.BoxGeometry(1.8, 1.8, 1.8)
    const cubeMaterial = new THREE.MeshStandardMaterial({ 
      color: "#C0C0C0",
      metalness: 0.95,
      roughness: 0.05
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(-3, 0.9, 0)
    cube.castShadow = true
    cube.receiveShadow = true
    return cube
  }

  private createSphere(): THREE.Mesh {
    const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32)
    const sphereMaterial = new THREE.MeshStandardMaterial({ 
      color: "#FFD700",
      metalness: 0.98,
      roughness: 0.02
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(3, 1.2, 0)
    sphere.castShadow = true
    sphere.receiveShadow = true
    return sphere
  }

  public animateShapes(time: number) {
    this.cube.rotation.y = time * 0.5
    this.cube.rotation.x = time * 0.3

    this.sphere.position.y = 1.2 + Math.sin(time * 2) * 0.3
    this.sphere.rotation.y = time
  }

  public updateReflections(envMap: THREE.Texture) {
    const cubeMaterial = this.cube.material as THREE.MeshStandardMaterial
    const sphereMaterial = this.sphere.material as THREE.MeshStandardMaterial
    
    cubeMaterial.envMap = envMap
    cubeMaterial.envMapIntensity = 1.0
    cubeMaterial.needsUpdate = true
    
    sphereMaterial.envMap = envMap  
    sphereMaterial.envMapIntensity = 1.0
    sphereMaterial.needsUpdate = true
  }

  public addToScene(scene: THREE.Scene) {
    scene.add(this.cube)
    scene.add(this.sphere)
  }

  public getCube(): THREE.Mesh {
    return this.cube
  }

  public getSphere(): THREE.Mesh {
    return this.sphere
  }
} 