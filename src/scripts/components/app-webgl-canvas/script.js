import eventHub from 'Application/event-hub'
import WebGLApp from 'WebGL/app'

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
        eventHub.$on('window:resize', this.onResize)
        this.$store.watch(this.$store.getters.getWebGLGroup, this.onGroupUpdate)
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
        },

        onGroupUpdate(interactionId)
        {
            if(interactionId === '')
            {
                this.webGLApp.clearGroup()
            }
            else
            {
                this.webGLApp.addGroup(interactionId)
            }
        }
    }
}
