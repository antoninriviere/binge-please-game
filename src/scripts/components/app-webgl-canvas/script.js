import WebGLApp from '../../webgl/app'

export default
{
    name: 'app-webgl-canvas',

    data()
    {
        return {

        }
    },

    created()
    {
        this.eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        this.webGLApp = new WebGLApp(this.$el)
    },

    methods:
    {
        onResize()
        {
            this.webGLApp.resize()
        }
    }
}
