import {
    Group,
    CatmullRomCurve3,
    Color,
    LoadingManager,
    Geometry,
    PlaneBufferGeometry,
    MeshLambertMaterial,
    MeshPhongMaterial,
    MeshStandardMaterial,
    Mesh,
    DirectionalLight,
    DoubleSide,
    Vector2,
    Vector3,
    Object3D,
    Raycaster,
    ShaderMaterial,
    FrontSide,
    AdditiveBlending,
    Box3
} from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'
import { TimelineMax, Expo, Sine } from 'gsap'
import GLTFLoader from 'WebGLUtils/GLTFLoader'
import GUI from 'WebGLUtils/GUI'
import ParseVec3 from 'WebGLUtils/ParseVec3'
import { DegToRad } from 'Utils/Numbers'
import AudioManager from 'Utils/AudioManager'
import cablePoints from './cablePoints'
import glslify from 'glslify'
import playButtonVert from './shaders/playButtonVert.glsl'
import playButtonFrag from './shaders/playButtonFrag.glsl'

export default class ThirteenReasonsWhy extends Group
{
    constructor(options)
    {
        super()
        this.scene = options.scene
        this.name = '13ReasonsWhy'
        this.mouse = options.mouse
        this.raycaster = new Raycaster()
        this.resolution = new Vector2(window.innerWidth, window.innerHeight)
        this.SCALE = 0.05
        this.MODELS_COUNT = 0
        this.TAPE_PLAYED = false
        this.loadSounds()
        this.setupCamera()
        this.initMaterials()
        this.initMeshes()
        this.initLights()
    }

    loadSounds()
    {
        this.audioManager = new AudioManager()
        this.tapeSound = this.audioManager.create({
            url: '/static/13-reasons-why/track.mp3',
            autoplay: false,
            loop: false
        })
    }

    setupCamera()
    {
        this.scene.camera.position.x = 16.39
        this.scene.camera.position.y = 24.79
        this.scene.camera.position.z = 31.93
        this.scene.camera.rotation.x = -0.61
        this.scene.camera.rotation.y = 0.43
        this.scene.camera.rotation.z = 0.24
        this.scene.initCameraGUI()
    }

    initMaterials()
    {
        this.emissiveColor = '#212121'
        this.redMaterial = new MeshLambertMaterial({
            color: '#f73e39',
            emissive: this.emissiveColor
        })
        this.blackMaterial = new MeshLambertMaterial({
            color: '#2e2e2e',
            emissive: this.emissiveColor
        })
        this.pinkMaterial = new MeshLambertMaterial({
            color: '#f7e0df',
            emissive: this.emissiveColor
        })
    }

    getMaterial(name)
    {
        switch(name)
        {
            case 'Mat.1':
                return this.redMaterial
            case 'Mat.2':
                return this.blackMaterial
            case 'Mat.3':
                return this.pinkMaterial
            default:
                return
        }
    }

    initMeshes()
    {
        this.setupCable()
        this.loadWalkman()
        this.addFloor()
    }

    setupCable()
    {
        const curve = new CatmullRomCurve3(ParseVec3(cablePoints))
        const geometry = new Geometry()
        geometry.vertices = curve.getPoints(200)
        geometry.computeBoundingBox()

        const line = new MeshLine()
        line.setGeometry(geometry)
        const material = new MeshLineMaterial({
            color: new Color(0x000000),
            lineWidth: 40,
            resolution: this.resolution,
            sizeAttenuation: 0,
            near: this.scene.camera.near,
            far: this.scene.camera.far
        })
        this.cable = new Mesh(line.geometry, material)
        // this.cable.castShadow = true
        this.setupMesh(this.cable)
    }

    loadWalkman()
    {
        this.manager = new LoadingManager()
        this.manager.onProgress = (url, itemsLoaded, itemsTotal) =>
        {
            console.log('Loading : ' + itemsLoaded + ' / ' + itemsTotal)
        }
        this.gltfLoader = new GLTFLoader(this.manager)
        this.gltfLoader.load('/static/13-reasons-why/walkman.gltf', this.onWalkmanLoaded)
        this.gltfLoader.load('/static/13-reasons-why/tape.gltf', this.onTapeLoaded)
        this.gltfLoader.load('/static/13-reasons-why/upperPart.gltf', this.onUpperPartLoaded)
    }

