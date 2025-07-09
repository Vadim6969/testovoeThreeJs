import * as THREE from 'three'

export class Lighting {
  private directionalLight: THREE.DirectionalLight
  private ambientLight: THREE.AmbientLight
  private hemisphereLight: THREE.HemisphereLight

  constructor() {
    this.directionalLight = this.createDirectionalLight()
    this.ambientLight = this.createAmbientLight()
    this.hemisphereLight = this.createHemisphereLight()
  }

  private createDirectionalLight(): THREE.DirectionalLight {
    const directionalLight = new THREE.DirectionalLight("#FFFFFF", 2)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.camera.left = -10
    directionalLight.shadow.camera.right = 10
    directionalLight.shadow.camera.top = 10
    directionalLight.shadow.camera.bottom = -10
    return directionalLight
  }

  private createAmbientLight(): THREE.AmbientLight {
    return new THREE.AmbientLight("#404040", 0.4)
  }

  private createHemisphereLight(): THREE.HemisphereLight {
    return new THREE.HemisphereLight("#87CEEB", "#8B4513", 0.3)
  }

  public addToScene(scene: THREE.Scene) {
    scene.add(this.directionalLight)
    scene.add(this.ambientLight)
    scene.add(this.hemisphereLight)
  }

  public getDirectionalLight(): THREE.DirectionalLight {
    return this.directionalLight
  }

  public getAmbientLight(): THREE.AmbientLight {
    return this.ambientLight
  }

  public getHemisphereLight(): THREE.HemisphereLight {
    return this.hemisphereLight 
  }
} 