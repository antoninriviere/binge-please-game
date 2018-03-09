import eventHub from 'Application/event-hub'
import Config from 'Config'

export default {

    data()
    {
        return {
            isTouchDevice: Config.isTouchDevice,
            isSmoothScroll: Config.smoothScroll.active
        }
    },

    created()
    {
        eventHub.$on('window:resize', this.onMixinResize)
        eventHub.$on('update:pageHeight', this.onMixinResize)
        eventHub.$on('application:enterframe', this.onMixinEnterFrame)
    },

    destroyed()
    {
        eventHub.$off('window:resize', this.onMixinResize)
        eventHub.$off('update:pageHeight', this.onMixinResize)
        eventHub.$off('application:enterframe', this.onMixinEnterFrame)
    },

    methods:
    {
        onMixinResize()
        {
            if(!this.isTouchDevice && this.isSmoothScroll) eventHub.$emit('set:pageHeight', this.$el.offsetHeight)
        },

        onMixinEnterFrame(smoothScroll)
        {
            if(!this.isTouchDevice && this.isSmoothScroll) this.$el.style.transform = 'translateY(' + -smoothScroll + 'px) translateZ(0)'
        }
    }
}
