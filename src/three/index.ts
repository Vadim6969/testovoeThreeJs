export { ThreeScene } from './Scene'

export { Door } from './objects/Door'
export { GeometricShapes } from './objects/GeometricShapes'
export { Lighting } from './objects/Lighting'

export { ThreeUtils } from './utils/ThreeUtils'
export interface SceneConfig {
  canvas: HTMLCanvasElement
  backgroundColor?: number
  cameraPosition?: [number, number, number]
}

export interface DoorConfig {
  width?: number
  height?: number
  color?: number
  handleSide?: 'left' | 'right'
}

export interface LightingConfig {
  directionalLightIntensity?: number
  ambientLightIntensity?: number
  hemisphereIntensity?: number
} 