import { Mesh, Object3D, BoxGeometry, Color, ShaderMaterial } from 'three'
import glslify from 'glslify'
import fragmentShader from './shader/frag.glsl'
import vertexShader from './shader/vert.glsl'
import GUI from 'WebGLUtils/GUI'

class Cube extends Object3D
{
    constructor()
    {
        super()
        this.name = 'mouseMoveRotateCube'
        const geometry = new BoxGeometry(2, 2, 2)
        this.colors = {
            primary: '#6B8FF2',
            secondary: '#6A1B8C'
        }
        this.uniforms = {
            uTime: { value: 0 },
            uColorPrimary: { value: new Color(this.colors.primary) },
            uColorSecondary: { value: new Color(this.colors.secondary) }
        }
        const material = new ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: glslify(fragmentShader),
            vertexShader: glslify(vertexShader)
        })
        this.mouse = {
            nX: 0,
            nY: 0
        }
        this.ease = 0.1

        this.mesh = new Mesh(geometry, material)
        this.add(this.mesh)

        this.addListeners()
        // this.initGUI()
    }

    addListeners()
    {
        window.addEventListener('mousemove', this.onMouseMove)
    }

    initGUI()
    {
        this.rotation.range = [-Math.PI, Math.PI]
        GUI.panel
            .addGroup({ label: 'Cube' })
            .addSlider(this.rotation, 'x', 'range', { label: 'rX' })
            .addColor(this.colors, 'primary', {
                colorMode: 'hex',
                label: 'Primary Color',
                onChange: (v) =>
                {
                    this.uniforms.uColorPrimary.value = new Color(v)
                }
            })
            .addColor(this.colors, 'secondary', {
                colorMode: 'hex',
                label: 'Secondary Color',
                onChange: (v) =>
                {
                    this.uniforms.uColorSecondary.value = new Color(v)
                }
            })
    }

    onMouseMove = (e) =>
    {
        this.mouse.nX = (e.clientX / window.innerWidth) * 2 - 1
        this.mouse.nY = - (e.clientY / window.innerHeight) * 2 + 1
        // this.mesh.rotation.z += ((Math.sin(this.mouse.nX)) - this.mesh.rotation.z) * this.ease
    }

    update = (dt) =>
    {
        this.uniforms.uTime.value += dt * 0.001
        this.mesh.rotation.x += ((Math.sin(this.mouse.nY)) - this.mesh.rotation.x) * this.ease
        this.mesh.rotation.y += ((Math.sin(this.mouse.nX)) - this.mesh.rotation.y) * this.ease
    }

    clear()
    {
        window.removeEventListener('mousemove', this.onMouseMove)
    }
}

export default Cube
