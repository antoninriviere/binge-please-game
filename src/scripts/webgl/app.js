import raf from 'raf'
import SceneObj from 'WebGLCore/scene'
import Config from 'WebGLConfig'
import camelcase from 'lodash.camelcase'

import MouseMoveRotate from './interactions/mouse-move-rotate'
import ThirteenReasonsWhy from './interactions/13-reasons-why'

class App
{
    constructor(container)
    {
        this.scene = new SceneObj({
            container: container,
            ...Config
        })

        this.container = container

        this.group = undefined
        this.interactionId = undefined

        this.DELTA_TIME = 0
        this.LAST_TIME = Date.now()

        this.update()
    }

    addGroup(id)
    {
        this.interactionId = id
        this.group = this.getInteractionGroup(id)
        this.scene.add(this.group)
    }

    getInteractionGroup(id)
    {
        switch(id)
        {
            case 'mouse-move-rotate':
                return new MouseMoveRotate(this.scene)
            case '13_reasons_why':
                return new ThirteenReasonsWhy(this.scene)
        }
    }

    clearGroup()
    {
        const groupName = camelcase(this.interactionId)
        const group = this.scene.getObjectByName(groupName)
        group.clear()
        this.scene.remove(group)
        this.scene.renderer.dispose()
    }

    update = () =>
    {
        this.DELTA_TIME = Date.now() - this.LAST_TIME
        this.LAST_TIME = Date.now()

        if(this.group)
        {
            this.group.update(this.DELTA_TIME)
            this.scene.render(this.DELTA_TIME)
        }

        raf(this.update)
    }

    resize = () =>
    {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.scene.resize(this.width, this.height)
    }
}

export default App
