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

import TweenMax, { TimelineMax } from 'gsap'

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
            intensity : 0.015,
            range: []
        }

        this.mouseAuto = {
            enabled: true,
            angle: 0,
            radius: 300,
            position : {
                x: 0,
                y: 0
            },
            ratio : {
                fromCenter : {
                    x: 0,
                    y: 0
                }
            }
        }

        this.windowObj = options.windowObj

        this.raycaster = new Raycaster()

        this.initMeshes()
        this.initLights()

        this.scene.options.override.aspect = true
        this.scene.options.override.renderer = true

        this.setupCamera()

        this.initGUI()

        this.autoMouse()
    }

    setupCamera()
    {
        this.scene.camera.fov = 15

        this.scene.camera.position.x = 0
        this.scene.camera.position.y = 0
        this.scene.camera.position.z = 1

        this.scene.camera.rotation.x = 0
        this.scene.camera.rotation.y = 0
        this.scene.camera.rotation.z = 0

        this.scene.camera.updateProjectionMatrix()
    }

    animateCamera()
    {
        // TweenMax.to(this.scene.camera.position, 5, {
        //     z: 1,
        //     ease: Power0.easeNone
        // })
    }

    autoMouse()
    {
        this.mouseTween = TweenMax.to(this.mouseAuto, 2, {
            angle: -360,
            ease: Power0.easeNone,
            onComplete: () =>
            {
                this.mouseTween.restart()
            }
        })
    }

    initMeshes()
    {
        this.setBg()
        this.setBulbs()
    }

    setBg()
    {
        // instantiate a loader
        const loader = new TextureLoader()

        loader.load(
            '/static/stranger-things/bg.jpg',
            (texture) =>
            {
                        // Plane background texture
                this.texture = texture
                this.texture.needsUpdate = true

                this.texture.repeat = new Vector2(0.2, 0.2)
                console.log(this.texture)

                const planeGeo = new PlaneBufferGeometry(1, 1)
                this.uniforms = {
                    uTime: { value: 0 },
                    uTexture: { value: this.texture },
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

                this.loaded = true
                this.resize(this.mouse, this.windowObj)
                this.animateCamera()
                this.tweenBulbs()
            },
            undefined,

            // onError callback
            (err) => console.error('Error loading texture', err)
        )
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

    tweenBulbs()
    {
        this.phraseTl = new TimelineMax({
            onComplete: () => this.phraseTl.restart()
        })
        const BULB_DELAY = 0.2

        // Salut les punks or if you read this you're a nerd
        const phrase = [17, 0, 10, 19, 18, 10, 4, 17, 14, 19, 12, 9, 17]
        for(let i = 0; i < phrase.length; i++)
        {
            const delay = i * BULB_DELAY

            this.phraseTl.to(this.bulbs[phrase[i]].material, 0.2, {
                opacity: 1
            }, delay)
            this.phraseTl.to(this.bulbs[phrase[i]].material, 0.2, {
                opacity: 0
            }, delay + 0.3)
        }
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
        if(this.loaded)
        {
            super.update()
            this.uniforms.uTime.value = time.elapsed

            if(this.mouseAuto.enabled)
            {
                this.mouseAuto.position.x = Math.cos(this.mouseAuto.angle * Math.PI / 180) * this.mouseAuto.radius
                this.mouseAuto.position.y = Math.sin(this.mouseAuto.angle * Math.PI / 180) * this.mouseAuto.radius

                this.mouseAuto.ratio.fromCenter.x = (this.mouseAuto.position.x - this.windowObj.width / 2) / this.windowObj.width
                this.mouseAuto.ratio.fromCenter.y = (this.mouseAuto.position.y - this.windowObj.height / 2) / this.windowObj.height

                this.uniforms.uMouse.value = new Vector2(this.mouseAuto.ratio.fromCenter.x, this.mouseAuto.ratio.fromCenter.y)
            }
            else
            {
                this.uniforms.uMouse.value = new Vector2(this.mouse.ratio.fromCenter.x, this.mouse.ratio.fromCenter.y)
            }
            this.uniforms.uParallaxe.value = this.parallaxe.intensity
        }
    }

    onMouseMove(mouse)
    {
        this.mouse = mouse
        // const vMouse = new Vector2(this.mouse.nX, this.mouse.nY)
        // this.raycaster.setFromCamera(vMouse, this.scene.camera)

        // const intersects = this.raycaster.intersectObjects(this.bulbs)

        // if(intersects.length > 0 && this.canIntersect && intersects.length < this.bulbs.length)
        // {
        //     for(let i = 0; i < intersects.length; i++)
        //     {
        //         if(!intersects[i].object.lighted)
        //         {
        //             this.animateBulb(intersects[i].object, true)
        //             intersects[i].object.lighted = true
        //         }
        //     }
        // }
    }

    resize(mouse, windowObj)
    {
        this.mouse = mouse

        this.windowObj.width = windowObj.width
        this.windowObj.height = windowObj.height

        // const distance = this.scene.camera.position.z - this.plane.position.z
        const distance = 1 - this.plane.position.z
        const aspect = 2
        const vFov = this.scene.camera.fov * Math.PI / 180
        const planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance
        const planeWidthAtDistance = planeHeightAtDistance * aspect


        this.plane.scale.x = planeWidthAtDistance
        this.plane.scale.y = planeHeightAtDistance

        this.setBulbsPosition()
    }

    clear()
    {
        super.clear()
        this.phraseTl.clear()
        this.phraseTl.kill()
        this.mouseTween.kill()

        this.scene.clearPostProcessing()
    }
}
