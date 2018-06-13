import AInteraction from '../AInteraction'
import GUI from 'WebGLUtils/GUI'

import {
    PlaneBufferGeometry,
    MeshBasicMaterial,
    TextureLoader,
    Vector2,
    ShaderMaterial,
    DoubleSide,
    Mesh,
    Color,
    Raycaster
} from 'three'

import TweenMax from 'gsap'

import { randomInRange, randomIntInRange } from 'Utils/Numbers'

import Bulbs from './bulbs.js'

import fragmentShader from './shaders/frag.glsl'
import vertexShader from './shaders/vert.glsl'

export default class StrangerThings extends AInteraction
{
    constructor(options)
    {
        super(options)

        this.name = 'strangerThings'

        this.parallaxe = {
            intensity : 0.025,
            range: []
        }

        this.windowObj = options.windowObj

        this.raycaster = new Raycaster()

        this.initMeshes()
        this.initLights()

        this.setupCamera()

        this.initGUI()

        this.resize(this.mouse, this.windowObj)
    }

    setupCamera()
    {
        this.scene.camera.position.x = 0
        this.scene.camera.position.y = 0
        this.scene.camera.position.z = 1
        this.scene.camera.rotation.x = 0
        this.scene.camera.rotation.y = 0
        this.scene.camera.rotation.z = 0
        this.scene.initCameraGUI()
    }

    animateCamera()
    {

    }

    initMeshes()
    {
        this.setBg()
        this.setBulbs()
    }

