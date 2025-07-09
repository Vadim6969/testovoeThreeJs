import * as THREE from 'three'

export class Door {
  private group: THREE.Group
  private doorMesh!: THREE.Mesh
  private width: number
  private height: number

  constructor(width: number = 0.9, height: number = 2.2) {
    this.width = width
    this.height = height
    this.group = new THREE.Group()
    this.createDoor()
  }

  private createDoor() {
    this.group.clear()

    const doorGeometry = new THREE.BoxGeometry(this.width, this.height, 0.08)
    const doorMaterial = new THREE.MeshPhongMaterial({ 
      color: "#F5F5F5",
      shininess: 30,
      specular: "#222222"
    })
    
    this.doorMesh = new THREE.Mesh(doorGeometry, doorMaterial)
    this.doorMesh.position.y = this.height / 2
    this.doorMesh.castShadow = true
    this.doorMesh.receiveShadow = true

    const panelMaterial = new THREE.MeshPhongMaterial({ 
      color: "#E8E8E8",
      shininess: 20
    })

    const panelWidth = this.width * 0.7
    const panelHeight = this.height * 0.22
    const panelDepth = 0.02
    const panelGeometry = new THREE.BoxGeometry(panelWidth, panelHeight, panelDepth)

    const topPanel = new THREE.Mesh(panelGeometry, panelMaterial)
    topPanel.position.set(0, this.height * 0.78, 0.04)
    topPanel.castShadow = true

    const middlePanel = new THREE.Mesh(panelGeometry, panelMaterial)
    middlePanel.position.set(0, this.height * 0.5, 0.04)
    middlePanel.castShadow = true

    const bottomPanel = new THREE.Mesh(panelGeometry, panelMaterial)
    bottomPanel.position.set(0, this.height * 0.22, 0.04)
    bottomPanel.castShadow = true

    const frameThickness = 0.02
    const frameDepth = 0.01
    const frameMaterial = new THREE.MeshPhongMaterial({ color: "#D0D0D0" })

    const frames = [
      this.createPanelFrame(this.height * 0.78, panelWidth, panelHeight, frameThickness, frameDepth, frameMaterial),
      this.createPanelFrame(this.height * 0.5, panelWidth, panelHeight, frameThickness, frameDepth, frameMaterial),
      this.createPanelFrame(this.height * 0.22, panelWidth, panelHeight, frameThickness, frameDepth, frameMaterial)
    ]

    const { handlePlate, handle } = this.createHandle()

    const { topFrame, leftFrame, rightFrame } = this.createDoorFrame()

    this.group.add(this.doorMesh)
    this.group.add(topPanel)
    this.group.add(middlePanel) 
    this.group.add(bottomPanel)
    frames.forEach(frame => this.group.add(frame))
    this.group.add(handlePlate)
    this.group.add(handle)
    this.group.add(topFrame)
    this.group.add(leftFrame)
    this.group.add(rightFrame)
  }

  private createPanelFrame(centerY: number, panelWidth: number, panelHeight: number, frameThickness: number, frameDepth: number, frameMaterial: THREE.Material) {
    const frameGroup = new THREE.Group()
    
    const hFrameGeometry = new THREE.BoxGeometry(panelWidth + frameThickness * 2, frameThickness, frameDepth)
    const topHFrame = new THREE.Mesh(hFrameGeometry, frameMaterial)
    topHFrame.position.set(0, panelHeight / 2 + frameThickness / 2, 0.045)
    
    const bottomHFrame = new THREE.Mesh(hFrameGeometry, frameMaterial)
    bottomHFrame.position.set(0, -panelHeight / 2 - frameThickness / 2, 0.045)
    
    const vFrameGeometry = new THREE.BoxGeometry(frameThickness, panelHeight, frameDepth)
    const leftVFrame = new THREE.Mesh(vFrameGeometry, frameMaterial)
    leftVFrame.position.set(-panelWidth / 2 - frameThickness / 2, 0, 0.045)
    
    const rightVFrame = new THREE.Mesh(vFrameGeometry, frameMaterial)
    rightVFrame.position.set(panelWidth / 2 + frameThickness / 2, 0, 0.045)
    
    frameGroup.add(topHFrame, bottomHFrame, leftVFrame, rightVFrame)
    frameGroup.position.y = centerY
    
    return frameGroup
  }

  private createHandle() {
    const handlePlateGeometry = new THREE.BoxGeometry(0.03, 0.15, 0.01)
    const handlePlateMaterial = new THREE.MeshPhongMaterial({ 
      color: "#2C2C2C",
      shininess: 100,
      specular: "#444444"
    })
    const handlePlate = new THREE.Mesh(handlePlateGeometry, handlePlateMaterial)
    handlePlate.position.set(-this.width * 0.35, this.height * 0.45, 0.05)
    handlePlate.castShadow = true

    const handleGeometry = new THREE.CapsuleGeometry(0.008, 0.08, 8, 16)
    const handleMaterial = new THREE.MeshPhongMaterial({ 
      color: "#2C2C2C",
      shininess: 150,
      specular: "#666666"
    })
    const handle = new THREE.Mesh(handleGeometry, handleMaterial)
    handle.position.set((-this.width * 0.35) + 0.025, this.height * 0.45, 0.06)
    handle.rotation.z = -Math.PI / 2
    handle.rotation.y = Math.PI
    handle.castShadow = true

    return { handlePlate, handle }
  }

  private createDoorFrame() {
    const doorFrameThickness = 0.08
    const doorFrameDepth = 0.15
    const doorFrameMaterial = new THREE.MeshPhongMaterial({ color: "#E0E0E0" })
    
    const topFrameGeometry = new THREE.BoxGeometry(this.width + doorFrameThickness * 2, doorFrameThickness, doorFrameDepth)
    const topFrame = new THREE.Mesh(topFrameGeometry, doorFrameMaterial)
    topFrame.position.set(0, this.height + doorFrameThickness / 2, -0.02)
    topFrame.castShadow = true
    
    const sideFrameGeometry = new THREE.BoxGeometry(doorFrameThickness, this.height, doorFrameDepth)
    const leftFrame = new THREE.Mesh(sideFrameGeometry, doorFrameMaterial)
    leftFrame.position.set(-this.width / 2 - doorFrameThickness / 2, this.height / 2, -0.02)
    leftFrame.castShadow = true
    
    const rightFrame = new THREE.Mesh(sideFrameGeometry, doorFrameMaterial)
    rightFrame.position.set(this.width / 2 + doorFrameThickness / 2, this.height / 2, -0.02)
    rightFrame.castShadow = true

    return { topFrame, leftFrame, rightFrame }
  }

  public updateSize(width: number, height: number) {
    this.width = width
    this.height = height
    this.createDoor()
  }

  public getGroup(): THREE.Group {
    return this.group
  }

  public getWidth(): number {
    return this.width
  }

  public getHeight(): number {
    return this.height
  }
} 