    onWalkmanLoaded = (object) =>
    {
        this.walkman = object.scene
        let playButton = undefined
        this.walkman.traverse((child) =>
        {
            // child.castShadow = true
            if(child.material && child.material.name !== 'default')
                child.material = this.getMaterial(child.material.name)
            if(child.name === 'Bouton-Play')
                playButton = child
        })
        this.playButton = playButton
        this.setupMesh(this.walkman)
        this.playButtonGlow = this.playButton.clone()
        this.buttonGlowColor = '#ffffff'
        this.glowUniforms = {
            c: { value: 0.05 },
            p: { value: 1.5 },
            uVisibility: { value: 1 },
            uColor: { value: new Color(this.buttonGlowColor) },
            uTime: { value: 0 },
            uViewVector: { value: this.scene.camera.position }
        }
        const glowMaterial = new ShaderMaterial({
            uniforms: this.glowUniforms,
            fragmentShader: glslify(playButtonFrag),
            vertexShader: glslify(playButtonVert),
            side: FrontSide,
            blending: AdditiveBlending,
            transparent: true,
            opacity: 0
        })
        this.playButtonGlow.material = glowMaterial
        this.setupMesh(this.playButtonGlow, 0.003)
        // this.playButtonGlow.position.x -= 0.05
        this.playButtonGlow.position.z -= 0.05
        this.testIfModelsLoaded()
    }

    onTapeLoaded = (object) =>
    {
        this.tape = object.scene
        this.tape.traverse((child) =>
        {
            // child.castShadow = true
            if(child.material && child.material.name !== 'default')
                child.material = this.getMaterial(child.material.name)
        })
        this.setupMesh(this.tape)

        // const transparentMaterial = new MeshLambertMaterial({
        //     transparent: true,
        //     opacity: 0,
        //     colorWrite: false,
        // })

        this.tapeCloneUnder = this.tape.clone()
        this.tapeCloneUnder.position.set(0, -0.5, -10)
        this.tapeCloneUnder.rotation.y = DegToRad(-210)
        this.tapeCloneUnder.children.splice(0, 3)

        const tapeCloneAbove = this.tape.clone()
        tapeCloneAbove.children.splice(0, 3)
        const pivotPoint = new Vector3(3, -0.3, -9)

        this.tapeCloneAbove = new Object3D()
        this.tapeCloneAbove.position.set(pivotPoint.x, pivotPoint.y, pivotPoint.z)
        this.tapeCloneAbove.rotation.y = -Math.PI
        this.tapeCloneAbove.rotation.z = DegToRad(10)
        this.tapeCloneAbove.add(tapeCloneAbove)

        this.testIfModelsLoaded()
    }

