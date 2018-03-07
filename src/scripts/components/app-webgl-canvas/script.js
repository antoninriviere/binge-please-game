import WebGLApp from '../../webgl/app'

export default
{
    name: 'app-webgl-canvas',

    data()
    {
        return {

        }
    },

    mounted()
    {
        new WebGLApp(this.$el)
    },

    methods:
    {

    }
}
