import eventHub from 'Application/event-hub'
import WebGLApp from 'WebGL/app'

export default
{
    name: 'app-webgl-canvas',

    data()
    {
        return {
            interactionId: undefined
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
        onResize(windowObj)
        {
            this.webGLApp.resize(windowObj)
        },

        onMouseMove(event)
        {
            this.webGLApp.mouseMove(event)
        },

        onGroupUpdate(group)
        {
            if(this.interactionId)
                this.webGLApp.clearGroup()
            this.interactionId = group.id
            if(group.id)
            {
                this.webGLApp.addGroup(group)
                this.$el.classList.add('is-active')
            }
            else
            {
                this.$el.classList.remove('is-active')
            }
        }
    }
}
