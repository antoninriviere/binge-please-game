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
        eventHub.$on('webgl:add-group', this.onSetupGroup)
        eventHub.$on('webgl:clear-group', this.onClearGroup)
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

        onSetupGroup(interactionId)
        {
            this.webGLApp.addGroup(interactionId)
        },
        onClearGroup()
        {
            this.webGLApp.clearGroup()
        }
    }
}