    onUpperPartLoaded = (object) =>
    {
        const upperObject = object.scene
        // console.log(upperObject.children[0].material)
        upperObject.children[0].material = this.blackMaterial
        upperObject.children[0].material.side = DoubleSide
        upperObject.children[1].material = new MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
            shininess: 100
        })

        this.setupMesh(upperObject)

        const box = new Box3().setFromObject(upperObject)

        const pivotPoint = new Vector3(
            box.min.x + (box.max.x - box.min.x) / 2,
            box.min.y,
            box.min.z
        )
        upperObject.position.set(-pivotPoint.x, -pivotPoint.y, -pivotPoint.z)

        this.upperPart = new Object3D()
        this.upperPart.position.set(pivotPoint.x, pivotPoint.y, pivotPoint.z)
        // this.upperPart.rotation.x = DegToRad(-28)
        this.upperPart.add(upperObject)

        this.testIfModelsLoaded()
    }

    setupMesh(mesh, extraScale = 0)
    {
        // mesh.scale.set(this.SCALE, this.SCALE, this.SCALE)
        mesh.scale.multiplyScalar(this.SCALE + extraScale)
        mesh.rotation.y = -Math.PI / 2
    }

    testIfModelsLoaded()
    {
        this.MODELS_COUNT++
        if(this.MODELS_COUNT === 3)
            this.onModelsLoaded()
    }

    onModelsLoaded()
    {
        this.add(this.tape)
        this.add(this.tapeCloneUnder)
        this.add(this.tapeCloneAbove)
        this.add(this.walkman)
        this.add(this.upperPart)
        this.add(this.cable)
        this.add(this.playButtonGlow)
        // this.initGUI()
        this.addListeners()
    }

    addFloor()
    {
        const planeGeo = new PlaneBufferGeometry(1.5, 1, 2)
        this.floorColor = '#e2c1c0'
        const planeMat = new MeshStandardMaterial({
            color: 0x000000,
            emissive: this.floorColor,
            metalness: 0,
            roughness: 1
        })
        this.floor = new Mesh(planeGeo, planeMat)
        this.floor.position.y = -0.7
        this.floor.scale.set(50, 50, 50)
        this.floor.rotation.x = -Math.PI / 2
        this.floor.receiveShadow = true
        this.add(this.floor)
    }

    addListeners()
    {
        window.addEventListener('mousemove', this.onMouseMove)
        window.addEventListener('mousedown', this.onMouseDown)
    }

    initGUI = () =>
    {
        this.cable.position.range = [-5, 5]
        this.glowUniforms.c.range = [0, 1]
        this.glowUniforms.p.range = [0, 6]
        GUI.panel
            .addGroup({ label: '13 Reasons why' })
            // .addSlider(this.cable.position, 'y', 'range', { label: 'cable y' })
            .addSlider(this.glowUniforms.c, 'value', 'range', { label: 'button c', step: 0.01 })
            .addSlider(this.glowUniforms.p, 'value', 'range', { label: 'button p', step: 0.01 })
            .addColor(this, 'buttonGlowColor', { colorMode: 'hex', label: 'button glow', onChange: (v) =>
            {
                this.glowUniforms.uColor.value = new Color(v)
            } })
            .addColor(this, 'emissiveColor', { colorMode: 'hex', label: 'emissive color', onChange: (v) =>
            {
                this.redMaterial.emissive = new Color(v)
                this.blackMaterial.emissive = new Color(v)
                this.pinkMaterial.emissive = new Color(v)
            } })
            .addColor(this, 'directionalLightColor', { colorMode: 'hex', label: 'light color', onChange: (v) =>
            {
                this.directionalLight.color = new Color(v)
            } })
            .addColor(this, 'floorColor', { colorMode: 'hex', label: 'floor color', onChange: (v) =>
            {
                this.floor.material.color = new Color(v)
            } })
    }

    onMouseDown = () =>
    {
        const mouse = new Vector2(this.mouse.nX, this.mouse.nY)
        this.raycaster.setFromCamera(mouse, this.scene.camera)
        const intersects = this.raycaster.intersectObjects([this.playButton])
        if(intersects.length > 0)
            this.onPlayButtonClick()
    }

    onPlayButtonClick = ()  =>
    {
        if(this.TAPE_PLAYED) return
        this.TAPE_PLAYED = true
        this.tapeSound.play()
        const tl = new TimelineMax
        tl.to(this.upperPart.rotation, 0.7, {
            x: DegToRad(28),
            ease: Sine.easeOut
        })
        tl.to(this.glowUniforms.uVisibility, 0.3, { value: 0, ease: Sine.easeOut }, 0.9)
        tl.to(this.playButton.position, 0.5, {
            y: -1.9,
            ease: Expo.easeOut
        }, 1)
    }

    initLights()
    {
        this.directionalLightColor = '#ffffff'

        this.directionalLightFront = new DirectionalLight(this.directionalLightColor, 1)
        this.directionalLightFront.position.set(-5, 5, 15.5)
        // this.directionalLightFront.castShadow = true

        this.directionalLightBack = new DirectionalLight(this.directionalLightColor, 1)
        this.directionalLightBack.position.set(5, 5, -7.5)
        // this.directionalLightBack.castShadow = true

        this.scene.add(this.directionalLightFront)
        this.scene.add(this.directionalLightBack)
    }

    update(time)
    {
        if(this.playButtonGlow)
        {
            this.glowUniforms.uViewVector.value = new Vector3().subVectors(this.scene.camera.position, this.playButtonGlow.position)
            this.glowUniforms.uTime.value += time.delta * 0.002
        }
    }

    onMove(mouse)
    {
        this.mouse = mouse
    }

    resize(mouse)
    {
        this.mouse = mouse
    }

    clear()
    {
        this.children.forEach((child) =>
        {
            this.scene.remove(child)
        })
        this.tapeSound.destroy()
        window.removeEventListener('mousemove', this.onMouseMove)
        window.removeEventListener('mousedown', this.onMouseDown)
    }
}