    setBg()
    {
        // Plane background texture
        const planeGeo = new PlaneBufferGeometry(1, 1)
        this.uniforms = {
            uTime: { value: 0 },
            uTexture: { value: new TextureLoader().load('/static/stranger-things/bg.jpg') },
            uMap: { value: new TextureLoader().load('/static/stranger-things/depthmap.png') },
            uMouse: { value: new Vector2(this.mouse.x, this.mouse.y) },
            uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
            uParallaxe: { value: this.parallaxe.intensity }
        }
        const planeMat = new ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: fragmentShader,
            vertexShader: vertexShader,
            side: DoubleSide
        })
        this.plane = new Mesh(planeGeo, planeMat)
        this.add(this.plane)
    }

    setBulbs()
    {
        this.bulb = {
            color: '#e0fc83',
            scale: {
                value: 0.55
            },
            opacity: {
                value: 0.8
            }
        }

        const colors = ['#e0fc83', '#184ad6', '#cc5bde', '#2dfc50', '#fc0d19', '#83f8fc']

        this.bulbs = []

        for(let i = 0; i < Bulbs.length; i++)
        {
            const bulbGeo = new PlaneBufferGeometry(0.05, 0.05)
            const bulbMat = new MeshBasicMaterial({
                map: new TextureLoader().load('/static/stranger-things/bulb-5.png'),
                transparent: true,
                opacity: 0,
                color: colors[randomIntInRange(0, colors.length - 1)]
            })
            const bulb = new Mesh(bulbGeo, bulbMat)

            const randomScale = randomInRange(0.85, 1)
            bulb.scale.set(randomScale, randomScale, randomScale)

            bulb.name = Bulbs[i].letter
            bulb.lighted = false

            this.add(bulb)
            this.bulbs.push(bulb)
        }

        this.addBulbToGUI()
    }

    setBulbsPosition()
    {
        const aspect = this.windowObj.width / this.windowObj.height

        for(let i = 0; i < this.bulbs.length; i++)
        {
            const bulb = this.bulbs[i]
            bulb.position.x = this.plane.scale.x * -Bulbs[i].x / 200 * aspect
            bulb.position.y = (this.plane.scale.y * Bulbs[i].y / 200) * aspect
        }

        this.canIntersect = true
    }

    addBulbToGUI()
    {
        this.bulb.scale.range = [0, 5]
        this.bulb.opacity.range = [0, 1]

        GUI.panel
            .addGroup({ label: 'Stranger Things' })
            .addColor(this.bulb,'color', {
                colorMode:'hex',
                onChange: () =>
                {
                    for(let i = 0; i < this.bulbs.length; i++)
                    {
                        const bulb = this.bulbs[i]
                        bulb.material.color = new Color(this.bulb.color)
                    }
                }
            })
            .addSlider(this.bulb.scale, 'value', 'range',
            {
                label: 'bulb scale',
                onFinish: () =>
                {
                    for(let i = 0; i < this.bulbs.length; i++)
                    {
                        const bulb = this.bulbs[i]
                        bulb.scale.set(this.bulb.scale.value, this.bulb.scale.value, this.bulb.scale.value)
                    }
                }
            })
            // .addSlider(this.bulb.opacity, 'value', 'range',
            // {
            //     label: 'bulb opacity',
            //     onFinish: () =>
            //     {
            //         this.firstBulb.material.opacity = this.bulb.opacity.value
            //     }
            // })
    }

    animateBulb(bulb, enlighten)
    {
        if(enlighten)
        {
            const delay = randomInRange(0, 0.5)

            TweenMax.to(bulb.material, 0.2, {
                opacity: 1,
                delay: delay,
                onComplete: () =>
                {
                    this.animateBulb(bulb, false)
                }
            })
        }
        else
        {
            TweenMax.to(bulb.material, 0.2, {
                opacity: 0,
                onComplete: () =>
                {
                    bulb.lighted = false
                }
            })
        }
    }

    addListeners()
    {
        window.addEventListener('mousemove', this.onMouseMove)
    }

    initGUI()
    {
        this.parallaxe.range = [0, 0.1]
        GUI.panel
            .addSlider(this.parallaxe, 'intensity', 'range', { label: 'depth intensity' })
    }

    initLights()
    {
        // this.directionalLight = new DirectionalLight(0xffffff, 1)
        // this.directionalLight.castShadow = true
        // this.directionalLight.position.set(5, 5, 10)
        // const helper = new DirectionalLightHelper(this.directionalLight, 5)
        // this.scene.add(this.directionalLight)
        // this.scene.add(helper)
    }

    update(time)
    {
        super.update()
        this.uniforms.uTime.value = time.elapsed
        this.uniforms.uMouse.value = new Vector2(this.mouse.ratio.fromCenter.x, this.mouse.ratio.fromCenter.y)
        this.uniforms.uParallaxe.value = this.parallaxe.intensity
    }

    onMouseMove(mouse)
    {
        this.mouse = mouse
        const vMouse = new Vector2(this.mouse.nX, this.mouse.nY)
        this.raycaster.setFromCamera(vMouse, this.scene.camera)

        const intersects = this.raycaster.intersectObjects(this.bulbs)

        if(intersects.length > 0 && this.canIntersect && intersects.length < this.bulbs.length)
        {
            for(let i = 0; i < intersects.length; i++)
            {
                if(!intersects[i].object.lighted)
                {
                    this.animateBulb(intersects[i].object, true)
                    intersects[i].object.lighted = true
                }
            }
        }
    }

    resize(mouse, windowObj)
    {
        this.mouse = mouse

        this.windowObj.width = windowObj.width
        this.windowObj.height = windowObj.height

        const distance = this.scene.camera.position.z - this.plane.position.z
        const aspect = 2
        const vFov = this.scene.camera.fov * Math.PI / 180
        const planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance
        const planeWidthAtDistance = planeHeightAtDistance * aspect


        this.plane.scale.x = planeWidthAtDistance
        this.plane.scale.y = planeHeightAtDistance

        this.setBulbsPosition()

        this.scene.renderer.setSize(this.windowObj.width, this.windowObj.height)
    }

    clear()
    {
        super.clear()
        window.removeEventListener('mousemove', this.onMouseMove)
    }
}
