import { Pass } from 'postprocessing'
import { ShaderMaterial, Vector2 } from 'three'
import fragmentShader from './shader/frag.glsl'
import vertexShader from './shader/vert.glsl'
import glslify from 'glslify'

export default class FXAAPass extends Pass
{
    constructor()
    {
        super()
        this.name = 'FXAAPass'
        this.needsSwap = true
        this.settings = {}
        this.uniforms = {
            uDiffuse: { value: null },
            uResolution: { value: new Vector2() }
        }
        this.material = new ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: glslify(fragmentShader),
            vertexShader: glslify(vertexShader)
        })
        this.quad.material = this.material
    }
    render = (renderer, readBuffer) =>
    {
        this.uniforms.uDiffuse.value = readBuffer.texture
        this.uniforms.uResolution.value.x = readBuffer.width
        this.uniforms.uResolution.value.y = readBuffer.height
        renderer.render(this.scene, this.camera, this.renderToScreen ? null : readBuffer)
    }
}
