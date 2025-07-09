import * as THREE from 'three'

export class ThreeUtils {
  static handleResize(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): void {
    const width = window.innerWidth
    const height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
} 