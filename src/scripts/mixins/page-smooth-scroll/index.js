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
        this.eventHub.$on('window:resize', this.onMixinResize)
        this.eventHub.$on('update:pageHeight', this.onMixinResize)
        this.eventHub.$on('application:enterframe', this.onMixinEnterFrame)
    },

    destroyed()
    {
        this.eventHub.$off('window:resize', this.onMixinResize)
        this.eventHub.$off('update:pageHeight', this.onMixinResize)
        this.eventHub.$off('application:enterframe', this.onMixinEnterFrame)
    },

    methods:
    {
        onMixinResize()
        {
            if(!this.isTouchDevice && this.isSmoothScroll) this.eventHub.$emit('set:pageHeight', this.$el.offsetHeight)
        },

        onMixinEnterFrame(smoothScroll)
        {
            if(!this.isTouchDevice && this.isSmoothScroll) this.$el.style.transform = 'translateY(' + -smoothScroll + 'px) translateZ(0)'
        }
    }
}
