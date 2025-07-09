import * as THREE from 'three'

export class GeometricShapes {
  private cube: THREE.Mesh
  private sphere: THREE.Mesh

  constructor() {
    this.cube = this.createCube()
    this.sphere = this.createSphere()
  }

  private createCube(): THREE.Mesh {
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshPhongMaterial({ 
      color: "#FF4444",
      shininess: 100,
      specular: "#111111"
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(-3, 0.5, 0)
    cube.castShadow = true
    cube.receiveShadow = true
    return cube
  }

  private createSphere(): THREE.Mesh {
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32)
    const sphereMaterial = new THREE.MeshPhongMaterial({ 
      color: "#4444FF",
      shininess: 150,
      specular: "#222222"
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(3, 0.7, 0)
    sphere.castShadow = true
    sphere.receiveShadow = true
    return sphere
  }

  public animateShapes(time: number) {
    this.cube.rotation.y = time * 0.5
    this.cube.rotation.x = time * 0.3

    this.sphere.position.y = 0.7 + Math.sin(time * 2) * 0.2
    this.sphere.rotation.y = time
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