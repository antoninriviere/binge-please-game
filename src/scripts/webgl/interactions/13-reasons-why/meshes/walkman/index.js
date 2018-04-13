import { Object3D, DoubleSide, Vector2, Raycaster } from 'three'


export default class Walkman extends Object3D
{
    constructor()
    {
        super()
        this.name = 'walkman'

    }





    update = (dt) =>
    {
        // this.uniforms.uTime.value += dt * 0.001
        // this.mesh.rotation.x += ((Math.sin(this.mouse.nY)) - this.mesh.rotation.x) * this.ease
        // this.mesh.rotation.y += ((Math.sin(this.mouse.nX)) - this.mesh.rotation.y) * this.ease
    }

    clear()
    {
        window.removeEventListener('mousemove', this.onMouseMove)
    }
}
