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
        window.addEventListener('mousemove', this.onMouseMove)
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

        onMouseMove(event)
        {
            this.webGLApp.mouseMove(event)
        },

        onGroupUpdate(interactionId)
        {
            if(interactionId === '')
            {
                this.webGLApp.clearGroup()
                this.$el.classList.remove('is-active')
            }
            else
            {
                this.webGLApp.addGroup(interactionId)
                this.$el.classList.add('is-active')
            }
        }
    }
}
